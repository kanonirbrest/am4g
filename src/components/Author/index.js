import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  authorWrapper: {
    padding: '0 10px',
    width: '110px',
  },
  author: {
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

export default ({ title, author }) => {
  const classes = useStyles();

  return (
    <div className={classes.authorWrapper}>
      <div className={classes.title}>{title}</div>
      <div className={classes.author}>{author}</div>
    </div>
  );
};
