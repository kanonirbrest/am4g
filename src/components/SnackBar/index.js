import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import MuiAlert from '@mui/material/Alert';

const anchorOrigin = { vertical: 'top', horizontal: 'right' };
const autoHideDuration = 2000;

const Alert = React
  .forwardRef((
    props, ref,
  ) => (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  ));

export default ({
  open, onClose, text,
  anchor = anchorOrigin,
  duration = autoHideDuration,
  severity = 'success', classes,
}) => (
  <Snackbar
    anchorOrigin={anchor}
    open={open}
    autoHideDuration={duration}
    onClose={onClose}
    classes={classes}
  >
    <Alert
      severity={severity}
    >
      {text}
    </Alert>
  </Snackbar>
);
