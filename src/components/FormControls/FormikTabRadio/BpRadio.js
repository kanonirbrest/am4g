import React from 'react';
import Paper from '@mui/material/Paper';
import cn from 'classnames';
import Radio from 'components/Radio';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => {
  const label = {
    marginLeft: '10px',
    fontWeight: 500,
    fontSize: '14px',
    paddingRight: '10px',
  };
  const tab = {
    margin: '0 10px 0 0',
    marginBottom: '5px',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  };

  return {
    tab: {
      ...tab,
      height: ({ bpHeight }) => bpHeight || '12px',
      background: '#F8FAFD',
    },
    active: {
      ...tab,
      height: ({ bpHeight }) => bpHeight || '12px',
      backgroundColor: '#8D95A9 !important',
      color: '#fff',
    },
    label: {
      ...label,
      color: '#3E4554',
    },
    activeLabel: {
      ...label,
      color: '#FFF',
    },
    disabled: {
      cursor: 'default',
      opacity: '.5',
    },
  };
});

export default ({
  disabled, isActive, children,
  onChange, value, bpHeight,
}) => {
  const classes = useStyles({ bpHeight });

  return (
    <Paper
      onClick={() => {
        if (!disabled) {
          onChange(value);
        }
      }}
      classes={{
        root: cn({
          [classes.disabled]: disabled,
          [classes.active]: isActive,
          [classes.tab]: !isActive,
        }),
      }}
      variant="outlined"
    >
      <Radio
        checked={isActive}
        color="primary"
        disabled={disabled}
      />
      <div
        className={isActive
          ? classes.activeLabel : classes.label}
      >
        {children}
      </div>
    </Paper>
  );
};
