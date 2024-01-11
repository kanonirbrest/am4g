import React from 'react';
import { makeStyles } from '@mui/styles';

import Hint from 'components/Hint';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    fontSize: '11px',
    color: '#6C7688',
    marginRight: '10px',
    alignItems: 'center',
    marginBottom: '5px',
  },
  asterisk: {
    color: '#E14B50',
    marginLeft: '3px',
  },
  label: {
    color: '#6C7688',
  },
}));

export default ({
  label,
  withAsterisk = true,
  tooltipText,
  wrapperStyles,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.wrapper}
      style={wrapperStyles}
    >
      <span className={classes.label}>{label}</span>
      {withAsterisk && <span className={classes.asterisk}>*</span>}
      {tooltipText && (
      <Hint text={tooltipText} />
      )}
    </div>
  );
};
