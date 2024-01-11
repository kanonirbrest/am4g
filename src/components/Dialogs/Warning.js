import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';

import { BUTTON_TYPES } from 'utils/styles/common';
import TextWarning from 'components/TextWarning';

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
  open,
  setOpen,
  confirmCallback = () => {},
  payload = {},
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
        <div>
          {!!payload?.isWithoutClose && (
          <TextWarning>
            Users won’t be able to close the screen with your campaign.
            Continue to targeting or edit the campaign?
          </TextWarning>
          )}
          {!!payload?.unreachedPages?.length && (
          <TextWarning>
            We noticed that none of the Buttons or Images lead to the Page
            {' '}
            <b>{payload?.unreachedPages?.join(', ')}</b>
            . Please check the Action Result for this Page
          </TextWarning>
          )}
          {!!payload?.emptyPages?.length && (
          <TextWarning>
            We noticed that Page(s)
            {' '}
            <b>{payload?.emptyPages?.join(', ')}</b>
            {' '}
            doesn&apos;t (don&apos;t) have any items. Please check this Page
          </TextWarning>
          )}
        </div>
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant={BUTTON_TYPES.TRANSPARENT}
        >
          Back to editing
        </Button>
        <Button
          onClick={onAgree}
          variant={BUTTON_TYPES.BLUE}
          autoFocus
        >
          Continue to targeting
        </Button>
      </DialogActions>
    </Dialog>
  );
};
