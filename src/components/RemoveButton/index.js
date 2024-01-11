import React from 'react';
import Button from '@mui/material/Button';

import Delete from 'assets/icons/Delete';
import { BUTTON_TYPES } from 'utils/styles/common';

export default ({
  onClick,
  classes: propClasses = {},
  actionProps,
  disabled,
}) => (
  <Button
    variant={BUTTON_TYPES.TRANSPARENT}
    classes={{ root: propClasses.root }}
    onClick={onClick}
    disableRipple
    disabled={disabled}
    {...actionProps}
  >
    <Delete />
    Remove
  </Button>
);
