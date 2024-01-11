import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';

import RemoveButton from 'components/RemoveButton';
import Or from 'assets/icons/Or';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100% - 30px)',
    padding: '15px',
    background: '#F8FAFD',
    border: '1px solid #D8DFE8',
    alignItems: 'center',
    position: 'relative',
    borderBottom: 'none',
  },
  fieldWrapper: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    width: '100%',
  },
  orIcon: {
    position: 'absolute',
    left: 'calc(50% - 15px)',
    top: '-10px',
  },
}));

export default function FieldContainer({
  onRemove, children,
  classes: propClasses = {},
  index,
  isLast = true,
  disabledRemove = false,
}) {
  const classes = useStyles();

  return (
    <div
      className={cn(classes.container, propClasses.container)}
      style={{
        borderBottom: isLast && '1px solid #D8DFE8',
      }}
    >
      <div className={cn(classes.fieldWrapper, propClasses.fieldWrapper)}>
        {children}
      </div>

      <RemoveButton
        onClick={onRemove}
        disabled={disabledRemove}
      />
      {index !== 0 && index && <Or className={classes.orIcon} />}
    </div>
  );
}
