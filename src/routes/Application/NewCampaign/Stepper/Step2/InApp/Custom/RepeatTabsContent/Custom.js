import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import AutocompleteFS from 'components/FormControls/Autocomplete/AutocompleteFS';
import FormikTextField from 'components/FormControls/TextField';
import RemoveButton from 'components/RemoveButton';
import Button from '@mui/material/Button';
import FormikSelect from 'components/FormControls/Select';
import Hint from 'components/Hint';
import { sinceDateHint } from 'utils/constants/hints';
import BeginningDate from './BeginningDate';
import EventsCount from './EventsCount';
import { PERIOD_OPTIONS } from './Repeated';
import styles from './styles';

const useStyles = makeStyles(() => ({
  ...styles,
  inputWrapperFlat: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
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
    formik.values.step2.triggering.limit,
  );
  const [isShowSessionLimit, setIsShowSessionLimit] = useState(
    formik.values.step2.triggering.perSession,
  );
  const [isShowPeriodLimit, setIsShowPeriodLimit] = useState(
    formik.values.step2.triggering.perPeriodCount,
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
        className={classes.inputWrapperFlat}
      >
        <div className={classes.label}>
          Show campaign on the events
        </div>

        <AutocompleteFS
          options={[]}
          placeholder="Set numbers of events"
          name={`${name}custom`}
          value={values.custom}
        />
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
          startCountEventsSince={values.startCountEventsSince}
          startCountEventsSinceCampaignLaunch={values.startCountEventsSinceCampaignLaunch}
          name={name}
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
