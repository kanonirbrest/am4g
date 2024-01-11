import React from 'react';
import { makeStyles } from '@mui/styles';
import MaterialButton from '@mui/material/Button';

import deviceControlStyles from 'utils/styles/deviceControlStyles';
import _get from 'lodash.get';
import cn from 'classnames';
import { useFormikContext } from 'formik';
import {
  onAddActionToAllLanguages,
} from 'utils/languageUtils';
import {
  addRadioOfferForAllLanguages,
  onAddRadioItem,
} from 'utils/RadioWidget/utils';
import { RadioActionOptions } from 'utils/constants/campaign';
import { preventAction } from 'utils';
import { BUTTON_TYPES } from 'utils/styles/common';
import Select from 'components/FormControls/Select/select';
import { getFilteredActions } from 'utils/actionUtils';
import LabelWithAsterisk from 'components/LabelWithAsterisk';
import RadioEditorView from '../RadioEditorView';
import WithRadioAccordion from './WithRadioAccordion';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  label: {
    ...deviceControlStyles.label,
    fontSize: '11px',
  },
  switcher: {
    color: '#6C7688',
    marginLeft: 'auto',
    fontSize: '12px',
    marginTop: '5px',
  },
  addOffer: {
    marginLeft: '15px',
    marginBottom: '5px',
  },
}));

export default ({
  values = {},
  name,
  actionProps,
  index: activeFieldIndex,
  activeLanguage,
  hovered,
  setHovered,
}) => {
  const classes = useStyles();
  const { setFieldValue, values: formikValues } = useFormikContext();

  const onAddAction = (e) => {
    const languages = onAddActionToAllLanguages(
      e.target.value, _get(formikValues, 'step2.languages'),
      activeFieldIndex, RadioActionOptions,
    );
    setFieldValue('step2.languages', languages);
  };
  const onAddVariant = (e, buttonIndex) => {
    preventAction(e);
    const languages = addRadioOfferForAllLanguages(formikValues.step2.languages, activeFieldIndex, buttonIndex);
    setFieldValue('step2.languages', languages);
  };
  const onAddRadioButton = (e) => {
    preventAction(e);
    const languages = onAddRadioItem(formikValues.step2.languages, activeFieldIndex);
    setFieldValue('step2.languages', languages);
  };

  return (
    <>
      <div>
        <div>
          <div className={classes.row}>
            <LabelWithAsterisk label="Action Type" withAsterisk />
            <Select
              options={getFilteredActions(RadioActionOptions, values.actions)}
              name=""
              value={values.actions.length > 0 ? values.actions[0].action : undefined}
              onChange={onAddAction}
              classes={{
                select: classes.actionResultSelect,
              }}
              {...actionProps}
              disabled
            />
          </div>
          <div className={cn(classes.row, classes.editorMargin)}>
            {values.buttonList.map((button, buttonIndex) => (
              <WithRadioAccordion
                key={button.id}
                hovered={hovered}
                setHovered={setHovered}
                activeLanguage={activeLanguage}
                buttonIndex={buttonIndex}
                activeFieldIndex={activeFieldIndex}
                label={`Radio card ${buttonIndex + 1}`}
                isRemoveDisabled={values.buttonList.length === 1}
              >
                {button.text.map((offerButton, offerIndex) => (
                  <RadioEditorView
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={`${button.id}_${offerIndex}`}
                    values={values}
                    offerIndex={offerIndex}
                    buttonIndex={buttonIndex}
                    activeFieldIndex={activeFieldIndex}
                    editorIndex={0}
                    actionProps={actionProps}
                    textName={`${name}buttonList[${buttonIndex}].text[${offerIndex}]`}
                    name={`${name}buttonList[${buttonIndex}]`}
                  />
                ))}
                <div className={classes.addContainer}>
                  <MaterialButton
                    variant={BUTTON_TYPES.TRANSPARENT}
                    onClick={(e) => onAddVariant(e, buttonIndex)}
                    className={classes.addOffer}
                  >
                    + Add Offer Condition
                  </MaterialButton>
                </div>
              </WithRadioAccordion>
            ))}
          </div>
          <div className={classes.addContainer}>
            <MaterialButton
              variant={BUTTON_TYPES.TRANSPARENT}
              onClick={onAddRadioButton}
            >
              + Add Radio Button
            </MaterialButton>
          </div>
        </div>
      </div>
    </>
  );
};
