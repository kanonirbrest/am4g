import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  errorWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.errorWrapper}>
      The server isn&apos;t responding, please try again in a few minutes.
    </div>
  );
};
