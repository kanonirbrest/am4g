import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import { equalityOptions } from 'utils/constants';
import FormikTextField from 'components/FormControls/TextField';
import FormikSelect from 'components/FormControls/Select';

const useStyles = makeStyles(() => ({
  startLabel: {
    marginRight: '15px',
    fontSize: '14px',
  },
  label: {
    margin: '0 15px',
    fontSize: '14px',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  selectControl: {
    marginRight: '15px',
  },
}));

export default ({
  values,
  name,
  onRemove,
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  return (
    <FieldContainer
      onRemove={() => onRemove(name)}
    >
      <div className={classes.wrapper}>
        <div className={classes.startLabel}>
          User Bucket
        </div>
        <FormikSelect
          classes={{
            control: classes.selectControl,
          }}
          name={`${name}userBucketOperation`}
          placeholder="User Bucket"
          value={values.userBucketOperation}
          options={[
            ...equalityOptions, {
              label: 'Between',
              value: 'btw',
            }]}
          onChange={(e) => {
            if (e.target.value !== 'btw') {
              setFieldValue(`${name}userBucket`, [values.userBucket[0]]);
            } else {
              setFieldValue(`${name}userBucket`, [values.userBucket[0], null]);
            }
            setFieldValue(`${name}userBucketOperation`, e.target.value);
          }}
        />
        <FormikTextField
          withDebounce
          name={`${name}userBucket[0]`}
          placeholder="Enter value"
        />
        {values.userBucketOperation === 'btw' && (
          <>
            <div className={classes.label}>
              and
            </div>
            <FormikTextField
              withDebounce
              name={`${name}userBucket[1]`}
              placeholder="Enter value"
            />
          </>
        )}
      </div>
    </FieldContainer>
  );
};
