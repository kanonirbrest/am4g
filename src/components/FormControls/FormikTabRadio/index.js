import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';

import BpRadio from 'components/FormControls/FormikTabRadio/BpRadio';

const useStyles = makeStyles(() => ({
  group: {
    display: 'flex',
    flexDirection: 'row',
  },
  error: {
    fontSize: '10px',
    color: '#E14B50',
    textAlign: 'start',
  },
  label: {
    margin: 0,
  },
}));

export default ({
  value, options, onChange,
  error, bpHeight,
}) => {
  const classes = useStyles();

  return (
    <FormControl
      component="fieldset"
    >
      <RadioGroup
        classes={{ root: classes.group }}
      >
        {options.map(({
          label,
          value: opVal,
          disabled,
        }) => (
          <FormControlLabel
            key={opVal}
            value={value}
            className={classes.label}
            control={(
              <BpRadio
                isActive={value === opVal}
                disabled={disabled}
                onChange={onChange}
                value={opVal}
                bpHeight={bpHeight}
              >
                {label}
              </BpRadio>
            )}
            label=""
          />
        ))}
      </RadioGroup>
      {error && (
      <div className={classes.error}>
        {error}
      </div>
      )}
    </FormControl>
  );
};
