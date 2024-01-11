import React, {
  useRef, useState,
} from 'react';
import { makeStyles } from '@mui/styles';
import Stepper from '@mui/material/Stepper';
import {
  setNestedObjectValues, Formik,
} from 'formik';
import { useMutation } from '@apollo/client';
import _get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

import AllProductsContext from 'contexts/Products';
import { getSchema } from 'utils/validation';
import StepsMenu, {
  NewCampaignStepContent,
} from 'utils/newCampaignUtils';
import {
  NEW_CAMPAIGN_STEPS,
  CAMPAIGN_TYPE,
  STATUS, OPEN_ACTION,
} from 'utils/constants/campaign';
import {
  inAppHTMLInitialValues,
} from 'utils/constants/campaignForm';
import getCampaignPayload from 'utils/sendCampaign';
import {
  campaignsByApplicationIDQuery, createCampaignMutation,
  updateCampaignMutation,
} from 'api/campaignQueries';
import Spinner from 'components/Spinner';
import WarningDialog from 'components/Dialogs/Warning';
import StepperButtons from 'routes/Application/NewCampaign/Stepper/Buttons';
import { campaignType } from 'components/constants';
import Test from 'assets/icons/Test';
import TestPushDialog from 'routes/Application/NewCampaign/Stepper/TestPush';
import PredictAudienceDialog from 'routes/Application/NewCampaign/Stepper/PredictAudience';
import { removeEmpty } from 'utils/arrayUtils';
import { BUTTON_TYPES } from 'utils/styles/common';
import { BACKUP_KEY } from 'hooks/useBackup';
import FormAsyncLogic from './formAsyncLogic';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
  },
  stepper: {
    background: 'transparent',
    width: '150px',
    marginRight: '40px',
    marginLeft: '30px',
    marginBottom: '100px',
  },
  back: {
    marginRight: '10px',
  },
  form: {
    display: 'flex',
    flexGrow: 1,
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: '0 20px',
  },
  submitError: {
    display: 'flex',
    justifyContent: 'start',
    color: '#E14B50',
    fontSize: '12px',
  },
  icon: {
    marginRight: '10px',
  },
  stepMenuWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
  },
  testButton: {
    marginBottom: '20px',
    width: '200px',
    padding: '0 14px',
  },
  testDescription: {
    color: '#8D95A9',
    fontSize: '10px',
  },
  testWrapper: {
    marginBottom: '40px',
  },
  predictWrapper: {
    marginBottom: '80px',
  },
}));

const getEmptyAndUnreachedPages = (languages, pages) => {
  const destinationsArray = languages[0].fields
    .filter((f) => f.actions)
    .map((f) => f.actions
    // new page actions
      .find((act) => ([OPEN_ACTION.OPEN_PAGE, OPEN_ACTION.PURCHASE, OPEN_ACTION.BUTTON_TRIGGER]
        .includes(act.action))))
    .filter(Boolean).map((act) => {
      if (act.action === OPEN_ACTION.PURCHASE || act.action === OPEN_ACTION.BUTTON_TRIGGER) {
        return [
          act.value.successPage && act.value.successPage,
          act.value.errorPage && act.value.errorPage,
        ];
      }

      return act.value;
    })
    .flat()
    .filter(Boolean);

  const pageUuids = pages
    .map((p) => p.uuid);

  const unreachedPages = pageUuids
    // index because we should not consider first page as unreached
    .filter((uuid, index) => index !== 0 && !destinationsArray.includes(uuid))
    .map((uuid) => pages
      .find((p) => p.uuid === uuid)?.name);

  const allPages = languages[0].fields.map((f) => f.pageId);
  const emptyPages = pageUuids
    .filter((uuid) => !allPages.includes(uuid))
    .map((uuid) => pages
      .find((p) => p.uuid === uuid)?.name);

  return {
    emptyPages,
    unreachedPages,
  };
};

