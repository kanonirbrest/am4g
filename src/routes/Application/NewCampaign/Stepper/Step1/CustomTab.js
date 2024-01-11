import React, { forwardRef } from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import Radio from 'components/Radio';

const useStyles = makeStyles(() => {
  const label = {
    marginLeft: '10px',
    fontWeight: 500,
    fontSize: '14px',
    paddingRight: '10px',
  };
  const tab = {
    margin: '0 5px',
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
      background: '#F8FAFD',
    },
    active: {
      ...tab,
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

const CustomTab = forwardRef(({
  innerProps: {
    icon: Icon,
    tabValue,
    onTabChange,
    value,
    values = [],
    sm,
    disabled = false,
  },
  children,
}, ref) => {
  const isActive = tabValue === value
      || values.includes(value);
  const classes = useStyles();
  // eslint-disable-next-line no-param-reassign
  disabled = !isActive && disabled;

  return (
    <Paper
      ref={ref}
      onClick={() => {
        if (!disabled) {
          onTabChange(tabValue);
        }
      }}
      classes={{
        root: cn({
          [classes.active]: isActive,
          [classes.tab]: !isActive,
          [classes.disabled]: disabled,
        }),
      }}
      style={sm ? {
        height: '24px',
        marginBottom: '5px',
      } : {}}
      variant="outlined"
    >
      <Radio
        checked={isActive}
        color="primary"
        disabled={disabled}
        onChange={() => {}}
      />
      {Icon && <Icon color={isActive ? '#FFFFFF' : '#8D95A9'} />}
      <div
        className={isActive ? classes.activeLabel : classes.label}
      >
        {children}
      </div>
    </Paper>
  );
});
export default CustomTab;
