import React from 'react';
import _get from 'lodash.get';
import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';

import { OPEN_ACTION, OPEN_ACTION_LABEL } from 'utils/constants/campaign';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import RemoveButton from 'components/RemoveButton';
import { updateActionPropForAllLangs, onRmvActionForAllLanguages }
  from 'utils/languageUtils';
import AndLine from 'assets/icons/AndLine';
import { useFormikContext } from 'formik';
import SendAnalyticsEvent from './SendAnalyticsEvent';
import SubFields from './SubFields';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  checkBox: {
    marginTop: '15px',
  },
  withoutSpace: {
    marginBottom: 0,
    marginTop: 0,
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '48px',
    border: '1px solid rgb(216, 223, 232)',
    borderRadius: '20px',
    padding: '10px',
  },
  chip: {
    width: '180px',
    marginRight: '30px',
  },
  actionsList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  andIcon: {
    marginLeft: '40px',
  },
}));

export default ({
  actions = [],
  actionOptions = [],
  name,
  pages,
  fieldIndex,
  actionProps,
  type,
  platform,
}) => {
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext();

  // update them on blur
  const onChange = (e, actionIndex, prop = 'value') => {
    const languages = updateActionPropForAllLangs(
      e.target.value, _get(values, 'step2.languages'),
      fieldIndex, actionIndex, prop,
    );
    setFieldValue('step2.languages', languages);
  };
  const onRemove = (removeIndex) => {
    const languages = onRmvActionForAllLanguages(
      _get(values, 'step2.languages'),
      fieldIndex, removeIndex,
    );
    setFieldValue('step2.languages', languages);
  };

  return (
    <div className={classes.actionsList}>
      {
        actions.map((action, actionIndex) => {
          const subField = actionOptions
            .find((opt) => opt.value === action.action)?.subField;

          if (action.action === OPEN_ACTION.SEND_ANALYTICS) {
            return (
              <React.Fragment key={action.action}>
                <div className={classes.actionRow}>
                  <SendAnalyticsEvent
                    action={action}
                    actionIndex={actionIndex}
                    name={name}
                    fieldIndex={fieldIndex}
                  >
                    <RemoveButton
                      onClick={() => onRemove(actionIndex)}
                      disabled={action.disabledRemove}
                      {...actionProps}
                    />
                  </SendAnalyticsEvent>
                </div>
                {actionIndex !== actions.length - 1
                  && <AndLine className={classes.andIcon} />}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={action.action}>
              <div className={classes.actionRow}>
                <Chip
                  label={OPEN_ACTION_LABEL[action.action]}
                  className={classes.chip}
                  color="primary"
                  variant="outlined"
                />
                {subField && (
                  <SubFields
                    name={name}
                    actionProps={actionProps}
                    subField={subField}
                    actionIndex={actionIndex}
                    value={action.value}
                    onChange={onChange}
                    pages={pages}
                    platform={platform}
                  />
                )}
                <RemoveButton
                  onClick={() => onRemove(actionIndex)}
                  disabled={type === 'NPS' && action.action === OPEN_ACTION.SUBMIT}
                  {...actionProps}
                />
              </div>
              {actionIndex !== actions.length - 1
                && <AndLine className={classes.andIcon} />}
            </React.Fragment>
          );
        })
      }
    </div>
  );
};
