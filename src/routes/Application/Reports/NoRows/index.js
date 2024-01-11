import React from 'react';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  noRows: {
    position: 'absolute',
    top: 'calc(50% + 20px)',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: ' 12px',
    color: '#3E4554',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.noRows}>
      There is no enough data yet
    </div>
  );
};
