import React from 'react';
import { makeStyles } from '@mui/styles';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import Button from '@mui/material/Button';
import { BUTTON_TYPES } from 'utils/styles/common';
import Item from './Item';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '640px',
    alignItems: 'normal',
    textAlign: 'start',
    marginBottom: '15px',
  },
  paramWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
}));

export default ({
  triggers = {},
  trigger,
  valuesName,
  name,
  isMultiple,
}) => {
  const classes = useStyles();
  const formik = useFormikContext();
  const selectedTrigger = triggers.trigger_events
    .find((t) => t.name === trigger);
  const triggerNameOptions = selectedTrigger?.parameters
    .map((p) => ({
      label: p.name,
      value: p.name,
    })) || [];
  const triggeringValues = _get(formik.values, name);

  return (
    <div className={classes.paramWrapper}>
      <Button
        variant={BUTTON_TYPES.TRANSPARENT}
        disableRipple
        onClick={() => {
          formik.setFieldValue(`${name}.${valuesName}`, [
            ...triggeringValues[valuesName], {
              name: '',
              val: [],
            },
          ]);
        }}
      >
        + Add event parameter
      </Button>
      {
        triggeringValues[valuesName] && triggeringValues[valuesName]
          .map((item, index) => (
            <Item
              key={name}
              index={index}
              triggerNameOptions={triggerNameOptions}
              selectedTrigger={selectedTrigger}
              valuesName={valuesName}
              name={name}
              isMultiple={isMultiple}
              isLast={triggeringValues[valuesName].length - 1 === index}
            />
          ))
        }
    </div>
  );
};
