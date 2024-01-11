import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        size="medium"
        text="button"
        onClick={() => {
          window.open(process.env.REACT_APP_URL);
        }}
        variant={BUTTON_TYPES.BLUE}
      >
        Sign in with OKTA
      </Button>
    </div>
  );
};
