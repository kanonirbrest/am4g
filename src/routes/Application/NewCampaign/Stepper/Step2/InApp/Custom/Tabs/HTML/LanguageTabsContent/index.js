import React from 'react';
import _get from 'lodash.get';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { v4 as uuidv4 } from 'uuid';

import { DEVICE_CONTROL } from 'utils/constants';
import { BUTTON_TYPES } from 'utils/styles/common';
import { getDefaultWidgetValues, WIDGET_BUTTONS } from 'utils/constants/DeviceWidget';
import { getPageUuidByIndex } from 'utils/pageUtils';
import { useFormikContext } from 'formik';
import DeviceControls from './DeviceControls';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: '0 20px',
  },
  actionsWrapper: {
    display: 'flex',
    alignItems: 'start',
    marginBottom: '10px',
  },
  button: {
    minWidth: '140px',
    marginRight: '10px',
    whiteSpace: 'nowrap',
  },
}));

const isPageFieldsHaveFeedback = (formik, page) => (formik.values
  .step2.languages[0].fields.filter((f) => f.type === DEVICE_CONTROL.FEEDBACK)
  .map((f) => f.page)
  .includes(page));

const LanguageTabsContent = ({
  tabValue, hovered,
  setHovered,
  platform: platformValue,
  submitted,
  page,
  pages,
  forceEditorUpdate,
}) => {
  const formik = useFormikContext() ?? {};
  const classes = useStyles();
  const onAddField = (field) => {
    const uuid = uuidv4();
    const pageId = getPageUuidByIndex(pages, page);

    const languages = _get(formik.values, 'step2.languages')
      .map((lang) => {
        const fields = lang.fields || [];

        return {
          ...lang,
          fields: [...fields, {
            index: uuid,
            type: field,
            page,
            pageId,
            ...getDefaultWidgetValues(field, platformValue),
          }],
        };
      });

    formik.setFieldValue('step2.languages', languages)
      .then(() => {
        formik.validateForm();
      });
  };
  const onAddNPS = () => {
    const uuid = uuidv4();
    const languages = _get(formik.values, 'step2.languages')
      .map((lang) => {
        const fields = lang.fields || [];
        const pageId = getPageUuidByIndex(pages, page);

        const additionalFields = [
          {
            index: uuid,
            type: DEVICE_CONTROL.NPS_SCORE,
            page,
            pageId,
            ...getDefaultWidgetValues(DEVICE_CONTROL.NPS_SCORE, platformValue),
          },
          {
            index: uuid,
            type: DEVICE_CONTROL.NPS_DESCRIPTION,
            page,
            pageId,
            ...getDefaultWidgetValues(DEVICE_CONTROL.NPS_DESCRIPTION, platformValue),
          },
          {
            index: uuid,
            type: DEVICE_CONTROL.NPS_SLIDER,
            label: 'NPS',
            page,
            pageId,
            ...getDefaultWidgetValues(DEVICE_CONTROL.NPS_SLIDER, platformValue),
          },
          {
            index: uuid,
            type: DEVICE_CONTROL.NPS_BUTTON,
            page,
            pageId,
            ...getDefaultWidgetValues(DEVICE_CONTROL.NPS_BUTTON, platformValue),
          },
        ];

        return {
          ...lang,
          fields: [...fields, ...additionalFields],
        };
      });
    formik.setFieldValue('step2.languages', languages)
      .then(() => {
        formik.validateForm();
      });
  };
  const fields = _get(
    formik, 'values.step2.languages[0].fields',
  );
  const isNPSAdded = fields
    .findIndex((field) => field.type === DEVICE_CONTROL.NPS_BUTTON) >= 0;

  return (
    <div className={classes.wrapper}>
      <div className={classes.actionsWrapper}>
        {WIDGET_BUTTONS.map(({ label, value }) => {
          const isFeedbackDisabled = isPageFieldsHaveFeedback(formik);

          return (
            <Button
              key={label}
              aria-controls="action-menu"
              aria-haspopup="true"
              variant={BUTTON_TYPES.ADD}
              disableRipple
              disabled={(value === 'nps' && isNPSAdded)
                || (value === DEVICE_CONTROL.FEEDBACK && isFeedbackDisabled)}
              classes={{ root: classes.button }}
              onClick={() => {
                if (value === 'nps') {
                  onAddNPS(value);
                } else {
                  onAddField(value);
                }
              }}
            >
              {label}
            </Button>
          );
        })}
      </div>

      <DeviceControls
        page={page}
        tabValue={tabValue}
        hovered={hovered}
        setHovered={setHovered}
        platform={platformValue}
        submitted={submitted}
        pages={pages}
        forceEditorUpdate={forceEditorUpdate}
      />
    </div>
  );
};
export default LanguageTabsContent;
