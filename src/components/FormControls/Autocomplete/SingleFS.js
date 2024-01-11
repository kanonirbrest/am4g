import React from 'react';
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import FormControl from '@mui/material/FormControl';
import { useField, useFormikContext } from 'formik';

import styles from './style';

const useStyles = makeStyles(() => ({
  ...styles,
  control: {
    display: 'flex',
  },
  autocomplete: {
    minWidth: '80px',
  },
  autoInput: {
    padding: '4px !important',
    background: 'white',
  },
  input: {
    ...styles.input,
    height: '20px',
    minWidth: '115px !important',
  },
}));

export default ({
  classes: propClasses = {},
  options,
  defaultValue = [],
  name = '',
  required = false,
  inputType = 'string',
  onBlurCallback,
  onChange: onChangeParam,
}) => {
  const [{
    value,
  }, { error, touched }, {
    setTouched, setValue,
  }] = useField(name);
  const { validateForm } = useFormikContext();

  const classes = useStyles();
  const onInputChange = (e, str, reason) => {
    if (reason === 'input') {
      setValue(str);
    }
  };
  const errorValue = touched && error;
  const onBlur = (e) => {
    setValue(e.target.value.trim());
    if (onBlurCallback) {
      onBlurCallback();
    }
    if (setTouched) {
      setTouched(name)
        .then(() => {
          validateForm();
        });
    }
  };
  const onChange = (e, v) => {
    setValue(v);
  };

  return (
    <FormControl
      className={cn(classes.control, propClasses.control)}
    >
      <div>
        <Autocomplete
          multiple={false}
          classes={{
            root: classes.autocomplete,
            inputRoot: classes.autoInput,
            input: classes.input,
            option: classes.option,
          }}
          disableClearable
          options={options.map((option) => option.label)}
          defaultValue={defaultValue}
          onInputChange={onInputChange}
          onChange={onChangeParam || onChange}
          value={value}
          name={name}
          freeSolo
          includeInputInList
          onBlur={onBlur}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              {...params}
              error={errorValue}
              type={inputType}
            />
          )}
          required={required}
        />
      </div>
      {errorValue && (
        <div className={classes.error}>
          {errorValue}
        </div>
      )}
    </FormControl>
  );
};
