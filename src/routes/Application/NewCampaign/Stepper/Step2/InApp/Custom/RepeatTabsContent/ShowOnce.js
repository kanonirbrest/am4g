import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikTextField from 'components/FormControls/TextField';
import Button from '@mui/material/Button';
import Hint from 'components/Hint';
import { sinceDateHint } from 'utils/constants/hints';
import EventsCount from './EventsCount';
import BeginningDate from './BeginningDate';
import styles from './styles';

const useStyles = makeStyles(() => ({
  ...styles,
}));

export default ({
  name,
  values,
}) => {
  const classes = useStyles();
  const formik = useFormikContext();

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
        <div className={classes.inputLabel}>
          Start the campaign when event triggers at least
        </div>
        <FormikTextField
          name={`${name}repeatOptions.showOnceFrom`}
          classes={{
            control: classes.textField,
            root: classes.input,
          }}
          placeholder="Enter value"
          withDebounce
        />
        <div className={classes.inputLabel}>time(s)</div>
      </div>
      <EventsCount
        startCountEventsSince={values.startCountEventsSince}
        startCountEventsSinceCampaignLaunch={values.startCountEventsSinceCampaignLaunch}
        name={name}
      />
      <div className={classes.addButton}>
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
