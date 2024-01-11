import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikTextField from 'components/FormControls/TextField';
import FormikSelect from 'components/FormControls/Select';
import { actionResultOptions } from 'utils/constants/campaign';
import deviceControlStyles from 'utils/styles/deviceControlStyles';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  inputContainer: {
    minWidth: '275px',
  },
  fieldContainer: {
    marginRight: '10px',
  },
  pickerWrapper: {
    marginTop: '12px',
  },
}));

export default ({
  options,
  selectLabel,
  // subValue,
  subName,
  value,
  name,
  selectProps,
}) => {
  const classes = useStyles();
  const { handleChange } = useFormikContext();

  const subField = options
    .find((item) => item.value
            === value)?.subField;

  return (
    <>
      <div>
        <div className={classes.label}>{selectLabel}</div>
        <FormikSelect
          options={actionResultOptions}
          value={value}
          name={name}
          onChange={handleChange}
          placeholder="Select"
          classes={{
            select: classes.select,
            control: classes.inputContainer,
          }}
          {...selectProps}
        />
      </div>
      {subField && (
      <div className={classes.row}>
        <div
          className={classes.label}
        >
          Enter
          {' '}
          {subField}
        </div>
        {subField && (
        <FormikTextField
          name={subName}
          classes={{
            control: classes.textFieldControl,
            root: classes.textField,
          }}
        />
        )}
      </div>
      )}
    </>
  );
};
