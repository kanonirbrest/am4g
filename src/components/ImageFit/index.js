import React from 'react';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import { useFormikContext } from 'formik';

import FitIn from 'assets/icons/FitIn';
import FitOut from 'assets/icons/FitOut';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    fontSize: '11px',
    color: '#6C7688',
    marginBottom: '5px',
    marginRight: '10px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  activeButton: {
    background: '#8D95A9',
    borderRadius: '4px',
    height: '33px',
    width: '33px',
    marginRight: '5px',
    '&:hover': {
      background: '#8D95A9',
    },
  },
  button: {
    background: 'transparent',
    borderRadius: '4px',
    height: '33px',
    width: '33px',
    marginRight: '5px',
    '&:hover': {
      background: 'transparent',
    },
    '&:hover svg path': {
      fill: '#6C7688 !important',
    },
  },
  label: {
    marginBottom: '5px',
    color: '#6C7688',
  },
}));

export default ({
  value, name, actionProps = {},
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  return (
    <div className={classes.wrapper}>
      <div className={classes.label}>Image Fit</div>
      <div>
        <IconButton
          onClick={() => {
            setFieldValue(name, 'fitIn');
          }}
          aria-label="fitIn"
          classes={{
            root:
                value === 'fitIn' ? classes.activeButton : classes.button,
          }}
          {...actionProps}
        >
          <FitIn
            color={value === 'fitIn' ? 'white' : '#8D95A9'}
          />
        </IconButton>
        <IconButton
          onClick={() => {
            setFieldValue(name, 'fitOut');
          }}
          aria-label="fitOut"
          classes={{
            root:
                value === 'fitOut' ? classes.activeButton : classes.button,
          }}
          {...actionProps}
        >
          <FitOut
            color={value === 'fitOut' ? 'white' : '#8D95A9'}
          />
        </IconButton>
      </div>
    </div>
  );
};
