import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';

import Radio from 'components/Radio';
import { useField } from 'formik';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '12px',
  },
  labelRoot: {
    display: 'flex',
  },
  groupRoot: {
    flexDirection: 'row',
    paddingLeft: '10px',
  },
  error: {
    fontSize: '10px',
    color: '#E14B50',
    textAlign: 'start',
  },
}));

export default function FormikRadio({
  name,
  options = {},
  defaultValue,
  ...props
}) {
  const classes = useStyles();
  const [{
    value,
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }, {
    setValue,
  }] = useField(name);

  return (
    <FormControl component="fieldset" classes={classes.wrapper}>
      <RadioGroup
        name={name}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        classes={{
          root: classes.groupRoot,
        }}
        defaultValue={defaultValue}
        {...props}
      >
        {options.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            classes={{
              label: classes.label,
              root: classes.labelRoot,
            }}
            control={(
              <Radio
                color="primary"
              />
)}
            label={o.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
