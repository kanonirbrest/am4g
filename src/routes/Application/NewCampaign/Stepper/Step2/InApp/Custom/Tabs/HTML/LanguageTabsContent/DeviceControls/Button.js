import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import _get from 'lodash.get';
import MaterialButton from '@mui/material/Button';

import Select from 'components/FormControls/Select/select';
import FormikColorPicker from 'components/FormControls/FormikColorPicker';
import FormikCheckbox from 'components/FormControls/Checkbox';
import {
  cutRoundOptions,
} from 'utils/deviceControlUtils';
import { ButtonActionOptions } from 'utils/constants/campaign';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import { addOfferForAllLanguages, onAddActionToAllLanguages } from 'utils/languageUtils';
import { getFilteredActions } from 'utils/actionUtils';
import { BUTTON_TYPES } from 'utils/styles/common';
import { preventAction } from 'utils';
import { useFormikContext } from 'formik';
import FormikSelect from 'components/FormControls/Select';
import EditorView from './EditorView';
import Actions from './Actions';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  checkBox: {
    marginTop: '15px',
  },
  withoutSpace: {
    marginBottom: 0,
    marginTop: 0,
  },
}));

export default ({
  values = {},
  name,
  actionProps,
  index: activeFieldIndex,
  pages = [],
  platform,
  ...props
}) => {
  const classes = useStyles();
  const { setFieldValue, values: formikValues } = useFormikContext();

  const onAddAction = (e) => {
    const languages = onAddActionToAllLanguages(
      e.target.value, _get(formikValues, 'step2.languages'),
      activeFieldIndex, ButtonActionOptions,
    );
    setFieldValue('step2.languages', languages);
  };
  const onAddVariant = (e) => {
    preventAction(e);
    const languages = addOfferForAllLanguages(formikValues.step2.languages, activeFieldIndex);
    setFieldValue('step2.languages', languages);
  };

  return (
    <div>
      <div>
        <div className={cn(classes.row, classes.editorMargin)}>
          <div className={classes.label}>Text</div>
          {values.text.map((t, index) => (
            <EditorView
              key={t.id}
              values={values}
              editorIndex={index}
              index={activeFieldIndex}
              text={t.text}
              {...props}
              actionProps={actionProps}
              name={`${name}text[${index}].text`}
            />
          ))}
        </div>
        <div className={classes.addContainer}>
          <MaterialButton
            variant={BUTTON_TYPES.TRANSPARENT}
            onClick={(e) => onAddVariant(e)}
          >
            + Add text
          </MaterialButton>
        </div>
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
          classes={{ control: classes.checkBox }}
          {...actionProps}
        />
      </div>
      <div className={classes.row}>
        <div className={classes.label}>Action Result</div>
        <Select
          options={getFilteredActions(ButtonActionOptions, values.actions)}
          name=""
          placeholder={!values?.actions?.length ? 'Select action'
            : `${values.actions.length} actions selected`}
          value=""
          onChange={onAddAction}
          classes={{
            select: classes.actionResultSelect,
          }}
          {...actionProps}
        />
        <Actions
          platform={platform}
          actions={values.actions}
          actionOptions={ButtonActionOptions}
          name={name}
          pages={pages}
          fieldIndex={activeFieldIndex}
          actionProps={actionProps}
        />
      </div>
    </div>
  );
};
