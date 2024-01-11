import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  FormControlLabel,
} from '@mui/material';

import Radio from 'components/Radio';
import { useField } from 'formik';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '12px',
  },
}));

export default function SingleRadio({
  name,
  label = '',
  onChange,
}) {
  const classes = useStyles();
  const [{
    value,
    // eslint-disable-next-line no-unused-vars
  }, _, {
    setValue,
  }] = useField(name);

  return (
    <div classes={classes.wrapper}>
      <FormControlLabel
        classes={{
          label: classes.label,
          root: classes.labelRoot,
        }}
        onChange={(e) => {
          setValue(e.target.checked);
          if (onChange) {
            onChange(e);
          }
        }}
        control={(
          <Radio
            checked={value}
            color="primary"
          />
        )}
        label={label}
      />
    </div>
  );
}
