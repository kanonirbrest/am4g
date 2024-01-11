import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import deviceControlStyles from 'utils/styles/deviceControlStyles';
import MaterialButton from '@mui/material/Button';
import { addOfferForAllLanguages } from 'utils/languageUtils';
import { preventAction } from 'utils';
import { BUTTON_TYPES } from 'utils/styles/common';
import Hint from 'components/Hint';
import { useFormikContext } from 'formik';
import EditorView from './EditorView';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  label: {
    ...deviceControlStyles.label,
    fontSize: '14px',
  },
}));

export default ({
  values, index: activeFieldIndex,
  ...props
}) => {
  const classes = useStyles();
  const formik = useFormikContext() ?? {};
  const onAddVariant = (e) => {
    preventAction(e);
    const languages = addOfferForAllLanguages(formik.values.step2.languages, activeFieldIndex);
    formik.setFieldValue('step2.languages', languages);
  };

  return (
    <div>
      <div className={cn(classes.row, classes.editorMargin)}>
        {values.text.length === 1
          ? <div className={classes.label}>Text</div>
          : (
            <div className={classes.label}>
              Base Text
              <Hint text="This content will be shown to a user
              in case he doesn’t correspond to other text conditions. "
              />
            </div>
          )}
        {values.text.map((t, index) => (
          <EditorView
            key={t.id}
            values={values}
            text={t.text}
            editorIndex={index}
            index={activeFieldIndex}
            {...props}
            name={`${props.name}text[${index}].text`}
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
  );
};
