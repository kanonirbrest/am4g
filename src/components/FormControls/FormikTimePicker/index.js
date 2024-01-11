import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
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
}) => {
  const classes = useStyles();
  const [{
    value,
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }, {
    setTouched, setValue,
  }] = useField(name);
  const errorValue = (touched && error);

  return (
    <div className={classes.wrapper}>
      <TimePicker
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        onClose={() => {
          setTouched(name);
        }}
        InputProps={{
          classes: {
            root: classes.input,
          },
        }}
        ampm={false}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!errorValue}
            inputProps={{
              ...params.inputProps,
              className: classes.input,
              placeholder: 'Choose time',
            }}
          />
        )}
      />
      {errorValue && (
        <div className={classes.error}>
          {errorValue}
        </div>
      )}
    </div>
  );
};