const addExtraDate = (payload) => {
  if ([campaignType.inAppRateReview, campaignType.inAppHoustonRedistribute]
    .includes(payload.type)) {
    // eslint-disable-next-line no-param-reassign
    payload.settings = {
      blanked: true, // temporary overhead ,
      // we need it to handle backend validation - settings can not be blanked
    };
  }
};
const TEST_BUTTON_STEPS = [1, 2];
const TEST_BUTTON_TYPES = [
  campaignType.pushScheduled,
  campaignType.pushTriggered,
  campaignType.pushTriggeredCancelPaid,
  campaignType.pushTriggeredSessionEnd,
  campaignType.pushTriggeredCancelTrail,
];
export default function NewCampaignStepper({
  campaignData,
  activeApplication,
  campaignList,
  isEdit = false,
  step,
}) {
  const classes = useStyles();
  const [allProducts, setAllProducts] = React.useState([]);
  const initialProductValues = React.useRef(null);
  const [activeStep, setActiveStep] = useState(+step || 0);
  const [tab, setTab] = useState(campaignData?.type || CAMPAIGN_TYPE.IN_APP);
  const [schema, setSchema] = useState(() => getSchema(0));
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isShowActionsDialog, setIsShowActionsDialog] = useState(false);
  const [warningsPayload, setWarningsPayload] = useState(null);
  const [isTestDialogOpened, setIsTestDialogOpened] = useState(!!step);
  const [isPredictAudienceDialogOpened, setIsPredictAudienceDialogOpened] = useState(!!step);
  const phoneRef = useRef(null);
  const shouldRunRef = useRef(null);
  const isAfterSave = useRef(false);
  const history = useHistory();
  const isShowDraft = !isEdit || (isEdit && campaignData.status === STATUS.DRAFT);
  const createOptions = {
    refetchQueries: [{
      query: campaignsByApplicationIDQuery,
      variables: { applicationId: activeApplication.id },
    }],
    onCompleted() {
      setSubmitError(null);
      isAfterSave.current = true;
      history.push(`/${activeApplication.id}`);
    },
    onError(err) {
      const errorString = { err }.err.graphQLErrors
        .map((item) => {
          const path = _get(item, 'state.campaignInput[0].path');
          const message = _get(item, 'state.campaignInput[0].message');
          const debugMessage = item?.debugMessage;
          if (debugMessage) return debugMessage;
          if (message && path) {
            return `${path} - ${message}`;
          }

          return _get(item, 'state.campaignInput[0].message',
            item?.message);
        })
        .join(', ');

      setSubmitError(errorString);
    },
  };
  const [updateCampaign, { loading: updateLoading }] = useMutation(updateCampaignMutation,
    createOptions);
  const [createCampaign, { loading }] = useMutation(createCampaignMutation,
    createOptions);

  const onSubmit = (values) => {
    const campaign = getCampaignPayload(values, activeApplication, allProducts);
    const campaignWithoutEmptyFields = removeEmpty(campaign);
    addExtraDate(campaignWithoutEmptyFields); // mutate campaign

    createCampaign({
      variables: {
        campaignInput: {
          ...campaignWithoutEmptyFields,
          status: shouldRunRef.current || 'STATUS_ACTIVE',
        },
      },
    }).then(() => {
      localStorage.removeItem(BACKUP_KEY);
    });
  };
  const onUpdateCampaign = (values) => {
    const campaign = getCampaignPayload(values, activeApplication, allProducts);
    const campaignWithoutEmptyFields = removeEmpty(campaign);
    addExtraDate(campaignWithoutEmptyFields);// mutate campaign

    // eslint-disable-next-line no-unreachable
    updateCampaign({
      variables: {
        campaignInput: {
          ...campaignWithoutEmptyFields,
          id: campaignData.id,
          status: shouldRunRef.current || campaignData.status,
        },
      },
    }).then(() => {
      localStorage.removeItem(BACKUP_KEY);
    });
  };
  const onSubmitFunc = (values, form) => {
    form.validateForm()
      .then((errors) => {
        if (isEmpty(errors)) {
          if (activeStep === 1) {
            if (phoneRef.current?.innerHTML) {
              form.setFieldValue('step2.htmlView', phoneRef
                .current?.innerHTML);
            }

            if (values.step1.type === campaignType.inAppHTML) {
              const { languages } = values.step2;
              const { pages } = values.step2;

              const isWithoutClose = languages[0].fields
                .filter((f) => {
                  if (!f.actions) return false;
                  const foundedClose = f.actions.findIndex((
                    action,
                  ) => OPEN_ACTION.CLOSE_SCREEN === action.action);

                  return foundedClose >= 0;
                })
                .length === 0;

              const {
                unreachedPages,
                emptyPages,
              } = getEmptyAndUnreachedPages(
                languages, pages, isWithoutClose,
              );

              if (isWithoutClose || unreachedPages.length || emptyPages.length) {
                setIsShowActionsDialog(true);
                setWarningsPayload({
                  isWithoutClose,
                  unreachedPages,
                  emptyPages,
                });
                shouldRunRef.current = null;

                return;
              }
            }
          }
          if (activeStep === 2) {
            if (isEdit) {
              onUpdateCampaign(values);
            } else {
              onSubmit(values);
            }
            shouldRunRef.current = null;
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
          shouldRunRef.current = null;
          const newSchema = getSchema(activeStep + 1, values.step1.type);
          setSchema(newSchema);
          form.setTouched({}, false);
          setSubmitted(false);
        } else {
          shouldRunRef.current = null;
          setSubmitted(true);
        }
      });
  };

  if (loading || updateLoading) {
    return <Spinner />;
  }
  const formOnKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13
      && keyEvent.target.localName !== 'textarea') {
      keyEvent.preventDefault();
    }
  };

  // TODO pass setField instead of formik
  return (
    <AllProductsContext.Provider value={{
      allProducts,
      setAllProducts,
      initialProductValues,
    }}
    >
      <div className={classes.root}>
        <Formik
          initialValues={campaignData || inAppHTMLInitialValues}
          validationSchema={schema}
          validateOnChange
          validateOnBlur
          onSubmit={onSubmitFunc}
          className={classes.form}
          onKeyDown={formOnKeyDown}
        >
          {({
            values, isValid, setTouched, validateForm,
          }) => (
            <>
              <FormAsyncLogic
                isAfterSave={isAfterSave}
                activeApplication={activeApplication}
                isEdit={isEdit}
                initialProductValues={initialProductValues}
                setAllProducts={setAllProducts}
                schema={schema}
              />
              <div className={classes.stepMenuWrapper}>
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  classes={{
                    root: classes.stepper,
                  }}
                >
                  <StepsMenu
                    steps={NEW_CAMPAIGN_STEPS}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    setSchema={setSchema}
                    type={inAppHTMLInitialValues.step1.type}
                    validateForm={validateForm}
                  />
                </Stepper>
                {TEST_BUTTON_STEPS.includes(activeStep)
                  && TEST_BUTTON_TYPES.includes(values.step1.type)
                  && (
                  <div className={classes.testWrapper}>
                    <Button
                      variant={BUTTON_TYPES.GREY}
                      onClick={() => {
                        validateForm()
                          .then((errors) => {
                            if (isEmpty(errors)) {
                              setIsTestDialogOpened(true);
                            } else if (Object.keys(errors).length > 0) {
                              setTouched(
                                setNestedObjectValues(errors, true),
                              );
                            }
                          });
                      }}
                      className={classes.testButton}
                      disabled={!isValid}
                    >
                      <Test className={classes.icon} color="#8D95A9" />
                      Test campaign
                    </Button>
                    <div className={classes.testDescription}>
                      Check campaign content and targeting on
                      {' '}
                      <br />
                      your test device.
                    </div>
                  </div>
                  )}
                {TEST_BUTTON_STEPS.includes(activeStep) && (
                  <div className={classes.predictWrapper}>
                    <Button
                      variant={BUTTON_TYPES.GREY}
                      onClick={() => {
                        validateForm()
                          .then((errors) => {
                            if (isEmpty(errors)) {
                              setIsPredictAudienceDialogOpened(true);
                            } else if (Object.keys(errors).length > 0) {
                              setTouched(
                                setNestedObjectValues(errors, true),
                              );
                            }
                          });
                      }}
                      className={classes.testButton}
                      disabled={!isValid}
                    >
                      <Test className={classes.icon} color="#8D95A9" />
                      Predict audience
                    </Button>
                    <div className={classes.testDescription}>
                      Predict audience for your campaign.
                    </div>
                  </div>
                )}
              </div>
              <div className={classes.stepContent}>
                <>
                  <div>
                    <NewCampaignStepContent
                      {...{
                        activeApplication,
                        tab,
                        setTab,
                        isEdit,
                        phoneRef,
                        campaignList: campaignList.campaigns,
                        submitted,
                        step: activeStep,
                        campaignId: campaignData?.id,
                        status: campaignData?.status,
                      }}
                    />
                  </div>
                  {submitError && <div className={classes.submitError}>{submitError}</div>}
                  <StepperButtons {...{
                    activeStep,
                    setSchema,
                    setActiveStep,
                    isEdit,
                    campaignData,
                    setIsTestDialogOpened,
                    isShowDraft,
                    shouldRunRef,
                    submitted,
                    setSubmitted,
                    setIsPredictAudienceDialogOpened,
                  }}
                  />
                </>
              </div>
              {!!isShowActionsDialog && (
              <WarningDialog
                open={!!isShowActionsDialog}
                setOpen={setIsShowActionsDialog}
                confirmCallback={() => {
                  const newSchema = getSchema(activeStep + 1, values.step1.type);
                  setSchema(newSchema);
                  setActiveStep((prevActiveStep) => prevActiveStep + 1);
                  setTouched({}, false);
                  setSubmitted(false);
                }}
                payload={warningsPayload}
              />
              )}
              { TEST_BUTTON_TYPES.includes(values.step1.type) && isTestDialogOpened && (
              <TestPushDialog
                title="Test Campaign"
                isOpen={isTestDialogOpened}
                setIsOpen={setIsTestDialogOpened}
                values={values}
                activeApplication={activeApplication}
              />
              )}
              { isPredictAudienceDialogOpened && (
              <PredictAudienceDialog
                title="Predict Audience"
                isOpen={isPredictAudienceDialogOpened}
                setIsOpen={setIsPredictAudienceDialogOpened}
                values={values}
                activeApplication={activeApplication}
              />
              )}
            </>
          )}
        </Formik>

      </div>
    </AllProductsContext.Provider>
  );
}
