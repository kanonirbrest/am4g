import React from 'react';
import { makeStyles } from '@mui/styles';

import FontWeightSelect from 'components/FontWeightSelect';
import FormikTextField from 'components/FormControls/TextField';
import { actionResultOptions } from 'utils/constants/campaign';
import PickerWithButton from 'components/FormControls/FormikColorPicker/pickerWithButton';
import WithSubField from 'components/WithSubField';
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

const Action = ({
  formik,
  values = {},
  name,
  actionProps = {},
  isCancel = false,
}) => {
  const classes = useStyles();
  const onColorChange = (value) => {
    formik.setFieldValue(`${name}color`, value);
  };

  return (
    <div>
      <div className={classes.rowContainer}>
        <FontWeightSelect
          name={`${name}fontWeight`}
          value={values.fontWeight}
          onChange={(e) => {
            formik.setFieldValue(
              `${name}fontWeight`, e.target.value,
            );
          }}
          {...actionProps}
        />
        <PickerWithButton
          label="Color"
          value={values.color}
          name={`${name}color`}
          onChange={onColorChange}
        />
      </div>
      <div className={classes.rowContainer}>
        <div className={classes.fieldContainer}>
          <div className={classes.label}>Action title</div>
          <FormikTextField
            name={`${name}title`}
            placeholder="Enter Action title"
            classes={{
              control: classes.inputContainer,
              root: classes.textField,
            }}
            {...actionProps}
          />
        </div>
        <WithSubField
          options={actionResultOptions}
          selectLabel="Action Result"
          value={values.result}
          name={`${name}result`}
          subValue={values.resultValue}
          subName={`${name}resultValue`}
          selectProps={{
            disabled: isCancel,
          }}
        />
      </div>
    </div>
  );
};
export default Action;
