import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import { useFormikContext } from 'formik';

import FormikSelect from 'components/FormControls/Select';
import AlignToggle from 'components/FormControls/AlignToggle';
import FormikColorPicker from 'components/FormControls/FormikColorPicker';
import {
  fontSizeOptions,
}
  from 'utils/deviceControlUtils';
import FontWeightSelect from 'components/FontWeightSelect';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import SingleTypingAutocomplete from 'components/FormControls/Autocomplete/SingleFS';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
}));

export default ({
  values = {},
  name,
  actionProps,
  fontFamilyOptions,
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  return (
    <div className={classes.rowContainer}>
      <FontWeightSelect
        name={`${name}fontWeight`}
        value={values.fontWeight}
        onChange={(e) => {
          setFieldValue(
            `${name}fontWeight`, e.target.value,
          );
        }}
        {...actionProps}
      />
      <FormikColorPicker
        label="Color"
        value={values.color}
        name={`${name}color`}
        {...actionProps}
      />
      <div className={cn(classes.row, classes.withoutSpace)}>
        <div className={classes.label}>Font-size</div>
        <SingleTypingAutocomplete
          options={fontSizeOptions}
          inputType="number"
          name={`${name}fontSize`}
          value={values.fontSize}
          {...actionProps}
        />
      </div>
      <div className={cn(classes.row, classes.withoutSpace)}>
        <div className={classes.label}>Font-family</div>
        <FormikSelect
          options={fontFamilyOptions}
          value={values.fontFamily}
          name={`${name}fontFamily`}
          classes={{
            select: classes.select,
          }}
          {...actionProps}
        />
      </div>
      <div className={cn(classes.row, classes.withoutSpace)}>
        <AlignToggle
          name={`${name}alignment`}
          value={values.alignment}
          actionProps={actionProps}
        />
      </div>
    </div>
  );
};
