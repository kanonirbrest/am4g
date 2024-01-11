import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@apollo/client';
import { predictAudienceMutation }
  from 'api/queries';
import PredictResult from 'routes/Application/NewCampaign/Stepper/PredictAudience/PredictResult';
import useStyles from 'routes/Application/NewCampaign/Stepper/PredictAudience/styles';
import getCampaignPayload from 'utils/sendCampaign';
import { removeEmpty } from 'utils/arrayUtils';
import Stack from '@mui/material/Stack';
import SnackBar from 'components/SnackBar';

export default function PredictAudienceDialog({
  setIsOpen, title, isOpen, values,
  activeApplication,
}) {
  const classes = useStyles();
  const [isShowPredictAudience, setIsShowPredictAudience] = useState(false);
  const [isErrorNotificationOpen, setIsErrorNotificationOpen] = useState(false);
  const [predictResult, setPredictResult] = useState({});
  const [runRequest, setRunRequest] = useState(false);
  const handleResponse = {
    onCompleted(data) {
      setPredictResult(data.predictAudience);
      setIsShowPredictAudience(true);
    },
    onError() {
      setIsErrorNotificationOpen(true);
    },
  };
  const [
    predictAudience,
  ] = useMutation(predictAudienceMutation, handleResponse);
  const onPredictAudience = () => {
    const campaign = getCampaignPayload(values, activeApplication);

    predictAudience({
      variables: {
        input: {
          campaign: removeEmpty(campaign),
          campaignId: values.id,
        },
      },
    });
  };
  const onClose = () => {
    setIsErrorNotificationOpen(false);
    setIsShowPredictAudience(false);
  };
  if (!runRequest) {
    onPredictAudience();
    setRunRequest(true);
  }

  return (
    <>
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        open={isOpen}
        classes={{ paper: classes.dialog }}
      >
        <MuiDialogTitle className={classes.root}>
          <div>{title}</div>
        </MuiDialogTitle>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <div className={classes.container}>
              {isShowPredictAudience
                && (
                  <PredictResult
                    predictValue={predictResult.predictValue}
                    rank={predictResult.rank}
                    percent={predictResult.percent}
                    total={predictResult.total}
                  />
                )}
            </div>
          </div>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <SnackBar
            onClose={onClose}
            open={isErrorNotificationOpen}
            severity="error"
            text="Something went wrong. Predict audience wasn't received"
          />
        </Stack>
      </Dialog>
    </>
  );
}
