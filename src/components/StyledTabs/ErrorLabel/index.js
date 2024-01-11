import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  error: {
    background: 'red',
    width: '10px',
    height: '10px',
    border: '2px solid white',
    borderRadius: '50%',
    marginRight: '5px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  labelWrapper: {
    display: 'inline-block',
    alignItems: 'center',
  },
  text: {
  },
}));

export default ({
  text,
  testId,
}) => {
  const classes = useStyles();

  return (
    <span
      className={classes.labelWrapper}
      data-testid={testId}
    >
      <span className={classes.error} />
      <span className={classes.text} title={text}>{text}</span>
    </span>
  );
};
