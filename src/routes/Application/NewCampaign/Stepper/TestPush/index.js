import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import cn from 'classnames';

import Test from 'assets/icons/Test';
import Phone from 'components/Phone';
import Message from 'components/PhoneAlerts/Message/Android';
import DefaultLogo from 'components/Default';
import { checkTargetingDeviceMutation, getLanguagesQuery, sendTestPushMutation }
  from 'api/queries';
import DeviceId from 'routes/Application/NewCampaign/Stepper/TestPush/DeviceId';
import SimpleView from 'routes/Application/NewCampaign/Stepper/TestPush/SimpleView';
import VariantsView
  from 'routes/Application/NewCampaign/Stepper/TestPush/VariantsView';
import { DEVICE_STATUS } from 'utils/constants/campaign';
import {
  deviceIdsSchema, getErrorView, phoneOptions,
}
  from 'routes/Application/NewCampaign/Stepper/TestPush/utils';
import SnackBar from 'components/SnackBar';
import useStyles from 'routes/Application/NewCampaign/Stepper/TestPush/styles';
import Send from 'assets/icons/Send';
import getCampaignPayload from 'utils/sendCampaign';
import { removeEmpty } from 'utils/arrayUtils';
import { BUTTON_TYPES } from 'utils/styles/common';

export default function TestPushDialog({
  setIsOpen, title, isOpen, values,
  activeApplication,
}) {
  const classes = useStyles();
  const { languages, deepLink } = values.step2;
  const [languageTab, setLanguageTab] = useState(Object.keys(languages)[0] || 'en');
  const [variant, setVariant] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isErrorNotificationOpen, setIsErrorNotificationOpen] = useState(false);
  const [isSuccessNotificationOpen, setIsSuccessNotificationOpen] = useState(false);
  const { loading, data: audiencesData } = useQuery(getLanguagesQuery);

  const checkRequestOptions = {
    onCompleted(data) {
      const err = [];
      const { devices } = data.checkTargetingDevice;
      devices.forEach((d, i) => {
        err[i] = {
          idfv: d.idfv,
          status: d.result,
        };

        if (d.result === DEVICE_STATUS.ERROR) {
          err[i].error = getErrorView(d.messages, classes);
        }
      });
      setErrors(err);
    },
  };
  const sendRequestOptions = {
    onCompleted() {
      setIsSuccessNotificationOpen(true);
    },
    onError() {
      setIsErrorNotificationOpen(true);
    },
  };

  const [
    checkTargeting, { loading: checkLoading },
  ] = useMutation(checkTargetingDeviceMutation, checkRequestOptions);
  const [
    sendTestPush,
  ] = useMutation(sendTestPushMutation, sendRequestOptions);

  if (loading) return null;

  const onClose = () => {
    setIsErrorNotificationOpen(false);
    setIsSuccessNotificationOpen(false);
  };
  const onCheckCampaign = (form) => {
    const campaign = getCampaignPayload(values, activeApplication);

    sendTestPush({
      variables: {
        input: {
          campaign: removeEmpty(campaign),
          devices: form.values.ids,
          locale: languageTab,
          variant,
        },
      },
    });
  };
  const onCheckTargeting = (form) => {
    const campaign = getCampaignPayload(values, activeApplication);

    checkTargeting({
      variables: {
        input: {
          campaign: removeEmpty(campaign),
          devices: form.values.ids,
          campaignId: values.id,
        },
      },
    });
  };
  const variants = languages[Object.keys(languages)[0]]
    .map((v) => v.name);
  const isMultiVariant = variants.length > 1;

  return (
    <>
      <Dialog
        onClose={() => {
          setErrors([]);
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
            {isMultiVariant ? (
              <VariantsView
                setLanguageTab={setLanguageTab}
                allLanguages={audiencesData.audiences}
                languageTab={languageTab}
                languages={languages}
                setVariant={setVariant}
                variant={variant}
                variants={variants}
              />
            ) : (
              <SimpleView
                setLanguageTab={setLanguageTab}
                audiencesData={audiencesData}
                languageTab={languageTab}
                languages={languages}
              />
            )}

            {!!deepLink
            && (
            <div className={classes.deepLink}>
              <div className={classes.deepLinkLabel}>Сontains deeplink</div>
              <div className={classes.container}>{deepLink}</div>
            </div>
            )}
            <Formik
              initialValues={{ ids: [''] }}
              validationSchema={deviceIdsSchema}
              validateOnMount
            >
              {(form) => (
                <>
                  <div className={cn(classes.container, classes.ids)}>
                    <div>
                      {form.values.ids.map((el, index) => (
                        <DeviceId
                      /* eslint-disable-next-line react/no-array-index-key */
                          key={index}
                          index={index}
                          field={errors.find((err) => err.idfv === el) || {}}
                          item={el}
                          form={form}
                          ids={form.values.ids}
                          onRemove={() => {
                            form.setFieldValue('ids', [...form.values.ids]
                              .filter((e, ind) => ind !== index));
                          }}
                        />
                      ))}
                      <Button
                        variant={BUTTON_TYPES.TRANSPARENT}
                        disableRipple
                        onClick={() => {
                          form.setFieldValue('ids', [...form.values.ids, '']);
                        }}
                        startIcon={
                          <AddIcon />
                    }
                      >
                        Add one more test device IDFV
                      </Button>
                    </div>
                    <div className={classes.buttonWrapper}>
                      <Button
                        variant={BUTTON_TYPES.DARK_BLUE}
                        disabled={!form.isValid || checkLoading}
                        onClick={() => onCheckTargeting(form)}
                        className={classes.submitButton}
                      >
                        <Test className={classes.icon} color="white" />
                        Check device targeting
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant={BUTTON_TYPES.BLUE}
                      disabled={!form.isValid}
                      onClick={() => onCheckCampaign(form)}
                      className={classes.submitButton}
                    >
                      <Send className={classes.icon} color="white" />
                      Check campaign content
                    </Button>
                  </div>
                </>
              )}

            </Formik>
          </div>
          <div className={classes.right}>
            <Phone
              classes={{ device: classes.device }}
              {...phoneOptions}
            >
              <Message
                icon={activeApplication.image
                  ? (
                    <img
                      src={activeApplication.image}
                      className={classes.messageImg}
                      alt="logo"
                    />
                  )
                  : (
                    <DefaultLogo classes={{ img: classes.messageImg }} />
                  )}
                label={activeApplication.name}
                classes={{ container: classes.messageContainer }}
                variant={languages[languageTab][variant]}
              />
            </Phone>
          </div>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <SnackBar
            onClose={onClose}
            open={isSuccessNotificationOpen}
            text="Push notification was successfully sent"
          />
          <SnackBar
            onClose={onClose}
            open={isErrorNotificationOpen}
            severity="error"
            text="Something went wrong. Push notification wasn't delivered"
          />
        </Stack>
      </Dialog>
    </>
  );
}
