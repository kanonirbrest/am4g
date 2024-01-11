import cn from 'classnames';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
import { makeStyles } from '@mui/styles';

import FormikTextField from 'components/FormControls/TextField';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import Hint from 'components/Hint';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  paddingIcon: {
    width: '13px',
    height: '13px',
  },
  paddingContainer: {
    display: 'flex',
  },
  paddings: {
    display: 'flex',
    marginBottom: '12px',
  },
}));

const DIRECTION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

const PaddingItem = ({ direction, children }) => {
  const classes = useStyles();

  return (
    <div className={cn(classes.row, classes.withoutSpace)}>
      {direction === DIRECTION.VERTICAL && (
      <div>
        <NorthIcon className={classes.paddingIcon} />
        <SouthIcon className={classes.paddingIcon} />
      </div>
      )}
      {direction === DIRECTION.HORIZONTAL && (
        <div>
          <ArrowBackIcon className={classes.paddingIcon} />
          <ArrowForwardIcon className={classes.paddingIcon} />
        </div>
      )}
      {children}
    </div>
  );
};
export default ({
  name,
  actionProps,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.paddings}>
      <div className={classes.row}>
        <div className={classes.label}>Textarea paddings</div>
        <div className={classes.paddingContainer}>
          <PaddingItem
            direction={DIRECTION.VERTICAL}
          >
            <FormikTextField
              name={`${name}paddingVertical`}
              classes={{
                control: classes.paddingBox,
                root: classes.paddingBox,
              }}
              placeholder="Enter px"
              type="number"
              inputProps={{ min: 0 }}
              withDebounce
              {...actionProps}
            />
          </PaddingItem>
          <PaddingItem
            direction={DIRECTION.HORIZONTAL}
          >
            <FormikTextField
              name={`${name}paddingHorizontal`}
              classes={{
                control: classes.paddingBox,
                root: classes.paddingBox,
              }}
              placeholder="Enter px"
              type="number"
              inputProps={{ min: 0 }}
              withDebounce
              {...actionProps}
            />
          </PaddingItem>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>
          Placeholder paddings
          <Hint text="Placeholder’s paddings will be set based on
          the formula: existing text area paddings + paddings selected for placeholder"
          />
        </div>
        <div className={classes.paddingContainer}>
          <PaddingItem
            direction={DIRECTION.VERTICAL}
          >
            <FormikTextField
              name={`${name}placeholderPaddingVertical`}
              classes={{
                control: classes.paddingBox,
                root: classes.paddingBox,
              }}
              placeholder="Enter px"
              type="number"
              inputProps={{ min: 0 }}
              withDebounce
              {...actionProps}
            />
          </PaddingItem>
          <PaddingItem
            direction={DIRECTION.HORIZONTAL}
          >
            <FormikTextField
              name={`${name}placeholderPaddingHorizontal`}
              classes={{
                control: classes.paddingBox,
                root: classes.paddingBox,
              }}
              placeholder="Enter px"
              type="number"
              inputProps={{ min: 0 }}
              withDebounce
              {...actionProps}
            />
          </PaddingItem>
        </div>
      </div>
    </div>
  );
};
