import React, { useState } from 'react';
import cn from 'classnames';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import RemoveButton from 'components/RemoveButton';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'block',
    textAlign: 'start',
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default ({
  isOpened = false,
  buttonTitle,
  children,
  onShow: onShowCallback,
  onRemove: onRemoveCallback,
  classes: propClasses = {},
}) => {
  const classes = useStyles();
  const [isShow, setIsShow] = useState(isOpened);

  const onShow = () => {
    setIsShow(true);
    if (onShowCallback) {
      onShowCallback();
    }
  };
  const onRemove = () => {
    setIsShow(false);
    if (onRemoveCallback) {
      onRemoveCallback();
    }
  };

  return (
    <div className={cn(classes.wrapper, propClasses.wrapper)}>
      {isShow ? (
        <div className={classes.inputContainer}>
          {children}
          <RemoveButton
            onClick={onRemove}
            classes={{ root: propClasses.removeBtn }}
          />
        </div>
      )
        : (
          <Button
            variant={BUTTON_TYPES.TRANSPARENT}
            disableRipple
            onClick={onShow}
          >
            {buttonTitle}
          </Button>
        )}
    </div>
  );
};
