import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import CountdownInput from './CountdownInput';
import Progress from './Progress';
import { SCountdown, SCountdownActions, SCountdownDisplay, SCountdownResult } from '../styles/countdown.styles';

const SECONDS_IN_MINUTE = 60;
const TIMER_STEP_MS = 250;

const countdownPropTypes = {
    title: PropTypes.string.isRequired,
};

type CountdownProps = PropTypes.InferProps<typeof countdownPropTypes>;

function Countdown({ title }: CountdownProps) {
    const [selectedSeconds, setSelectedSeconds] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const endTimeRef = useRef(0);
    const savedSecondsRef = useRef(0);

    const playEndSignal = useCallback(() => {
        const AudioContextClass =
            window.AudioContext ||
            (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextClass) {
            return;
        }

        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = 700;
        gain.gain.value = 0.12;

        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.35);
    }, []);

    useEffect(() => {
        if (!isRunning) {
            return undefined;
        }

        endTimeRef.current = Date.now() + savedSecondsRef.current * 1000;

        const intervalId = window.setInterval(() => {
            const nextRemainingSeconds = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));

            savedSecondsRef.current = nextRemainingSeconds;
            setRemainingSeconds(nextRemainingSeconds);

            if (nextRemainingSeconds === 0) {
                setIsRunning(false);
                playEndSignal();
            }
        }, TIMER_STEP_MS);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [isRunning, playEndSignal]);

    const formattedTime = useMemo(() => {
        const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
        const seconds = remainingSeconds % SECONDS_IN_MINUTE;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, [remainingSeconds]);

    const progressValue = useMemo(() => {
        if (initialSeconds === 0) {
            return 0;
        }

        return ((initialSeconds - remainingSeconds) / initialSeconds) * 100;
    }, [initialSeconds, remainingSeconds]);

    const startButtonText = useMemo(() => {
        if (isRunning) {
            return 'Пауза';
        }

        return hasStarted ? 'Продолжить' : 'Запустить';
    }, [hasStarted, isRunning]);

    const handleSelectedSecondsChange = useCallback(
        (nextSeconds: number) => {
            setSelectedSeconds(nextSeconds);

            if (!hasStarted) {
                setInitialSeconds(nextSeconds);
                setRemainingSeconds(nextSeconds);
                savedSecondsRef.current = nextSeconds;
            }
        },
        [hasStarted]
    );

    const handleStartPauseClick = useCallback(() => {
        if (!hasStarted && selectedSeconds === 0) {
            return;
        }

        if (!hasStarted) {
            setInitialSeconds(selectedSeconds);
            setRemainingSeconds(selectedSeconds);
            savedSecondsRef.current = selectedSeconds;
            setHasStarted(true);
        }

        setIsRunning(currentIsRunning => !currentIsRunning);
    }, [hasStarted, selectedSeconds]);

    const handleResetClick = useCallback(() => {
        endTimeRef.current = 0;
        savedSecondsRef.current = selectedSeconds;
        setInitialSeconds(selectedSeconds);
        setRemainingSeconds(selectedSeconds);
        setIsRunning(false);
        setHasStarted(false);
    }, [selectedSeconds]);

    return (
        <SCountdown>
            <Typography component='h2' variant='h4'>
                {title}
            </Typography>

            <SCountdownResult>
                <Typography >
                    Осталось
                </Typography>
                <SCountdownDisplay aria-live='polite'>{formattedTime}</SCountdownDisplay>

                <Progress value={progressValue} />
            </SCountdownResult>

            <CountdownInput
                disabled={hasStarted}
                onChange={handleSelectedSecondsChange}
                totalSeconds={selectedSeconds}
            />



            <SCountdownActions>
                <Button
                    disabled={!hasStarted && selectedSeconds === 0}
                    onClick={handleStartPauseClick}
                >
                    {startButtonText}
                </Button>

                <Button color='error' onClick={handleResetClick} >
                    Сброс
                </Button>
            </SCountdownActions>
        </SCountdown>
    );
}

Countdown.propTypes = countdownPropTypes;

export default memo(Countdown);