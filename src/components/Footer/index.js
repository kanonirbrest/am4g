import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '64px',
    paddingLeft: '20px',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '15px',
    color: '#FFFFFF',
    background: '#8D95A9',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="subtitle1" gutterBottom>
        Copyright 2020 AppMessages Inc. All rights reserved.
      </Typography>
    </footer>
  );
};
