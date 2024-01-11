import React from 'react';
import { makeStyles } from '@mui/styles';
import { OPEN_ACTION } from 'utils/constants/campaign';
import { DEVICE_CONTROL } from 'utils/constants';

const useStyles = makeStyles(() => ({
  badge: {
    padding: '2px 4px',
    background: '#7D95BC',
    borderRadius: '2px',
    fontSize: '8px',
    color: 'white',
    textTransform: 'uppercase',
    margin: '0 0 0 10px',
  },
}));

export default ({
  actions = [], type,
}) => {
  const classes = useStyles();

  if ([DEVICE_CONTROL.BUTTON, DEVICE_CONTROL.IMAGE].includes(type)
      && actions.find((act) => act.action === OPEN_ACTION.BUTTON_TRIGGER)) {
    return (
      <p className={classes.badge}>
        LINKED AS TRIGGER
      </p>
    );
  }
  if (type === DEVICE_CONTROL.RADIO
      && actions.find((el) => el.action === OPEN_ACTION.PURCHASE_TRIGGER)) {
    return (
      <p className={classes.badge}>
        SELECTED
      </p>
    );
  }

  return '';
};
