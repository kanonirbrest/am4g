import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import AlignToggle from 'components/FormControls/AlignToggle';
import FormikSelect from 'components/FormControls/Select';
import FormikTextField from 'components/FormControls/TextField';
import FormikColorPicker from 'components/FormControls/FormikColorPicker';
import { cutRoundOptions, fontSizeOptions } from 'utils/deviceControlUtils';
import FontWeightSelect from 'components/FontWeightSelect';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import FormikCheckbox from 'components/FormControls/Checkbox';
import { borderSizeOptions } from 'utils/constants/campaignForm';
import Hint from 'components/Hint';
import SingleTypingAutocomplete from 'components/FormControls/Autocomplete/SingleFS';
import { useFormikContext } from 'formik';
import Paddings from './Paddings';

const requiredLabel = (
  <>
    Make Feedback Box required for User
    <Hint text="If selected user isn't able to leave Feedback Box empty.
    If user tries to submit empty Feedback Box he will
    see highlighted border and native localised browser alert"
    />
  </>
);

const opacityLabel = (
  <>
    Feedback Box opacity before User&#39;s interaction
    <Hint text="If selected Feedback Box has opacity 40% before User
    interacts with it. After User's interaction opacity disappears.
    If unselected Feedback Box has no opacity before User's interaction"
    />
  </>
);

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
  const formik = useFormikContext() ?? {};

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
        <FormikColorPicker
          label="Color"
          value={values.color}
          name={`${name}color`}
          {...actionProps}
        />
        <FormikColorPicker
          label="Background Color"
          value={values.backgroundColor}
          name={`${name}backgroundColor`}
          {...actionProps}
        />
        <div className={classes.rowWithoutSpace}>
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
        <div className={classes.rowWithoutSpace}>
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
        <div className={classes.rowWithoutSpace}>
          <AlignToggle
            name={`${name}alignment`}
            value={values.alignment}
            actionProps={actionProps}
          />
        </div>
        <FormikColorPicker
          label="Border Color"
          value={values.borderColor}
          name={`${name}borderColor`}
          {...actionProps}
        />
        <div className={cn(classes.row, classes.withoutSpace)}>
          <div className={classes.label}>Border size</div>
          <FormikSelect
            options={borderSizeOptions.map((f) => ({ value: f, label: f }))}
            value={values.borderSize}
            name={`${name}borderSize`}
            classes={{
              select: classes.select,
            }}
            {...actionProps}
          />
        </div>
        <Paddings
          name={name}
          actionProps={actionProps}
        />
      </div>

      <div className={classes.row}>
        <div className={classes.label}>Placeholder Text</div>
        <FormikTextField
          name={`${name}text`}
          placeholder="Enter placeholder text"
          withDebounce
          multiline
          classes={{
            control: classes.textField,
            root: classes.textField,
          }}
          {...actionProps}
        />
      </div>
      <FormikCheckbox
        name={`${name}required`}
        label={requiredLabel}
        onChange={(e) => {
          formik.setFieldValue(`${name}required`, e.target.checked);
        }}
        checked={!!values.required}
      />
      <FormikCheckbox
        name={`${name}opacity`}
        label={opacityLabel}
        onChange={(e) => {
          formik.setFieldValue(`${name}opacity`, e.target.checked);
        }}
        checked={!!values.opacity}
      />
    </div>
  );
};
