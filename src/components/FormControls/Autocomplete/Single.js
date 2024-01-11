import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useField, useFormikContext } from 'formik';

import styles from './style';

const useStyles = makeStyles(() => ({
  ...styles,
  autocomplete: {
    padding: '3px',
  },
  autoInput: {
    padding: '4px !important',
    paddingRight: '30px !important',
    background: 'white',
  },
}));

export default ({
  classes: propClasses = {},
  options,
  placeholder = '',
  defaultValue = [],
  name = '',
  required = false,
  disabled = false,
}) => {
  const [{
    value,
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }, {
    setTouched, setValue,
  }] = useField(name);
  const { validateForm } = useFormikContext();
  const classes = useStyles();

  const errorValue = touched && error;
  const onBlur = () => {
    if (setTouched) {
      setTouched(name)
        .then(() => {
          validateForm();
        });
    }
  };
  const renderInput = (params) => (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      error={!!errorValue}
      {...params}
    />
  );
  const onChange = (e, valueProp) => {
    setValue(valueProp?.value);
  };

  return (
    <FormControl
      className={cn(classes.control, propClasses.control)}
    >
      <Autocomplete
        multiple={false}
        options={options}
        defaultValue={defaultValue}
        disabled={disabled}
        classes={{
          root: cn(classes.autocomplete, propClasses.autocomplete),
          inputRoot: classes.autoInput,
          input: classes.input,
          option: classes.option,
        }}
        value={value || null}
        fullWidth
        isOptionEqualToValue={(option, val) => option?.value === val?.value
            || option?.value === val}
        onChange={onChange}
        renderInput={renderInput}
        disableClearable
        required={required}
        onBlur={onBlur}
        getOptionLabel={(opt) => opt?.label || opt || ''}
      />
      {errorValue && (
        <div className={classes.error}>
          {errorValue}
        </div>
      )}
    </FormControl>
  );
};
