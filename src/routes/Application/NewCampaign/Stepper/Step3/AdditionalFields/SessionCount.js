import React from 'react';
import { makeStyles } from '@mui/styles';

import FormikSelect from 'components/FormControls/Select';
import FormikTextField from 'components/FormControls/TextField';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import { equalityOptions } from 'utils/constants';

const useStyles = makeStyles(() => ({
  select: {
    minWidth: '100px',
  },
  selectControl: {
    marginRight: '15px',
  },
  startLabel: {
    marginRight: '15px',
    fontSize: '14px',
    textAlign: 'start',
  },
  label: {
    marginLeft: '15px',
    marginRight: '15px',
    fontSize: '14px',
    textAlign: 'start',
  },
  textField: {
    width: '220px',
    fontSize: '12px',
    color: '#3E4554',
  },
}));

const SessionCount = ({
  fieldName,
  item,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.startLabel}>
        Session count
      </div>
      <FormikSelect
        name={`${fieldName}op`}
        placeholder="Select"
        value={item.op}
        options={equalityOptions}
        classes={{
          control: classes.selectControl,
          select: classes.select,
        }}
      />
      <FormikTextField
        withDebounce
        name={`${fieldName}val`}
        placeholder="Enter value"
        classes={{
          root: classes.textField,
          control: classes.startLabel,
        }}
      />
      <div className={classes.startLabel}>
        time(s)
      </div>
    </>
  );
};

export default ({
  name,
  values,
  ...props
}) => (
  <WithOrField
    component={SessionCount}
    name={`${name}sessionCount`}
    items={values.sessionCount}
    {...props}
  />
);
