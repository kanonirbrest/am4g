import React from 'react';
import { makeStyles } from '@mui/styles';

import FormikSelect from 'components/FormControls/Select';
import FormikTextField from 'components/FormControls/TextField';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import { timestampOptions } from 'routes/Application/NewCampaign/Stepper/Step3/constants';

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

const FirstUsedAppMore = ({
  fieldName,
  item,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.startLabel}>
        First used the app more than
      </div>
      <FormikTextField
        withDebounce
        name={`${fieldName}val`}
        placeholder="Enter value"
        classes={{
          root: classes.textField,
          control: classes.startLabel,
        }}
      />
      <FormikSelect
        name={`${fieldName}type`}
        placeholder="Select"
        value={item.type}
        options={timestampOptions}
        classes={{
          control: classes.selectControl,
          select: classes.select,
        }}
      />
      <div className={classes.startLabel}>
        ago
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
    component={FirstUsedAppMore}
    name={`${name}sinceFirstVisitMore`}
    items={values.sinceFirstVisitMore}
    {...props}
  />
);
