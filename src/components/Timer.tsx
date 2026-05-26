import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { STimer, STimerActions, STimerDisplay } from '../styles/timer.styles';

const TIMER_STEP_MS = 10;

const timerPropTypes = {
    title: PropTypes.string.isRequired,
};

type TimerProps = PropTypes.InferProps<typeof timerPropTypes>;

function Timer({ title }: TimerProps) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const startTimeRef = useRef(0);
    const savedTimeRef = useRef(0);

    useEffect(() => {
        if (!isRunning) {
            return undefined;
        }

        startTimeRef.current = Date.now() - savedTimeRef.current;

        const intervalId = window.setInterval(() => {
            const nextElapsedTime = Date.now() - startTimeRef.current;

            savedTimeRef.current = nextElapsedTime;
            setElapsedTime(nextElapsedTime);
        }, TIMER_STEP_MS);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [isRunning]);

    const formattedTime = useMemo(() => {
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(
            2,
            '0'
        )}`;
    }, [elapsedTime]);

    const startButtonText = useMemo(() => {
        if (isRunning) {
            return 'пауза';
        }

        return hasStarted ? 'продолжить' : 'старт';
    }, [hasStarted, isRunning]);

    const handleStartPauseClick = useCallback(() => {
        setHasStarted(true);
        setIsRunning(currentIsRunning => !currentIsRunning);
    }, []);

    const handleResetClick = useCallback(() => {
        savedTimeRef.current = 0;
        startTimeRef.current = 0;
        setElapsedTime(0);
        setIsRunning(false);
        setHasStarted(false);
    }, []);

    return (
        <STimer>
            <Typography component='h1'>
                {title}
            </Typography>

            <STimerDisplay aria-live='polite'>{formattedTime}</STimerDisplay>

            <STimerActions>
                <Button color='info' onClick={handleStartPauseClick} >
                    {startButtonText}
                </Button>

                <Button color='error' onClick={handleResetClick} >
                    Сброс
                </Button>
            </STimerActions>
        </STimer>
    );
}

Timer.propTypes = timerPropTypes;

export default memo(Timer);
