import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import { useFormikContext } from 'formik';

import StatusChecked from 'assets/icons/StatusChecked';
import StatusDefault from 'assets/icons/StatusDefault';

const useStyles = makeStyles(() => ({
  checkBoxLabel: {
    fontSize: '12px',
  },
  checkBox: {
    padding: '4px 10px',
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export default ({
  name,
  label,
  classes: propClasses = {},
  ...props
}) => {
  const classes = useStyles();
  const { handleChange } = useFormikContext();

  return (
    <FormControl
      className={cn(classes.control, propClasses.control)}
    >
      <FormControlLabel
        classes={{
          label: propClasses.checkBoxLabel
            || classes.checkBoxLabel,
        }}
        control={(
          <Checkbox
            classes={{ root: classes.checkBox }}
            name={name}
            color="primary"
            onChange={handleChange}
            checkedIcon={<StatusChecked />}
            icon={<StatusDefault />}
            type="checkbox"
            {...props}
          />
      )}
        label={label}
      />
    </FormControl>
  );
};
