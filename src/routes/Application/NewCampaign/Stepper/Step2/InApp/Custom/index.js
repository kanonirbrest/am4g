import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import _get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import Autocomplete from 'components/Autocomplete';
import { useFormikContext } from 'formik';

import OfferStateContext from 'contexts/OfferState';
import LabelWithAsterisk from 'components/LabelWithAsterisk';
import ContentBox from 'components/ContentBox';
import Phone from 'components/Phone';
import CustomTabs from 'components/CustomTabs';
import TabPanel from 'components/TabPanel';
import FormikCheckbox from 'components/FormControls/Checkbox';
import {
  MessageTabsContent, contentTabsConfig,
} from 'routes/Application/NewCampaign/Stepper/Step2/InApp/Custom/MessageTabsContent';
import GL from 'components/GL';
import ActivePageContext from 'contexts/ActivePage';
import GLWithResize from 'components/GL/GLWithResize';
import ConfirmDialog from 'components/Dialogs/Confirm';
import { campaignType } from 'components/constants';
import Delivery from 'routes/Application/NewCampaign/Stepper/Step2/InApp/Delivery';
import AllProductsContext from 'contexts/Products';
import { buildOfferKey } from 'utils/OfferUtils';
import Hint from 'components/Hint';

const useStyles = makeStyles(() => ({
  name: {
    width: '640px',
    display: 'flex',
    marginBottom: '15px',
  },
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: '12px',
    color: '#3E4554',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginRight: '30px',
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
  checkbox: {
    marginTop: '20px',
    color: '#3E4554;',
  },
  wrapper: {
    marginBottom: '20px',
  },
  requiredError: {
    fontSize: '12px',
    color: '#E14B50',
    display: 'flex',
    justifyContent: 'start',
  },
  imitateLabel: {
    textAlign: 'start',
    fontSize: '12px',
    color: '#6C7688',
    paddingLeft: '3px',
  },
  autocomplete: {
    maxWidth: '375px',
  },
}));

const step = 'step2';
const getName = (label) => (`${step}.${label}`);
const requiredErrorText = 'step2.languages[0].fields field must have at least 1 items';
const name = `${step}.`;
const tablePrefix = 'content';

