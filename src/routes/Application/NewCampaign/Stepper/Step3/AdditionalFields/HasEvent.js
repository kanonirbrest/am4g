import React from 'react';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import { useFormikContext } from 'formik';

import FormikSelect from 'components/FormControls/Select';
import FormikTextField from 'components/FormControls/TextField';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import { equalityOptions } from 'utils/constants';
import { PUSH_CAMPAIGNS } from 'utils/constants/campaign';
import FormikAutocomplete from 'components/FormControls/Autocomplete/Single';
import { getBlacklist } from 'utils/targetingConfig/utils';

import Parameter from '../../Step2/InApp/Delivery/Parameter';

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
  paramWrapper: {
    width: '240px',
  },
  equality: {
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  lightLabel: {
    fontSize: '12px',
    color: '#6C7688',
    marginBottom: '5px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  removeBtn: {
    marginTop: '12px',
  },
}));

const HasEvent = ({
  fieldName,
  events,
  activeApplication,
  item,
}) => {
  const classes = useStyles();
  const { values } = useFormikContext();

  const isAllowAdditionalParams = !PUSH_CAMPAIGNS
    .includes(values.step1.type);

  const eventOptions = events.map(({ name: triggerName }) => ({
    label: triggerName,
    value: triggerName,
  }));
  const showWarning = getBlacklist(values.step1.type, activeApplication)
    .includes(item.name);

  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
        <div className={classes.startLabel}>
          Has
        </div>
        <FormikSelect
          name={`${fieldName}op`}
          value={item.op}
          options={equalityOptions}
          classes={{
            control: classes.selectControl,
            select: classes.select,
          }}
          placeholder="Select"
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
        <FormikAutocomplete
          options={eventOptions}
          placeholder="Select event"
          multiple={false}
          name={`${fieldName}name`}
          value={item.name}
          classes={{
            control: classes.autocompleteControl,
          }}
          required
        />
        <div className={classes.startLabel}>
          event(s)
        </div>
      </div>
      <div>
        {!!item.name && isAllowAdditionalParams && (
          <Parameter
            isMultiple
            triggers={{ trigger_events: events }}
            isEdit
            trigger={item.name}
            name={fieldName.slice(0, -1)}
            valuesName="params"
          />
        )}
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
    component={HasEvent}
    name={`${name}hasEvent`}
    items={values.hasEvent}
    {...props}
  />
);
