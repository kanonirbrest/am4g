import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import { formatTime, formatDate } from 'utils/dateUtils';

const useStyles = makeStyles(() => ({
  dateWrapper: {
    padding: '0 10px',
    width: '110px',
  },
  time: {
    fontWeight: 'normal',
    color: '#6C7688',
    fontSize: '10px',
    textAlign: 'start',
  },
  date: {
    fontSize: '14px',
    color: '#3E4554',
    textAlign: 'start',
  },
  title: {
    fontWeight: 'normal',
    color: '#6C7688',
    fontSize: '10px',
    textAlign: 'start',
  },
}));

export default ({ title, date, classes: propClasses = {} }) => {
  const classes = useStyles();

  return (
    <div className={cn(classes.dateWrapper, propClasses.wrapper)}>
      <div className={classes.title}>{title}</div>
      <div className={classes.date}>{formatDate(date)}</div>
      <div className={classes.time}>
        {`at ${formatTime(date)}`}
      </div>
    </div>
  );
};