export default function InAppCustom({
  triggers = {},
  allLanguages = [],
  isEdit,
  phoneRef,
  submitted,
  platform,
  activeApplication,
}) {
  const { setFieldValue, ...formik } = useFormikContext();

  const [offers, setOffers] = useState([]);
  const [offerOptions, setOfferOptions] = useState([]);
  const {
    allProducts,
  } = React.useContext(AllProductsContext);

  const classes = useStyles();
  const requiredError = _get(
    formik, 'errors.step2.languages[0].fields',
  ) === requiredErrorText;
  const [languageTab, setLanguageTab] = useState(0);
  const [page, setPage] = useState(1);
  const { pages } = formik.values.step2 || [];
  const setPages = (p) => {
    setFieldValue('step2.pages', p);
  };
  const [hovered, setHovered] = useState(null);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isShowGreed, setIsShowGreed] = useState(false);
  const [payload, setPayload] = useState(null);
  const [errorList, setErrorList] = useState([]);
  const [errorPageList, setErrorPageList] = useState([]);
  const values = formik.values.step2;

  const formikLanguageErrors = _get(formik, 'errors.step2.languages', []);
  const formikLanguageTouched = _get(formik, 'touched.step2.languages', []);

  const handleMessageTypeChange = (newValue) => {
    if (newValue !== formik.values.step1.type) {
      setPayload(newValue);
      setIsShowDialog(true);
    }
  };
  const callback = (newValue) => {
    setFieldValue('step1.type', newValue);
  };
  const handleLayoutUpdate = (layout) => {
    const languages = values.languages.map(
      (l, i) => {
        const { fields } = values.languages[i];
        const newLayout = layout
          .sort((a, b) => a.y - b.y) // y - axis
          .map((item) => fields
            .find((o) => item.i === `${o.index}-${o.type}`));

        return {
          ...l,
          fields: newLayout,
        };
      },
    );
    setFieldValue('step2.languages', languages);
  };

  const onSelectLanguage = (v) => {
    const langs = _get(formik.values, 'step2.languages');
    const defaultFields = langs.length > 0 ? langs[0].fields : [];
    const locale = allLanguages.find((l) => l.title === v)?.locale;

    setFieldValue('step2.languages', [
      ...langs,
      {
        name: v,
        locale,
        fields: [...defaultFields.map((f) => ({
          ...f,
          backgroundValue: undefined,
          backgroundFile: undefined,
        }))],
      },
    ]);
  };
  React.useEffect(() => {
    let errors = [];
    const pageErrors = [];

    if (formikLanguageErrors?.length) {
      errors = formikLanguageErrors
        .map((l, ind) => {
          if (l?.fields) {
            // field must have at least 1 items
            if (typeof l.fields === 'string') {
              return false;
            }
            errors = l.fields.map((f, i) => {
              const touched = _get(
                formikLanguageTouched, `[${ind}].fields[${i}]`, [],
              );
              const errorPage = formik.values.step2
                .languages[ind]?.fields[i]?.page;

              const isTouched = !isEmpty(touched);
              if (f?.backgroundFile || f?.backgroundValue) {
                if (submitted) {
                  pageErrors.push(errorPage);
                }

                return submitted && errorPage === page;
              }
              if (f && f.actions?.length) {
                const actErrors = f.actions
                  .filter((act, actInd) => {
                    if (act?.value) {
                      if (_get(touched, `actions[${actInd}].value`)) {
                        pageErrors.push(errorPage);
                      }
                    }

                    // return language error
                    return !!_get(touched, `actions[${actInd}].value`)
                      && errorPage === page;
                  });
                if (actErrors.length) {
                  return true;
                }
              }

              if (f && isTouched) {
                pageErrors.push(errorPage);

                return errorPage === page;
              }

              return null;
            }).filter(Boolean);

            return errors.length > 0 ? ind : null;
          }

          return (l ? ind : null);
        })
        .filter((n) => typeof n === 'number');
    }

    setErrorPageList(pageErrors);
    setErrorList(errors);
  }, [page, submitted, JSON.stringify(formikLanguageErrors),
    JSON.stringify(formikLanguageTouched)]);
  React.useEffect(() => {
  /* set default offers */
    const productIds = Object.keys(formik.values.step2.products);
    const options = allProducts
      .filter((p) => productIds.includes(p.productId))
      .reduce((acc, next) => acc.concat(next.offers
        .filter(
          // only added offers
          (o) => formik.values
            .step2.products[next?.productId].offers?.includes(
              buildOfferKey(o?.identifier, next?.productId),
            ),
        )
        .map((of) => ({
          label: `${of.identifier} (${next?.title})`,
          value: buildOfferKey(of.identifier, next?.productId),
          productId: next.productId,
          type: of.type,
        })) || []), []);

    setOfferOptions(options);
  }, []);

  return (
    <>
      <OfferStateContext.Provider value={{
        offers, setOffers, offerOptions, setOfferOptions,
      }}
      >
        <ActivePageContext.Provider value={{ page, setPage }}>
          <Delivery
            triggers={triggers}
            isEdit={isEdit}
            activeApplication={activeApplication}
          />
          <ContentBox
            label="CONTENT"
            endLabel=""
            classes={{
              box: classes.contentBox,
            }}
          >
            <div className={classes.container}>
              <LabelWithAsterisk label="Message Type" withAsterisk={false} />
              <CustomTabs
                handleChange={handleMessageTypeChange}
                tabsValue={formik.values.step1.type}
                tabsConfig={contentTabsConfig}
                a11yPrefix={tablePrefix}
                disabled
                sm
              >
                {contentTabsConfig.map(({ tabValue, label }) => (
                  <TabPanel
                    value={formik.values.step1.type}
                    key={tabValue}
                    tabValue={tabValue}
                    a11yPrefix={tablePrefix}
                    classes={{
                      tabsPanelWrapper: classes.tabsPanelWrapper,
                    }}
                  >
                    <MessageTabsContent
                      setPages={setPages}
                      setPage={setPage}
                      pages={pages}
                      tabValue={tabValue}
                      label={label}
                      page={page}
                      step={step}
                      getName={getName}
                      allLanguages={allLanguages}
                      setLanguageTab={setLanguageTab}
                      languageTab={languageTab}
                      hovered={hovered}
                      setHovered={setHovered}
                      platform={platform}
                      onSelectLanguage={onSelectLanguage}
                      submitted={submitted}
                      errorList={errorList}
                      errorPageList={errorPageList}
                      activeApplication={activeApplication}
                    />
                  </TabPanel>
                ))}
              </CustomTabs>
              <FormikCheckbox
                name={`${name}sendEnglish`}
                label="Use English for other languages"
                checked={values.sendEnglish}
                onChange={(e) => {
                  setFieldValue(`${name}sendEnglish`, e.target.checked);
                }}
              />
            </div>
            <div>
              {!!offerOptions.length && (
                <>
                  <div className={classes.imitateLabel}>
                    Imitate screen
                    <Hint text="Select offers to see the screen that will
                be shown to a user in case of eligibility"
                    />
                  </div>
                  <Autocomplete
                    value={offers}
                    containerClass={classes.autocomplete}
                    options={offerOptions}
                    onChange={(e, v) => {
                      setOffers(v.map((o) => o?.value || o));
                    }}
                  />
                </>
              )}
              <FormikCheckbox
                label="Enable grid"
                checked={isShowGreed}
                onChange={(e) => {
                  setIsShowGreed(e.target.checked);
                }}
              />
              <Phone
                background={values.backgroundValue}
                backgroundColor={values.backgroundColor}
                backgroundPosition={values.backgroundPosition}
                backgroundObjectFit={values.backgroundObjectFit}
                backgroundFile={values.backgroundFile}
                type={values.background}
                refp={phoneRef}
                isShowGreed={isShowGreed}
              >
                <form
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexGrow: 1,
                  }}
                  data-onsubmit
                  id="campaign-form"
                >
                  {formik.values.step1.type === campaignType.inAppHTML ? (
                    <GLWithResize
                      values={values.languages[languageTab]}
                      handleLayoutUpdate={handleLayoutUpdate}
                      page={page}
                      hovered={hovered}
                      setHovered={setHovered}
                      innerLayout={isEdit && values.layout}
                      withDrag
                    />
                  ) : (
                    <GL
                      values={values.languages[languageTab]}
                      innerLayout={isEdit && values.layout}
                      withDrag={false}
                    />
                  )}
                </form>
              </Phone>
            </div>
          </ContentBox>
          <ConfirmDialog
            open={isShowDialog}
            setOpen={setIsShowDialog}
            confirmCallback={callback}
            payload={payload}
            text="Do you want to proceed? you will lose all the filled data"
          />
          {submitted && requiredError && (
          <div className={classes.requiredError}>
            Language must have at least 1 item.
          </div>
          )}
        </ActivePageContext.Provider>
      </OfferStateContext.Provider>
    </>
  );
}
