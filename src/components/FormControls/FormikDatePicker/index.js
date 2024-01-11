import React from 'react';
import { makeStyles } from '@mui/styles';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
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
  disabled,
}) => {
  const [{
    value, onBlur,
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }, {
    setTouched, setValue,
  }] = useField(name);

  const classes = useStyles();
  const errorValue = touched && error;
  const onChange = (v) => {
    setValue(v);
  };
  const onClose = () => {
    // to validate field after value set
    setTimeout(() => {
      setTouched(name);
    }, 0);
  };

  return (
    <div className={classes.wrapper}>
      <DatePicker
        value={value}
        name={name}
        onChange={onChange}
        onClose={onClose}
        InputProps={{
          classes: {
            root: classes.input,
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!errorValue}
            inputProps={{
              ...params.inputProps,
              className: classes.input,
              placeholder: 'Choose date',
            }}
            onBlur={onBlur}
            name={name}
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
