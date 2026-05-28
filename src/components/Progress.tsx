import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Typography } from '@mui/material';
import { SProgress } from '../styles/countdown.styles';

const progressPropTypes = {
    value: PropTypes.number.isRequired,
};

type ProgressProps = PropTypes.InferProps<typeof progressPropTypes>;

function Progress({ value }: ProgressProps) {
    return (
        <SProgress>
            <Typography variant='body2'>Прошло {Math.round(value)}%</Typography>
            <LinearProgress value={value} variant='determinate' />
        </SProgress>
    );
}

Progress.propTypes = progressPropTypes;

export default memo(Progress);
