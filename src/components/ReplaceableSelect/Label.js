import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '11px',
    color: '#6C7688',
    textAlign: 'start',
    marginBottom: '5px',
  },
}));

export default ({
  value,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.label}>
      {value}
      {' '}
      campaign type
    </div>
  );
};
