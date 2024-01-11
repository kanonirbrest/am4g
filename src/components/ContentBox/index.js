import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

const useStyles = makeStyles(() => ({
  root: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.4)',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  box: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: '#F8FAFD',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottom: '1px solid #D8DFE8',
    fontWeight: '500',
    justifyContent: 'space-between',
  },
  endLabel: {
    color: '#4675C0',
  },
}));

export default ({
  label,
  endLabel,
  children,
  classes: propClasses = {},
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>{label}</div>
        {endLabel && <div className={classes.endLabel}>{endLabel}</div>}
      </div>

      <div className={cn(classes.box, propClasses.box)}>
        {children}
      </div>
    </div>
  );
};
