import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';

import Arrow from 'assets/icons/Arrow';
import { BUTTON_TYPES, languageAccordionStyles } from 'utils/styles/common';
import { preventAction } from 'utils';
import { copyRadioButton, removeRadioButton } from 'utils/RadioWidget/utils';

const useStyles = makeStyles(() => ({
  ...languageAccordionStyles,
  root: {
    ...languageAccordionStyles.root,
    background: 'white',
    color: '#3E4554',
  },
  buttons: {
    color: '#B2BED1',
  },
  label: {
    fontSize: '12px',
    fontWeight: 400,
  },
  expanded: {
    margin: '0 0 10px 0!important',
  },
  summaryRoot: {
    ...languageAccordionStyles.summaryRoot,
    minHeight: '48px !important',
  },
  content: {
    ...languageAccordionStyles.content,
    margin: '0 !important',
  },
  button: {
    padding: 0,
    minWidth: '30px',
  },
  separator: {
    margin: '0 10px',
    display: 'inline',
  },
  detailsRoot: {
    ...languageAccordionStyles.detailsRoot,
    padding: 0,
  },
}));

export default ({
  activeLanguage,
  buttonIndex,
  activeFieldIndex,
  hovered,
  setHovered,
  children,
  label,
  isRemoveDisabled = false,
}) => {
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext() ?? {};

  const onRemoveContent = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const languages = removeRadioButton(_get(values, 'step2.languages'),
      activeFieldIndex, buttonIndex);
    setFieldValue('step2.languages', languages);
    if (buttonIndex <= hovered) {
      setHovered(null);
    }
  };
  const onCopy = (e) => {
    preventAction(e);
    const languages = copyRadioButton(_get(values, 'step2.languages'),
      activeFieldIndex, buttonIndex);

    setFieldValue('step2.languages', languages);
  };

  return (
    <Accordion
      key={activeFieldIndex}
      classes={{
        root: cn(classes.root,
          activeFieldIndex === hovered ? classes.active : null),
        expanded: classes.expanded,
      }}
    >
      <AccordionSummary
        expandIcon={<Arrow />}
        aria-controls="panel1a-content"
        classes={{
          content: classes.content,
          root: classes.summaryRoot,
        }}
      >
        <span className={classes.label}>{label}</span>
        <div className={classes.buttons}>
          <Button
            onClick={onCopy}
            variant={BUTTON_TYPES.TRANSPARENT}
            className={classes.button}
          >
            Copy
          </Button>
          <div className={classes.separator}>
            |
          </div>
          <Button
            className={classes.button}
            onClick={onRemoveContent}
            variant={BUTTON_TYPES.TRANSPARENT}
            disabled={isRemoveDisabled}
          >
            Remove
          </Button>
        </div>
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: classes.detailsRoot,
        }}
        key={values.step2.languages[activeLanguage].fields[activeFieldIndex].index}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
