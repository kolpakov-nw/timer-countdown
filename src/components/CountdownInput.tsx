import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Slider, TextField, Typography } from '@mui/material';
import { SCountdownInput, SInputFields } from '../styles/countdown.styles';

const SECONDS_IN_MINUTE = 60;
const SLIDER_MAX_SECONDS = 60 * SECONDS_IN_MINUTE;
const MAX_INPUT_MINUTES = 720;

const countdownInputPropTypes = {
    disabled: PropTypes.bool.isRequired,
    totalSeconds: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

type CountdownInputProps = PropTypes.InferProps<typeof countdownInputPropTypes>;

function CountdownInput({ disabled, totalSeconds, onChange }: CountdownInputProps) {
    const minutes = useMemo(() => Math.floor(totalSeconds / SECONDS_IN_MINUTE), [totalSeconds]);
    const seconds = useMemo(() => totalSeconds % SECONDS_IN_MINUTE, [totalSeconds]);
    const sliderValue = useMemo(() => Math.min(totalSeconds, SLIDER_MAX_SECONDS), [totalSeconds]);

    const handleMinutesChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const nextMinutes = Math.max(0, Math.min(Number(event.target.value), MAX_INPUT_MINUTES));

            onChange(nextMinutes * SECONDS_IN_MINUTE + seconds);
        },
        [onChange, seconds]
    );

    const handleSecondsChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const nextSeconds = Math.max(0, Math.min(Number(event.target.value), 59));

            onChange(minutes * SECONDS_IN_MINUTE + nextSeconds);
        },
        [minutes, onChange]
    );

    const handleSliderChange = useCallback(
        (_event: Event, value: number | number[]) => {
            if (typeof value === 'number') {
                onChange(value);
            }
        },
        [onChange]
    );

    return (
        <SCountdownInput>
            <Typography>
                Установка
            </Typography>

            <SInputFields>
                <TextField
                    disabled={disabled}
                    fullWidth
                    label='Минуты'
                    onChange={handleMinutesChange}
                    slotProps={{ htmlInput: { min: 0, max: MAX_INPUT_MINUTES } }}
                    type='number'
                    value={minutes}
                />

                <TextField
                    disabled={disabled}
                    fullWidth
                    label='Секунды'
                    onChange={handleSecondsChange}
                    slotProps={{ htmlInput: { min: 0, max: 59 } }}
                    type='number'
                    value={seconds}
                />
            </SInputFields>

            <Slider
                disabled={disabled}
                max={SLIDER_MAX_SECONDS}
                min={0}
                onChange={handleSliderChange}
                step={15}
                value={sliderValue}
                valueLabelDisplay='auto'
                valueLabelFormat={value =>
                    `${Math.floor(value / SECONDS_IN_MINUTE)} мин ${value % SECONDS_IN_MINUTE} сек`
                }
            />
        </SCountdownInput>
    );
}

CountdownInput.propTypes = countdownInputPropTypes;

export default memo(CountdownInput);
