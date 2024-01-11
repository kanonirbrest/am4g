import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import FormikSelect from 'components/FormControls/Select';
import FormikColorPicker from 'components/FormControls/FormikColorPicker';
import {
  fontSizeOptions,
}
  from 'utils/deviceControlUtils';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import { borderSizeOptions } from 'utils/constants/campaignForm';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
}));

export default ({
  values = {},
  name,
  actionProps,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.rowContainer}>
      <FormikColorPicker
        label="Thumb Color"
        value={values.thumbColor}
        name={`${name}thumbColor`}
        {...actionProps}
      />
      <FormikColorPicker
        label="Line Color"
        value={values.lineColor}
        name={`${name}lineColor`}
        {...actionProps}
      />
      <FormikColorPicker
        label="Thumb Border Color"
        value={values.thumbBorder}
        name={`${name}thumbBorder`}
        {...actionProps}
      />
      <div className={cn(classes.row, classes.withoutSpace)}>
        <div className={classes.label}>Thumb-size</div>
        <FormikSelect
          options={fontSizeOptions}
          value={values.thumbSize}
          name={`${name}thumbSize`}
          classes={{
            select: classes.select,
          }}
          {...actionProps}
        />
      </div>
      <div className={cn(classes.row, classes.withoutSpace)}>
        <div className={classes.label}>Line-size</div>
        <FormikSelect
          options={[
            '2', '3', '4', '5', '6', '7', '8', '9', '10',
          ].map((f) => ({ value: f, label: f }))}
          value={values.lineSize}
          name={`${name}lineSize`}
          classes={{
            select: classes.select,
          }}
          {...actionProps}
        />
      </div>
      <div className={cn(classes.row, classes.withoutSpace)}>
        <div className={classes.label}>Border-size</div>
        <FormikSelect
          options={borderSizeOptions.map((f) => ({ value: f, label: f }))}
          value={values.thumbBorderSize}
          name={`${name}thumbBorderSize`}
          classes={{
            select: classes.select,
          }}
          {...actionProps}
        />
      </div>
    </div>
  );
};
