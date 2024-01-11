import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikSelect from 'components/FormControls/Select';
import FormikTextField from 'components/FormControls/TextField';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import { timestampOptions } from 'routes/Application/NewCampaign/Stepper/Step3/constants';
import FormikAutocomplete from 'components/FormControls/Autocomplete/Single';
import Alert from '@mui/material/Alert';
import { getBlacklist } from 'utils/targetingConfig/utils';

const useStyles = makeStyles(() => ({
  select: {
    minWidth: '100px',
  },
  selectControl: {
    marginRight: '15px',
  },
  autocompleteControl: {
    marginRight: '15px',
    width: '190px',
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
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const LastDidEvent = ({
  fieldName,
  item,
  events,
  activeApplication,
}) => {
  const classes = useStyles();
  const eventOption = events.map((e) => ({
    label: e.name,
    value: e.name,
  }));
  const { setFieldValue, values } = useFormikContext();

  const showWarning = getBlacklist(values.step1.type, activeApplication)
    .includes(item.name);

  return (
    <div className={classes.flexContainer}>
      <div className={classes.row}>
        <div className={classes.startLabel}>
          Last event
        </div>
        <FormikAutocomplete
          options={eventOption}
          placeholder="Select"
          multiple={false}
          name={`${fieldName}name`}
          value={item.name}
          classes={{
            control: classes.autocompleteControl,
          }}
          onSelectOption={(e) => {
            setFieldValue(`${fieldName}name`, e);
          }}
          required
        />
        <div className={classes.startLabel}>
          happened
        </div>
        <FormikSelect
          name={`${fieldName}op`}
          value={item.op}
          options={[
            { label: '< less than', value: 'lt' },
            { label: '> greater than', value: 'gt' },
          ]}
          placeholder="Select"
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
        <FormikSelect
          name={`${fieldName}type`}
          value={item.type}
          placeholder="Select event"
          options={timestampOptions}
          classes={{
            control: classes.selectControl,
            select: classes.select,
          }}
        />
        <div className={classes.startLabel}>
          ago
        </div>
      </div>
      {showWarning && (
      <Alert severity="warning">
        &laquo;
        {item.name}
        &raquo;
        {' '}
        event is in Blacklist. Please remove it first from
        the Blacklist to start using this event for Targeting.
      </Alert>
      )}
    </div>
  );
};

export default ({
  name,
  values,
  ...props
}) => (
  <WithOrField
    component={LastDidEvent}
    name={`${name}afterEvent`}
    items={values.afterEvent}
    {...props}
  />
);
