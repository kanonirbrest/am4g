import React from 'react';
import _get from 'lodash.get';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import { v4 as uuidv4 } from 'uuid';

import Arrow from 'assets/icons/Arrow';
import RemoveButton from 'components/RemoveButton';
import { BUTTON_TYPES, languageAccordionStyles } from 'utils/styles/common';
import Copy from 'assets/icons/Copy';
import FormikTextField from 'components/FormControls/TextField';
import ConditionalField from 'components/ConditionalField';
import { getDefaultASValues } from 'utils/campaignUtils';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import { getComponentByType } from '../Controls';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  actionsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  button: {
    marginRight: '10px',
    marginBottom: '10px',
  },
  buttonContainer: {
    textAlign: 'start',
  },
  copyWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    minWidth: '495px',
  },
  ...languageAccordionStyles,
}));

const LanguageTabsContent = ({
  formik,
  tabValue,
}) => {
  const classes = useStyles();
  const languages = _get(formik.values, 'step2.languages');
  const values = formik.values.step2.languages[tabValue];

  const onAddAction = () => {
    const uuid = uuidv4();
    languages.forEach((l) => {
      const fields = l.fields || [];
      const item = {
        index: uuid,
        type: 'action',
        ...getDefaultASValues('action'),
      };
      fields.splice(-1, 0, item);
      formik.setFieldValue(`step2.languages[${tabValue}].fields`, fields);
    });
  };
  const onShowMessage = () => {
    const isTitleAdded = languages[0].fields.find((item) => item.type === 'ASTitle');

    if (!isTitleAdded) {
      languages.forEach((l) => {
        const fields = l.fields || [];
        const item = {
          index: 0,
          type: 'ASTitle',
          ...getDefaultASValues('ASTitle'),
        };

        formik.setFieldValue(`step2.languages[${tabValue}].fields`, [item, ...fields]);
      });
    }
  };
  const onRemoveAction = (removeIndex, e) => {
    e.stopPropagation();
    e.preventDefault();
    languages.forEach((l, index) => {
      formik.setFieldValue(`step2.languages[${index}].fields`,
        languages[index].fields.filter(
          (f, ind) => ind !== removeIndex,
        ));
    });
  };
  const { fields } = values;
  const actions = fields.filter((item) => item.type === 'action');

  return (
    <div className={classes.wrapper}>
      <div className={classes.copyWrapper}>
        <Button
          variant={BUTTON_TYPES.TRANSPARENT}
          disableRipple
          onClick={() => {}}
        >
          <Copy />
          Copy text from another language
        </Button>
      </div>
      {fields.map((item, index) => {
        const actionProps = {
          formik,
          values: formik.values.step2.languages[tabValue].fields[index],
          name: `step2.languages[${tabValue}].fields[${index}].`,
          actionProps: {},
        };

        return (
          <>
            {index === 0 && (
            <div className={classes.actionsWrapper}>
              <ConditionalField buttonTitle="+ Add title" onShow={onShowMessage}>
                <div>
                  <div className={classes.label}>Title</div>
                  <FormikTextField
                    name={`${actionProps.name}title`}
                    classes={{
                      control: classes.inputContainer,
                      root: classes.textField,
                    }}
                    placeholder="Enter Action Sheet title"
                  />
                </div>
              </ConditionalField>
              <ConditionalField buttonTitle="+ Add message" onShow={onShowMessage}>
                <div>
                  <div className={classes.label}>Message</div>
                  <FormikTextField
                    name={`${actionProps.name}message`}
                    classes={{
                      control: classes.inputContainer,
                      root: classes.textField,
                    }}
                    placeholder="Enter Action Sheet message"
                  />
                </div>
              </ConditionalField>
            </div>
            ) }

            {item.type !== 'ASTitle' && (
            <>
              {item.type === 'cancel' && (
              <div className={classes.buttonContainer}>
                <Button
                  variant={BUTTON_TYPES.TRANSPARENT}
                  disableRipple
                  classes={{ root: classes.button }}
                  onClick={onAddAction}
                >
                  + Add action
                </Button>
              </div>
              )}
              <Accordion
                classes={{
                  root: classes.root,
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
                  {item.title || item.type}
                  <RemoveButton
                    onClick={
                        (e) => onRemoveAction(index, e)
                      }
                    disabled={item.type === 'cancel' || actions?.length === 1}
                  />
                </AccordionSummary>
                <AccordionDetails classes={{
                  root: classes.detailsRoot,
                }}
                >
                  {getComponentByType(item.type, actionProps)}
                </AccordionDetails>
              </Accordion>
            </>
            )}

          </>
        );
      })}
    </div>
  );
};
export default LanguageTabsContent;
