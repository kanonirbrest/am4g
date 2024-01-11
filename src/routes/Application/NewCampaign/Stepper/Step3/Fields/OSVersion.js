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
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  label: {
    marginRight: '15px',
    fontSize: '14px',
  },
  orButton: {
    textTransform: 'uppercase',
    background: '#8AA2C7',
    marginLeft: 'auto',
    color: 'white',
  },
  textField: {
    width: '120px',
  },
  floated: {
    marginBottom: 0,
  },
}));

const OSVersion = ({
  fieldName: name,
  item,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.label}>
        OS version
      </div>
      <FormikSelect
        name={`${name}op`}
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
        name={`${name}val`}
        placeholder="Enter OS version"
        classes={{
          root: classes.textField,
        }}
      />
    </>
  );
};

export default ({
  name,
  values,
  ...props
}) => (
  <WithOrField
    component={OSVersion}
    name={`${name}osVersion`}
    items={values.osVersion}
    {...props}
  />
);
