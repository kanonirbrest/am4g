import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

export const weekDays = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];
const useStyles = makeStyles(() => ({
  fieldWrapper: {
    display: 'flex',
  },
  day: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 400,
  },
  rootCheckbox: {
    padding: '0 10px',
  },
  error: {
    fontSize: '10px',
    color: '#E14B50',
    textAlign: 'start',
    marginLeft: '10px',
  },
}));
export default function WeekDays({
  onSelect, values, name,
}) {
  const [days, setDays] = useState(values || []);
  const { touched, errors } = useFormikContext();

  const classes = useStyles();
  const error = _get(touched, name)
      && _get(errors, name);
  const onChange = (e, val) => {
    let v;
    if (e.target.checked) {
      v = [...days, val];
    } else {
      v = days.filter((d) => d !== val);
    }
    setDays(v);
    if (onSelect) { onSelect(v); }
  };

  return (
    <div>
      <div className={classes.fieldWrapper}>
        {weekDays.map((day) => (
          <div
            className={classes.day}
            key={day}
          >
            <Checkbox
              classes={{
                root: classes.rootCheckbox,
              }}
              onChange={(e) => {
                onChange(e, day);
              }}
              name={day}
              checked={days.includes(day)}
            />
            {day}
          </div>
        ))}
      </div>
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
}
