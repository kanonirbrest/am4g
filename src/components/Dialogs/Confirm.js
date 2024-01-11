import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles(() => ({
  title: {
    color: '#3E4554',
    fontSize: '16px',
    maxWidth: '400px',
  },
  dialog: {
    padding: '10px',
  },
}));

export default ({
  open, setOpen,
  confirmCallback = () => {},
  payload,
  text,
  confirmButtonText = 'Agree',
  cancelButtonText = 'Disagree',
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const onAgree = () => {
    confirmCallback(payload);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-confirm"
      aria-describedby="dialog-confirm"
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.title}>
        {text}
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant={BUTTON_TYPES.TRANSPARENT}
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={onAgree}
          variant={BUTTON_TYPES.BLUE}
          autoFocus
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
