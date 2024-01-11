import Alert from '@mui/material/Alert';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  alert: {
    textAlign: 'start',
    width: '468px',
  },
}));

export default React.memo(({ trigger }) => {
  const classes = useStyles();

  if (!trigger) return null;

  return (
    <Alert classes={{ root: classes.alert }} severity="warning">
      &laquo;
      {trigger}
      &raquo;
      {' '}
      event is in Blacklist. Please remove it first from the Blacklist
      to start using this event for Triggering
    </Alert>
  );
});
