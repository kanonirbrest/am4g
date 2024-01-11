import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import Button from '@mui/material/Button';
import TextColor from 'assets/icons/TextColor';
import { BUTTON_TYPES } from 'utils/styles/common';
import FormikColorPicker from './index';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  opened: {
    marginTop: '12px',
  },
  button: {
    marginTop: '12px',
  },
}));

export default ({
  classes: propClasses,
  ...pickerProps
}) => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(null);

  return (
    <div className={cn({
      [classes.wrapper]: true,
      [classes.opened]: !isOpened,
    })}
    >
      {isOpened ? (
        <>
          <FormikColorPicker {...pickerProps} />
          <Button
            variant={BUTTON_TYPES.TRANSPARENT}
            disableRipple
            onClick={() => {
              setIsOpened(false);
            }}
            className={classes.button}
          >
            Remove color
          </Button>
        </>
      ) : (
        <Button
          variant={BUTTON_TYPES.TRANSPARENT}
          disableRipple
          onClick={() => {
            setIsOpened(true);
          }}
        >
          <TextColor />
          Change color
        </Button>
      )}
    </div>
  );
};
