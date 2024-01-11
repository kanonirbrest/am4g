import React from 'react';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles(() => ({
  spinnerWrapper: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  error: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginLeft: '10px',
  },
}));

export default ({
  onClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.spinnerWrapper}>
      <h2 className={classes.error}>
        ... something went wrong!
        <Button
          classes={{
            root: classes.button,
          }}
          variant={BUTTON_TYPES.BLUE}
          color="primary"
          type="submit"
          onClick={onClick}
        >
          reload
        </Button>
      </h2>
    </div>
  );
};
