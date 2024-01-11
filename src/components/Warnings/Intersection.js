import Alert from '@mui/material/Alert';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  alert: {
    textAlign: 'start',
    width: '468px',
  },
}));

export default React.memo(({ warningMsg, trigger }) => {
  const classes = useStyles();

  if (!warningMsg) return null;

  return (
    <Alert classes={{ root: classes.alert }} severity="warning">
      &laquo;
      {trigger}
      &raquo;
      {' '}
      event is already in use in campaigns
      {' '}
      {warningMsg}
    </Alert>
  );
});
