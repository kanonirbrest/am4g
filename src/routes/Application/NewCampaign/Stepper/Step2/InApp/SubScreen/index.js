import React from 'react';
import { makeStyles } from '@mui/styles';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import ContentBox from 'components/ContentBox';
import FormikTextField from 'components/FormControls/TextField';
import Delivery from 'routes/Application/NewCampaign/Stepper/Step2/InApp/Delivery';

const useStyles = makeStyles(() => ({
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightLabel: {
    fontSize: '12px',
    color: '#6C7688',
    marginBottom: '5px',
  },
  formControl: {
    width: '640px',
    alignItems: 'normal',
    textAlign: 'start',
    marginBottom: '15px',
  },
  tabsPanelWrapper: {
    padding: '10px 0',
  },
  paramWrapper: {
    width: '240px',
  },
  equality: {
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  wrapper: {
    marginBottom: '20px',
  },
  inputContainer: {
    minWidth: '640px',
  },
  removeBtn: {
    marginTop: '12px',
  },
}));

const step = 'step2';
const name = `${step}.`;

export default function InAppDeeplink({
  triggers = {},
  isEdit,
  activeApplication,
}) {
  const classes = useStyles();

  return (
    <>
      <Delivery
        triggers={triggers}
        isEdit={isEdit}
        activeApplication={activeApplication}
      />
      <ContentBox
        label="CONTENT"
        classes={{
          box: classes.contentBox,
        }}
      >
        <div>
          <LabelWithAsterisk label="Screen ID" />
          <FormikTextField
            name={`${name}subscription_screen_id`}
            withDebounce
            classes={{
              control: classes.inputContainer,
              root: classes.inputContainer,
            }}
            placeholder="Enter deeplink"
          />
        </div>
      </ContentBox>
    </>
  );
}
