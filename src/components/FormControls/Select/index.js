import React from 'react';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import cn from 'classnames';

import NotFilled from 'assets/icons/NotFilled';
import { useField } from 'formik';

const useStyles = makeStyles(() => ({
  control: {
    display: 'flex',
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
    display: 'flex',
    alignItems: 'center',
    padding: '6px 12px',
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
  iconWrapper: {
    marginRight: '8px',
    display: 'flex',
  },
  selectValue: {
    display: 'flex',
  },
}));

const getOptions = (options = [], classes, selected) => options.map(
  ({
    value, label, icon = false, disabled = false,
  }) => (
    <MenuItem
      value={value}
      key={value}
      disabled={disabled}
      classes={{ root: classes.sortItem }}
    >
      {icon && (
      <div className={classes.iconWrapper}>
        {icon()}
      </div>
      )}
      {label}
      {value === selected
      && <NotFilled className={classes.icon} color="#4675C0" />}
    </MenuItem>
  ),
);

export default function FormikSelect({
  placeholder,
  options,
  name,
  classes: propClasses = {},
  ...props
}) {
  const classes = useStyles();

  const [{
    value: selectedValue, onBlur, onChange,
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }] = useField(name);
  const errorValue = touched && error;

  return (
    <FormControl
      className={cn(classes.control, propClasses.control)}
    >
      <Select
        classes={{
          outlined: classes.outlined,
          select: cn(propClasses.select, classes.select),
          disabled: classes.disabled,
          icon: classes.selectIcon,
        }}
        name={name}
        displayEmpty={!!placeholder}
        error={touched && !!error}
        onChange={onChange}
        renderValue={(selected) => {
          if (!selected) {
            return <span className={classes.placeholder}>{placeholder}</span>;
          }
          const option = options.find(({ value }) => value === selected);

          if (option && option?.icon) {
            return (
              <div className={classes.selectValue}>
                <div className={classes.iconWrapper}>
                  {option?.icon()}
                </div>
                {option?.label}
              </div>
            );
          }

          return option?.label;
        }}
        value={selectedValue}
        helpertext={errorValue || ''}
        formhelpertextprops={
          { classes: { error: classes.error, root: classes.error } }
        }
        {...props}
        onBlur={(e) => {
          onBlur(e);
          if (props?.onBlur) {
            props.onBlur(e);
          }
        }}
      >
        {getOptions(options, classes, selectedValue)}
      </Select>
    </FormControl>
  );
}
