import React from 'react';
import Button from '@mui/material/Button';
import _get from 'lodash.get';
import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';

import {
  updateActionPropForAllLangs,
  rmvActionValueForAllLanguages,
} from 'utils/languageUtils';
import FormikTextField from 'components/FormControls/TextField';
import RemoveButton from 'components/RemoveButton';
import { OPEN_ACTION_LABEL } from 'utils/constants/campaign';
import Hint from 'components/Hint';
import { useFormikContext } from 'formik';

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
  },
  separator: {
    padding: '10px',
  },
  chip: {
    width: '180px',
    marginRight: '15px',
  },
  actionHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  addWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  wrapper: {
    padding: '5px',
  },
  disabledStyles: {
    '&:disabled': {
      color: 'black',
      '-webkit-text-fill-color': 'initial',
      cursor: 'not-allowed',
    },
  },
}));

export default ({
  actionIndex, action, name, fieldIndex,
  children,
}) => {
  const classes = useStyles();
  const formik = useFormikContext() ?? {};

  const onAddParam = () => {
    const actions = [...(action.value || []), {
      name: '',
      value: null,
    }];
    const languages = updateActionPropForAllLangs(
      actions, _get(formik.values, 'step2.languages'),
      fieldIndex, actionIndex, 'value',
    );
    formik.setFieldValue('step2.languages', languages);
  };
  const onChangeActionName = (e) => {
    const languages = updateActionPropForAllLangs(
      e.target.value, _get(formik.values, 'step2.languages'),
      fieldIndex, actionIndex, 'name',
    );
    formik.setFieldValue('step2.languages', languages);
  };
  const onChangeActionParameter = (e, valueIndex, property) => {
    const updatedActions = action.value.map((val, ind) => {
      if (valueIndex === ind) {
        return {
          ...val,
          [property]: e.target.value,
        };
      }

      return val;
    });

    const languages = updateActionPropForAllLangs(
      updatedActions,
      _get(formik.values, 'step2.languages'),
      fieldIndex, actionIndex, 'value',
    );
    formik.setFieldValue('step2.languages', languages);
  };
  const onRemoveActValue = (removeIndex) => {
    const languages = rmvActionValueForAllLanguages(
      _get(formik.values, 'step2.languages'),
      fieldIndex, actionIndex, removeIndex,
    );

    formik.setFieldValue('step2.languages', languages);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.actionHeader}>
        <Chip
          label={OPEN_ACTION_LABEL[action.action]}
          className={classes.chip}
          color="primary"
          variant="outlined"
        />
        <FormikTextField
          name={`${name}actions[${actionIndex}].name`}
          placeholder="Enter event name"
          withDebounce
          onChange={onChangeActionName}
          disabled={action.disabledName}
          classes={{ input: classes.disabledStyles }}
        />
        {children}
        {action.hint && (
        <Hint text={action.hint} height="15px" width="15px" />
        )}
      </div>
      <div className={classes.addWrapper}>
        <Button
          variant="buttonTransparent"
          disableRipple
          onClick={onAddParam}
          disabled={action.disabledName}
        >
          + Add event parameter
        </Button>
      </div>
      <div>
        {
          action.value && action.value.map((actVal, valIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${name}_${valIndex}`} className={classes.row}>
              <FormikTextField
                name={`${name}actions[${actionIndex}].value[${valIndex}].name`}
                placeholder="Event Parameter Name"
                withDebounce
                onChange={(e) => onChangeActionParameter(e, valIndex, 'name')}
                disabled={action.disabledName}
                classes={{ input: classes.disabledStyles }}
              />
              <span className={classes.separator}>=</span>
              <FormikTextField
                name={`${name}actions[${actionIndex}].value[${valIndex}].value`}
                placeholder={actVal.valuePlaceholder || 'Event Parameter Value'}
                withDebounce
                onChange={(e) => onChangeActionParameter(e, valIndex, 'value')}
                disabled={action.disabledName}
                classes={{ input: classes.disabledStyles }}
              />
              <RemoveButton
                onClick={() => {
                  onRemoveActValue(valIndex);
                }}
                disabled={action.disabledRemove}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};
