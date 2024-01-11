import React from 'react';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

import ChevronRight from 'assets/icons/ChevronRight';
import { BUTTON_TYPES } from 'utils/styles/common';
import useStyles from './styles';

export default ({
  submitted,
  setSubmitted,
}) => {
  const classes = useStyles();
  const formik = useFormikContext() ?? {};

  const disabled = !formik.isValid && submitted;
  const handleSubmit = (e) => {
    setSubmitted(true);
    formik.handleSubmit(e);
  };

  return (
    <div className={classes.buttonsWrapper}>
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
