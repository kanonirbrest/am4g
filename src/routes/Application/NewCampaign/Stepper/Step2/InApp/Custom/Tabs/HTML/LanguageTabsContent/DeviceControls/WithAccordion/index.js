import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import _get from 'lodash.get';
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid';
import { useFormikContext } from 'formik';

import RemoveButton from 'components/RemoveButton';
import Arrow from 'assets/icons/Arrow';
import { ReactComponent as Settings } from 'assets/icons/Settings.svg';
import Copy from 'assets/icons/Copy';
import { languageAccordionStyles } from 'utils/styles/common';
import { preventAction } from 'utils';
import { insert } from 'utils/arrayUtils';
import { DEVICE_CONTROL } from 'utils/constants';
import Badge from './Badge';

const useStyles = makeStyles(() => ({
  ...languageAccordionStyles,
  root: {
    background: '#F8FAFD',
    border: '1px solid #D8DFE8',
    marginBottom: '10px',
    boxShadow: 'none',
    width: '100%',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
export default ({
  activeLanguage,
  hovered,
  setHovered,
  children,
  controlIndex,
  index,
  label,
  type,
  onOpenLayout,
  actions,
}) => {
  const classes = useStyles();
  const formik = useFormikContext() ?? {};

  const onRemoveContent = (removeIndex, e) => {
    e.stopPropagation();
    e.preventDefault();
    const languages = _get(formik.values, 'step2.languages')
      .map((lang, languageIndex) => ({
        ...lang,
        fields: lang.fields.filter(
          (f, fieldIndex) => {
            if (f.index === removeIndex) {
              // https://github.com/jaredpalmer/formik/issues/1511
              formik.setFieldTouched(`step2.languages[${languageIndex}]
              .fields[${fieldIndex}]`, false);
            }

            return f.index !== removeIndex;
          },
        ),
      }));
    formik.setFieldValue('step2.languages', languages);
    if (removeIndex <= hovered) {
      setHovered(null);
    }
  };
  const onCopy = (e, fieldIndex) => {
    preventAction(e);
    const item = formik.values.step2.languages[activeLanguage].fields[fieldIndex];
    const newIndex = uuidv4();
    const copiedItem = { ...item, index: newIndex };
    const selector = `${item.index}-${item.type}`;
    const copiedLayoutItem = formik.values.step2.layout
      .find((l_item) => l_item.i === selector);
    const newLayout = insert(formik.values.step2.layout, item.index,
      { ...copiedLayoutItem, i: `${newIndex}-${item.type}` });
    const languages = _get(formik.values, 'step2.languages')
      .map((l) => {
        const fields = [...(l.fields || [])];

        return {
          ...l,
          fields: insert(fields, item.index, copiedItem),
        };
      });
    formik.setFieldValue('step2.languages', languages);
    formik.setFieldValue('step2.layout', newLayout);
  };
  const onLayout = (e, fieldInd) => {
    preventAction(e);
    onOpenLayout(fieldInd);
  };

  return (
    <Accordion
      key={controlIndex}
      classes={{
        root: cn(classes.root,
          index === hovered ? classes.active : null),
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
        <div className={classes.titleWrapper}>
          {label}
          <Badge
            type={type}
            actions={actions}
          />
        </div>
        <div>
          <>
            {type === DEVICE_CONTROL.RADIO && (
            <IconButton
              size="medium"
              color="primary"
              onClick={(e) => onLayout(e, index)}
            >
              <Settings />
            </IconButton>
            )}
            <IconButton
              size="medium"
              color="primary"
              onClick={(e) => onCopy(e, index)}
            >
              <Copy />
            </IconButton>
          </>
          <RemoveButton onClick={(e) => onRemoveContent(controlIndex, e, type)} />
        </div>
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: classes.detailsRoot,
        }}
        key={formik.values.step2.languages[activeLanguage].fields[index].index}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
