import React from 'react';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(() => ({
  spinner: {
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#4675C0',
    fontSize: '22px',
  },
}));

export default function Spinner({ size = 70 }) {
  const classes = useStyles();

  return (
    <div className={classes.spinner}>
      <CircularProgress size={size} thickness={2} />
    </div>
  );
}
