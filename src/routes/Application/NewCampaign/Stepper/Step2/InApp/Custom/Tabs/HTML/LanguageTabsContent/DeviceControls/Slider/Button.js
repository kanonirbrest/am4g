import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import AlignToggle from 'components/FormControls/AlignToggle';
import FormikSelect from 'components/FormControls/Select';
import FormikColorPicker from 'components/FormControls/FormikColorPicker';
import {
  cutRoundOptions,
  fontSizeOptions,
}
  from 'utils/deviceControlUtils';
import FontWeightSelect from 'components/FontWeightSelect';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import FormikTextField from 'components/FormControls/TextField';
import FormikCheckbox from 'components/FormControls/Checkbox';
import SingleTypingAutocomplete from 'components/FormControls/Autocomplete/SingleFS';
import { NPSButtonActionOptions } from 'utils/constants/campaign';
import { onAddActionToAllLanguages } from 'utils/languageUtils';
import { getFilteredActions } from 'utils/actionUtils';
import Actions from '../Actions';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  checkBox: {
    marginTop: '15px',
  },
  checkBoxLabel: {
    color: '#3E4554',
    fontSize: '12px',
  },
}));

export default ({
  values = {},
  name,
  actionProps,
  fontFamilyOptions,
  index: activeFieldIndex,
  pages = [],
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const onAddAction = (e) => {
    const languages = onAddActionToAllLanguages(
      e.target.value, _get(values, 'step2.languages'),
      activeFieldIndex, NPSButtonActionOptions,
    );
    setFieldValue('step2.languages', languages);
  };

  return (
    <>
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
            name={`${name}fontSize`}
            inputType="number"
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

      <div className={classes.row}>
        <div className={classes.label}>Text</div>
        <FormikTextField
          withDebounce
          name={`${name}text`}
          placeholder="Enter button text"
          classes={{
            control: classes.textField,
            root: classes.textField,
          }}
          {...actionProps}
        />
      </div>
      <div className={classes.rowContainer}>
        <div className={cn(classes.row, classes.withoutSpace)}>
          <div className={classes.label}>Cut Round</div>
          <FormikSelect
            options={cutRoundOptions}
            value={values.cutRound}
            name={`${name}cutRound`}
            classes={{
              select: classes.select,
            }}
            {...actionProps}
          />
        </div>
        <FormikColorPicker
          label="Background Color"
          value={values.backgroundColor}
          name={`${name}backgroundColor`}
          {...actionProps}
        />
        <FormikCheckbox
          key="showShadow"
          name={`${name}showShadow`}
          label="Show buttons shadow"
          checked={values.showShadow}
          classes={{
            control: classes.checkBox,
            checkBoxLabel: classes.checkBoxLabel,
          }}
          {...actionProps}
        />
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Action Result</div>
        <FormikSelect
          options={getFilteredActions(NPSButtonActionOptions, values.actions)}
          placeholder={!values?.actions?.length ? 'Select action'
            : `${values.actions.length} actions selected`}
          name=""
          value=""
          onChange={onAddAction}
          classes={{
            select: classes.actionResultSelect,
          }}
          {...actionProps}
        />
        <Actions
          actions={values.actions}
          actionOptions={NPSButtonActionOptions}
          name={name}
          pages={pages}
          fieldIndex={activeFieldIndex}
          type="NPS"
        />
      </div>
    </>
  );
};
