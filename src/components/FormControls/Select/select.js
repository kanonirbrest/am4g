import React from 'react';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import cn from 'classnames';

import NotFilled from 'assets/icons/NotFilled';

const useStyles = makeStyles(() => ({
  control: {
    display: 'flex',
  },
  label: {
    marginRight: '10px',
  },
  outlined: {
    padding: '8px',
  },
  select: {
    fontSize: '12px',
    background: 'white',
    color: '#3E4554',
    textAlign: 'start',
    height: '17px !important',
    display: 'flex',
    alignItems: 'center',
  },
  sortItem: {
    fontSize: '12px',
    minHeight: '36px',
  },
  placeholder: {
    fontSize: '12px',
    color: '#8D95A9',
  },
  icon: {
    marginLeft: 'auto',
  },
  selectIcon: {
    color: '#8D95A9',
  },
  disabled: {
    background: '#F1F5FA !important',
    color: '#B2BED1',
    '-webkit-text-fill-color': '#B2BED1 !important',
  },
  error: {
    fontSize: '10px',
    color: '#E14B50',
    textAlign: 'start',
  },
}));

const getOptions = (options, classes, selected) => options.map(
  ({ value, label, disabled = false }) => (
    <MenuItem
      value={value}
      key={value}
      disabled={disabled}
      classes={{ root: classes.sortItem }}
    >
      {label}
      {value === selected
        && <NotFilled className={classes.icon} color="#4675C0" />}
    </MenuItem>
  ),
);

export default function FormikSelect({
  label,
  getLabel,
  placeholder,
  options,
  name,
  value: selectedValue,
  classes: propClasses = {},
  ...props
}) {
  const classes = useStyles();

  return (
    <FormControl
      className={cn(classes.control, propClasses.control)}
    >
      {getLabel ? getLabel() : <div className={classes.label}>{label}</div>}
      <Select
        classes={{
          outlined: classes.outlined,
          select: cn(propClasses.select, classes.select),
          disabled: classes.disabled,
          icon: classes.selectIcon,
        }}
        name={name}
        displayEmpty={!!placeholder}
        renderValue={(selected) => {
          if (!selected) {
            return <span className={classes.placeholder}>{placeholder}</span>;
          }

          return options.find(({ value }) => value === selected)?.label;
        }}
        value={selectedValue}
        {...props}
      >
        {getOptions(options, classes)}
      </Select>
    </FormControl>
  );
}
