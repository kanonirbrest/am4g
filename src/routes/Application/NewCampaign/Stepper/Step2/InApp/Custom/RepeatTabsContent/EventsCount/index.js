import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikDateTimePicker from 'components/FormControls/FormikDateTimePicker';
import RemoveButton from 'components/RemoveButton';
import styles from '../styles';

const useStyles = makeStyles(() => ({
  ...styles,
  checkBoxLabel: {
    fontSize: '14px',
  },
}));
export default ({
  name,
  startCountEventsSince,
  startCountEventsSinceCampaignLaunch,
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  if (!startCountEventsSinceCampaignLaunch) {
    return null;
  }

  return (
    <div className={classes.inputContainer}>
      <>
        <div className={classes.limit}>
          <div className={classes.label}>Start counting events since Date </div>
          <FormikDateTimePicker
            value={startCountEventsSince}
            name={`${name}startCountEventsSince`}
          />
        </div>
        <RemoveButton
          onClick={() => {
            setFieldValue(`${name}startCountEventsSinceCampaignLaunch`, false);
            setFieldValue(`${name}startCountEventsSince`, null);
          }}
        />
      </>
    </div>
  );
};
