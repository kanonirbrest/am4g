import React, { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

import ChevronRight from 'assets/icons/ChevronRight';
import ChevronLeft from 'assets/icons/ChevronLeft';
import { BUTTON_TYPES } from 'utils/styles/common';
import useStyles from './styles';

export default ({
  setSchema,
  setActiveStep,
  submitted,
  setSubmitted,
}) => {
  const formik = useFormikContext();
  const classes = useStyles();
  const isChangedRef = useRef(true); /* variable to handle
  push scheduled continue button disabling */

  const disabled = !formik.isValid && submitted && !isChangedRef.current;
  const handleSubmit = (e) => {
    setSubmitted(true);
    formik.handleSubmit(e);
    isChangedRef.current = false;
  };
  useEffect(() => {
    if (!isChangedRef.current) {
      isChangedRef.current = true;
    }
  }, [formik.values]);

  return (
    <div className={classes.buttonsWrapper}>
      <Button
        variant={BUTTON_TYPES.WHITE}
        onClick={() => {
          setActiveStep(0);
          setSchema(0);
        }}
        className={classes.back}
      >
        <ChevronLeft />
        Back
      </Button>

      <Button
        variant={BUTTON_TYPES.BLUE}
        color="primary"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
      >
        Continue
        <ChevronRight />
      </Button>
    </div>
  );
};
