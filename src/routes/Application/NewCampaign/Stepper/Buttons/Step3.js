import React from 'react';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

import Rocket from 'assets/icons/Rocket';
import Draft from 'assets/icons/Draft';
import { STATUS } from 'utils/constants/campaign';
import { BUTTON_TYPES } from 'utils/styles/common';
import useStyles from './styles';

export default ({
  isEdit,
  campaignData,
  isShowDraft,
  submitted,
  setSubmitted,
  shouldRunRef,
}) => {
  const { isValid, handleSubmit: formikHandleSubmit } = useFormikContext();
  const classes = useStyles();

  const disabled = !isValid && submitted;
  const handleSubmit = (e) => {
    setSubmitted(true);
    formikHandleSubmit(e);
  };

  return (
    <div className={classes.buttonsWrapper}>
      {isEdit ? (
        <Button
          variant={BUTTON_TYPES.BLUE}
          color="primary"
          onClick={handleSubmit}
          disabled={disabled}
        >
          <Rocket className={classes.icon} color="white" />
          Update campaign
        </Button>
      )
        : (
          <Button
            variant={BUTTON_TYPES.BLUE}
            color="primary"
            type="submit"
            disabled={disabled}
            onClick={handleSubmit}
          >
            <Rocket className={classes.icon} color="white" />
            Launch campaign
          </Button>
        )}
      {isEdit
      && [STATUS.STOPPED, STATUS.DRAFT].includes(campaignData.status)
        && (
        <Button
          variant={BUTTON_TYPES.BLUE}
          color="primary"
          onClick={(e) => {
            // eslint-disable-next-line no-param-reassign
            shouldRunRef.current = STATUS.ACTIVE;
            handleSubmit(e);
          }}
          disabled={disabled}
          className={classes.saveAndRun}
        >
          Save and Run
        </Button>
        )}
      {isShowDraft && (
        <Button
          variant={BUTTON_TYPES.WHITE}
          onClick={(e) => {
            // eslint-disable-next-line no-param-reassign
            shouldRunRef.current = STATUS.DRAFT;
            handleSubmit(e);
          }}
          className={classes.save}
          type="submit"
          disabled={disabled}
        >
          <Draft className={classes.icon} />
          Save as Draft
        </Button>
      )}
    </div>
  );
};
