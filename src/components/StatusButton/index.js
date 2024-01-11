import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { BUTTON_TYPES } from 'utils/styles/common';
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles(() => ({
  default: {
    width: '135px',
    height: '20px',
    fontSize: '12px',
    marginTop: '10px !important',
    textTransform: 'unset',
    margin: 0,
    padding: 0,
  },
  success: {
    width: '135px',
    height: '20px',
    fontSize: '12px',
    marginTop: '10px !important',
    textTransform: 'unset',
  },
  done: {
    fontSize: '1rem',
    marginLeft: '10px',
  },
}));

export default React.memo(({ onClick = () => {}, label }) => {
  const classes = useStyles();
  const [finished, setFinished] = React.useState(false);

  return (
    finished
      ? (
        <Button
          variant={finished ? 'contained' : BUTTON_TYPES.TRANSPARENT}
          color="success"
          disableRipple
          onClick={() => {
          }}
          classes={{ root: classes.success }}
        >
          Success
          <DoneIcon className={classes.done} />
        </Button>
      ) : (
        <Button
          variant={BUTTON_TYPES.TRANSPARENT}
          disableRipple
          onClick={() => {
            setFinished(true);
            onClick();
            setTimeout(() => {
              setFinished(false);
            }, 1000);
          }}
          classes={{ root: classes.default }}
        >
          {label}
        </Button>
      )
  );
});
