import React from 'react';
import {
  makeStyles,
} from '@mui/styles';

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    marginBottom: '10px',
    flexDirection: 'column',
  },
  testLabel: {
    fontSize: '13px',
    marginBottom: '5px',
    paddingLeft: '25px',
    color: 'rgb(70, 117, 192)',
  },
}));

export default ({
  predictValue, rank, percent, total,
}) => {
  const classes = useStyles();
  const number = (total < 10000) ? total : predictValue + rank;

  return (
    <div className={classes.row}>
      <div className={classes.testLabel}>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Audience: {number} ({percent}% of application audience)
      </div>
    </div>
  );
};
