import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikSelect from 'components/FormControls/Select';
import FormikAutocomplete from 'components/FormControls/Autocomplete';
import FormikTextField from 'components/FormControls/TextField';
import FormikDatePicker from 'components/FormControls/FormikDatePicker';
import FormikDateTimePicker from 'components/FormControls/FormikDateTimePicker';
import FormikTimePicker
  from 'components/FormControls/FormikTimePicker';
import {
  daysOptions, ENDING_TYPE_OPTIONS, endingTypeOptions,
  PUSH_CAMPAIGN_TYPES, PUSH_SCHEDULED, typeOptions,
}
  from 'routes/Application/NewCampaign/Stepper/Step2/Push/constants';
import { getSavedProps }
  from 'routes/Application/NewCampaign/Stepper/Step2/Push/utils';
import ConditionalField from 'components/ConditionalField';
import WeekDays from './WeekDays';

const useStyles = makeStyles(() => ({
  tabPanelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px',
  },
  inputWrapperFlat: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  field: {
    marginRight: '25px',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '14px',
  },
  input: {
    fontSize: '12px',
    padding: '4px 8px',
  },
  startLabel: {
    fontSize: '14px',
    marginRight: '10px',
    color: '#000000',
  },
  label: {
    margin: '10px',
    fontSize: '14px',
    color: '#000000',
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  selectControl: {
    marginRight: '10px',
    minWidth: '120px',
  },
  limitWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #D8DFE8',
    marginTop: '20px',
  },
  autocomplete: {
    minWidth: '140px',
  },
  textField: {
    padding: 0,
  },
}));
const fieldName = 'step2.schedule.';

const DeliveryTabsContent = ({
  tabValue,
}) => {
  const classes = useStyles();
  const { setFieldValue, values: formikValues, handleChange } = useFormikContext();

  const values = formikValues.step2.schedule;
  const [isShowLimit, setIsShowLimit] = useState(formikValues.step2.limitPerDevice);
  const onWeekDaySelect = (v) => {
    setFieldValue(`${fieldName}daysOfWeek`, v);
  };
  const onTypeChange = (e) => {
    setFieldValue('step2.schedule',
      getSavedProps(e.target.value, values));

    handleChange(e);
  };
  const isShowRepeatBlock = [PUSH_CAMPAIGN_TYPES.MINUTE, PUSH_CAMPAIGN_TYPES.DAY,
    PUSH_CAMPAIGN_TYPES.WEEK, PUSH_CAMPAIGN_TYPES.MONTH,
  ].includes(values.type);

  switch (tabValue) {
    case PUSH_SCHEDULED.SEND_IMMEDIATELY:

      return <div />;

    case PUSH_SCHEDULED.SEND_AT_TIME:

      return (
        <div className={classes.tabPanelWrapper}>
          <div
            className={classes.inputWrapperFlat}
          >
            <div className={classes.rowContainer}>
              <span className={classes.startLabel}>Send</span>
              <FormikSelect
                name={`${fieldName}type`}
                value={values.type}
                placeholder="Select event"
                options={typeOptions}
                onChange={onTypeChange}
                classes={{
                  control: classes.selectControl,
                }}
              />
              <span className={classes.startLabel}>starting</span>
              {values.type === PUSH_CAMPAIGN_TYPES.ONCE ? (
                <FormikDateTimePicker
                  value={values.beginningDate}
                  name={`${fieldName}beginningDate`}
                />
              ) : (
                <FormikTimePicker
                  value={values.beginningDate}
                  name={`${fieldName}beginningDate`}
                />
              )}
            </div>
            {isShowRepeatBlock && (
            <div className={classes.rowContainer}>
              <span className={classes.startLabel}>Repeat every</span>
              <FormikTextField
                classes={{
                  control: classes.textField,
                  root: classes.input,
                }}
                placeholder="Enter value"
                type="number"
                inputProps={{ min: 15 }}
                name={`${fieldName}everyNTerm`}
              />
              {values.type && (
              <span className={classes.startLabel}>
                {values.type}
                (s)
              </span>
              )}
              {(values.type === PUSH_CAMPAIGN_TYPES.WEEK
                    || values.type === PUSH_CAMPAIGN_TYPES.MONTH)
                && <span className={classes.startLabel}>on the days</span>}
              {values.type === PUSH_CAMPAIGN_TYPES.WEEK && (
              <WeekDays
                values={values.daysOfWeek}
                onSelect={onWeekDaySelect}
                name={`${fieldName}daysOfWeek`}
              />
              )}
              {values.type === PUSH_CAMPAIGN_TYPES.MONTH && (
              <FormikAutocomplete
                options={daysOptions}
                name={`${fieldName}daysOfMonth`}
                placeholder="Select day"
                value={values.daysOfMonth}
                classes={{ autocomplete: classes.autocomplete }}
                required
              />
              )}
            </div>
            )}
            {values.type !== PUSH_CAMPAIGN_TYPES.ONCE && (
              <div className={classes.rowContainer}>
                <span className={classes.startLabel}>Beginning</span>
                <FormikDatePicker
                  value={values.beginningDate}
                  name={`${fieldName}beginningDate`}
                />
                <span className={classes.label}>and ending</span>
                <FormikSelect
                  name={`${fieldName}endingType`}
                  value={values.endingType}
                  placeholder="Select event"
                  options={endingTypeOptions}
                  onChange={(e) => {
                    setFieldValue(`${fieldName}endingDate`, null);
                    setFieldValue(`${fieldName}after_n_occur`, null);
                    handleChange(e);
                  }}
                  classes={{
                    control: classes.selectControl,
                  }}
                />
                {values.endingType === ENDING_TYPE_OPTIONS.AFTER_N_OCCUR
                && (
                <>
                  <span>equal to</span>
                  <FormikTextField
                    classes={{
                      control: classes.textField,
                      root: classes.input,
                    }}
                    placeholder="Enter value"
                    name={`${fieldName}endingAfterNOccur`}
                    type="number"
                    inputProps={{ min: 0 }}
                  />
                </>
                )}
                {values.endingType === ENDING_TYPE_OPTIONS.ON_THE_DATE
                && (
                <FormikDatePicker
                  value={values.endingDate}
                  name={`${fieldName}endingDate`}
                />
                )}
              </div>
            )}
          </div>
          <div className={classes.limitWrapper}>
            <ConditionalField
              isOpened={isShowLimit}
              buttonTitle="+ Add limit"
              onRemove={() => {
                setIsShowLimit(false);
                setFieldValue('step2.limitPerDevice', null);
              }}
            >
              <span className={classes.startLabel}>
                Limit the maximum numbers of messages for one device
              </span>
              <FormikTextField
                classes={{
                  control: classes.textField,
                  root: classes.input,
                }}
                placeholder="Enter value"
                type="number"
                inputProps={{ min: 0 }}
                name="step2.limitPerDevice"
              />
            </ConditionalField>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default DeliveryTabsContent;
