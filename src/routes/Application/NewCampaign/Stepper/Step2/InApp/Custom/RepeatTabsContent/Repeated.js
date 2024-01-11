import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import FormikTextField from 'components/FormControls/TextField';
import RemoveButton from 'components/RemoveButton';
import FormikCheckbox from 'components/FormControls/Checkbox';
import { campaignType } from 'components/constants';
import FormikSelect from 'components/FormControls/Select';
import Hint from 'components/Hint';
import { sinceDateHint } from 'utils/constants/hints';
import { useFormikContext } from 'formik';
import EventsCount from './EventsCount';
import BeginningDate from './BeginningDate';
import styles from './styles';

export const PERIOD_OPTIONS = [{
  label: 'Day',
  value: 'day',
}, {
  label: 'Week',
  value: 'week',
}, {
  label: 'Month',
  value: 'month',
}, {
  label: 'Year',
  value: 'year',
}];

const useStyles = makeStyles(() => ({
  ...styles,
  checkbox: {
    fontSize: '14px',
    color: '#3E4554',
  },
  inputContainer: {
    ...styles.inputContainer,
    minWidth: '200px',
  },
  pickerWrapper: {
    margin: '0 10px',
  },
}));

export default ({
  name,
  values,
  disableLimitPerSession,
}) => {
  const classes = useStyles();
  const formik = useFormikContext();
  const [isShowLimit, setIsShowLimit] = useState(
    values.limit,
  );
  const [isShowInterval, setIsShowInterval] = useState(
    values.timeInterval,
  );
  const [isShowSessionLimit, setIsShowSessionLimit] = useState(
    values.perSession,
  );
  const [isShowPeriodLimit, setIsShowPeriodLimit] = useState(
    values.perPeriodCount,
  );

  return (
    <div className={classes.tabPanelWrapper}>
      <BeginningDate
        dateStart={values.dateStart}
        dateEnd={values.dateEnd}
        isShowEndDate={values.isShowEndDate}
        name={name}
      />
      <div
        className={classes.inputWrapper}
      >
        <div className={classes.inputLabel} style={{ fontFamily: 'Cooper' }}>
          Start the campaign when the event triggers
          for the
        </div>
        <FormikTextField
          name={`${name}repeatOptions.start`}
          classes={{
            control: classes.textField,
            root: classes.input,
          }}
          placeholder="Enter value"
          type="number"
          inputProps={{ min: 0 }}
          withDebounce
        />
        <div className={classes.inputLabel}>time(s) and repeat it every</div>
        <FormikTextField
          name={`${name}repeatOptions.every`}
          classes={{
            control: classes.textField,
            root: classes.input,
          }}
          type="number"
          inputProps={{ min: 0 }}
          placeholder="Enter value"
        />
        <div className={classes.inputLabel}>time(s)</div>
      </div>
      <div>
        {isShowLimit && (
        <div className={classes.inputContainer}>
          <div className={classes.limit}>
            <div className={classes.inputLabel}>Limit to</div>
            <FormikTextField
              name={`${name}limit`}
              classes={{
                control: classes.textField,
                root: classes.input,
              }}
              placeholder="Enter value"
              type="number"
              inputProps={{ min: 0 }}
              withDebounce
            />
            <div
              className={classes.inputLabel}
            >
              campaign impressions on the device
            </div>
          </div>
          <RemoveButton
            onClick={() => {
              setIsShowLimit(false);
              formik.setFieldValue(`${name}limit`, null);
            }}
          />
        </div>
        )}
        {isShowInterval && (
        <div className={classes.inputContainer}>
          <div className={classes.limit}>
            <div className={classes.inputLabel}>Set interval between impressions to</div>
            <FormikTextField
              name={`${name}timeInterval`}
              classes={{
                control: classes.textField,
                root: classes.input,
              }}
              placeholder="Enter value"
              type="number"
              inputProps={{ min: 0 }}
              withDebounce
            />
            <div
              className={classes.inputLabel}
              style={{
                marginRight: '20px',
              }}
            >
              seconds
            </div>
            {/* we have is_interval_context_global field only for inters */}
            {formik.values.step1.type === campaignType.inAppInterstitials && (
            <FormikCheckbox
              name="step2.inters.is_interval_context_global"
              label="Set impression interval considering
               impressions from other Interstitial campaigns"
              checked={formik.values.step2.inters.is_interval_context_global}
              onChange={(e) => {
                formik.setFieldValue('step2.inters.is_interval_context_global',
                  e.target.checked);
              }}
              classes={{
                checkBoxLabel: classes.checkbox,
              }}
            />
            )}
          </div>
          <RemoveButton
            onClick={() => {
              setIsShowInterval(false);
              formik.setFieldValue(`${name}timeInterval`, null);
            }}
          />
        </div>
        )}
        {isShowSessionLimit && (
        <div className={classes.inputContainer}>
          <div className={classes.limit}>
            <div className={classes.inputLabel}>Limit impressions to</div>
            <FormikTextField
              name={`${name}perSession`}
              classes={{
                control: classes.textField,
                root: classes.input,
              }}
              placeholder="Enter value"
              type="number"
              inputProps={{ min: 0 }}
              withDebounce
            />
            <div
              className={classes.inputLabel}
            >
              times per session
            </div>
          </div>
          <RemoveButton
            onClick={() => {
              setIsShowSessionLimit(false);
              formik.setFieldValue(`${name}perSession`, null);
            }}
          />
        </div>
        )}
        {isShowPeriodLimit && (
        <div className={classes.inputContainer}>
          <div className={classes.limit}>
            <div className={classes.inputLabel}>Limit impressions to</div>
            <FormikTextField
              name={`${name}perPeriodCount`}
              classes={{
                control: classes.textField,
                root: classes.input,
              }}
              placeholder="Enter value"
              type="number"
              inputProps={{ min: 0 }}
              withDebounce
            />
            <div
              className={classes.inputLabel}
            >
              times per
            </div>
            <FormikSelect
              options={PERIOD_OPTIONS}
              value={values.perPeriodType}
              name={`${name}perPeriodType`}
              onChange={(e) => {
                formik.setFieldValue(`${name}perPeriodType`, e.target.value);
              }}
              classes={{ control: classes.selectControl }}
            />
          </div>
          <RemoveButton
            onClick={() => {
              setIsShowPeriodLimit(false);
              formik.setFieldValue(`${name}perPeriodType`, null);
              formik.setFieldValue(`${name}perPeriodCount`, null);
            }}
          />
        </div>
        )}
        <EventsCount
          name={name}
          startCountEventsSince={values.startCountEventsSince}
          startCountEventsSinceCampaignLaunch={values.startCountEventsSinceCampaignLaunch}
        />
      </div>
      <div className={classes.addButton}>
        {!isShowLimit && (
        <Button
          variant="buttonTransparent"
          disableRipple
          onClick={() => {
            setIsShowLimit(true);
            formik.setFieldValue(`${name}limit`, '');
          }}
        >
          + Add limit for device
        </Button>
        )}
        {!isShowInterval && (
        <Button
          variant="buttonTransparent"
          disableRipple
          onClick={() => {
            setIsShowInterval(true);
            formik.setFieldValue(`${name}timeInterval`, '');
          }}
        >
          + Add interval between impressions
        </Button>
        )}
        {!isShowSessionLimit && !disableLimitPerSession && (
        <Button
          variant="buttonTransparent"
          disableRipple
          onClick={() => {
            setIsShowSessionLimit(true);
            formik.setFieldValue(`${name}perSession`, '');
          }}
        >
          + Add limit per session
        </Button>
        )}
        {!isShowPeriodLimit && (
        <Button
          variant="buttonTransparent"
          disableRipple
          onClick={() => {
            setIsShowPeriodLimit(true);
            formik.setFieldValue(`${name}perPeriodType`, '');
            formik.setFieldValue(`${name}perPeriodCount`, '');
          }}
        >
          + Add limit per period
        </Button>
        )}
        {!values.startCountEventsSinceCampaignLaunch && (
        <>
          <Button
            variant="buttonTransparent"
            disableRipple
            onClick={() => {
              formik.setFieldValue(`${name}startCountEventsSince`, '');
              formik.setFieldValue(`${name}startCountEventsSinceCampaignLaunch`, true);
            }}
          >
            + Start counting events since Date
          </Button>
          <Hint text={sinceDateHint} />
        </>
        )}
      </div>
    </div>
  );
};
