import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import cn from 'classnames';
import _get from 'lodash.get';

import NotFilled from 'assets/icons/NotFilled';
import TextField from '@mui/material/TextField';
import Search from 'assets/icons/Search';

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
  inputWrapper: {
    display: 'flex',
    padding: '6px 16px',
    position: 'sticky',
    top: 0,
  },
  iconSearch: {
    position: 'absolute',
    top: '15px',
    right: '25px',
  },
  input: {
    padding: '8px',
    paddingRight: '30px',
    width: '100%',
  },
  root: {
    width: '100%',
  },
  options: {
    overflow: 'auto',
    maxHeight: '500px',
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
  options: propOptions,
  formik = {},
  name,
  value: selectedValue,
  classes: propClasses = {},
  ...props
}) {
  const classes = useStyles();
  const errorValue = _get(formik.touched, name) && _get(formik.errors, name);
  const [filter, setFilter] = useState('');
  const onInputChange = (e) => {
    setFilter(e.target.value);
  };

  const options = propOptions.filter(({ label: l }) => l.toLowerCase()
    .includes(filter.toLowerCase()));

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
        error={_get(formik.touched, name)
            && Boolean(_get(formik.errors, name))}
        renderValue={(selected) => {
          if (!selected) {
            return <span className={classes.placeholder}>{placeholder}</span>;
          }

          return options.find(({ value }) => value === selected)?.label;
        }}
        value={selectedValue}
        helpertext={errorValue || ''}
        formhelpertextprops={
              { classes: { error: classes.error, root: classes.error } }
            }
        {...props}
      >
        <div className={classes.inputWrapper}>
          <TextField
            onChange={onInputChange}
            variant="outlined"
            classes={{
              root: cn(classes.root),
            }}
            inputProps={{
              className: classes.input,
            }}
            value={filter}
            autoFocus
          />
          <Search className={classes.iconSearch} />
        </div>
        <div className={classes.options}>
          {getOptions(options, classes, selectedValue)}
        </div>
      </Select>
      {errorValue && (
        <div className={classes.error}>
          {errorValue}
        </div>
      )}
    </FormControl>
  );
}
