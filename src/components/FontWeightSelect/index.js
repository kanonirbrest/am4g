import React from 'react';
import { makeStyles } from '@mui/styles';

import FormikSelect from 'components/FormControls/Select';

const fontWeightOptions = [
  { value: 'normal', label: 'normal' },
  { value: 'bold', label: 'bold' },
];

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    flexWrap: 'wrap',
    marginRight: '20px',
  },
  label: {
    fontSize: '11px',
    color: '#6C7688',
    display: 'block',
    marginBottom: '5px',
  },
  select: {
    minWidth: '80px',
  },
}));

export default ({ value, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.label}>Font Weight</div>
      <FormikSelect
        options={fontWeightOptions}
        value={value}
        classes={{
          select: classes.select,
        }}
        style={{
          fontWeight: value,
        }}
        {...props}
      />
    </div>
  );
};
