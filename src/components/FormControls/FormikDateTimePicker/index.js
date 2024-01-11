import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/lab';
import cn from 'classnames';
import { useField } from 'formik';

const useStyles = makeStyles(() => ({
  input: {
    fontSize: '12px',
    padding: '4px 8px',
  },
  error: {
    fontSize: '10px',
    color: '#E14B50',
    textAlign: 'start',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
}));

export default ({
  name,
  classes: propClasses = {},
  disabled,
}) => {
  const classes = useStyles();
  const [{
    value,
    onBlur,
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }, {
    setTouched, setValue,
  }] = useField(name);

  const errorValue = touched && error;
  const onClose = () => {
    // to validate field after value set
    setTimeout(() => {
      setTouched(name);
    }, 0);
  };
  const onChange = (v) => {
    setValue(v);
  };

  return (
    <div className={cn(classes.wrapper, propClasses.wrapper)}>
      <DateTimePicker
        value={value}
        onChange={onChange}
        name={name}
        InputProps={{
          classes: {
            root: classes.input,
          },
        }}
        ampm={false}
        onClose={onClose}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!errorValue}
            inputProps={{
              ...params.inputProps,
              className: classes.input,
              placeholder: 'Choose date and time',
            }}
            name={name}
            onBlur={onBlur}
          />
        )}
        disabled={disabled}
      />
      {errorValue && (
        <div className={classes.error}>
          {errorValue}
        </div>
      )}
    </div>
  );
};
