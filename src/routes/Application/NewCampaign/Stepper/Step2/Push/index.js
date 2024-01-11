import React, {
  useState, useRef, useEffect,
} from 'react';
import { makeStyles } from '@mui/styles';
import _get from 'lodash.get';

import CustomTabs from 'components/CustomTabs';
import TabPanel from 'components/TabPanel';
import FormikCheckbox from 'components/FormControls/Checkbox';
import Phone from 'components/Phone';
import MessageAndroid from 'components/PhoneAlerts/Message/Android';
import MessageIOS from 'components/PhoneAlerts/Message/IOS';
import DefaultLogo from 'components/Default';
import { campaignType } from 'components/constants';
import PushScheduled
  from 'routes/Application/NewCampaign/Stepper/Step2/Push/Delivery/PushScheduled';
import PushTriggered
  from 'routes/Application/NewCampaign/Stepper/Step2/Push/Delivery/PushTriggered';
import ContentBoxWithVaiants from 'components/ContentBox/ContentBoxWithVaiants';
import LanguageTabsWithVariants from 'components/LanguageTabs/Variant';
import { getLocale } from 'utils/languageUtils';
import { MAX_SHOW_TABS }
  from 'utils/constants/campaignForm';
import { copyObject } from 'utils';
import { moveArray } from 'utils/arrayUtils';
import { STATUS } from 'utils/constants/campaign';
import { DEFAULT_PUSH_LANGUAGE_CONTENT, PLATFORM } from 'utils/constants';
import { useFormikContext } from 'formik';
import { openActionTabsConfig, OpenActionTabsContent } from './OpenActionTabsContent';
import LanguageTabsContent from './LanguageTabsContent';

const step = 'step2';
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
    color: '#3E4554',
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
  tabPanel: {
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.3)',
    border: '1px solid #D8DFE8',
    marginTop: '-1px',
    borderRadius: '8px',
    borderTopLeftRadius: '0',
  },
  tabsPanelLanguagesWrapper: {
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    height: '48px',
    width: '48px',
    borderRadius: '8px',
  },
  messageImg: {
    height: '40px !important',
    width: '40px !important',
    marginRight: '10px',
    borderRadius: '4px',
  },
  messageImgAndroid: {
    height: '20px !important',
    width: 'auto !important',
    marginRight: '6px',
    borderRadius: '4px',
  },
  messageContainer: {
    marginTop: '40px',
  },
  openAction: {
    marginTop: '20px',
    color: '#6C7688',
    fontSize: '11px',
    textAlign: 'start',
  },
  openActionLabel: {
    color: '#6C7688',
    marginBottom: '5px',
  },
}));
const DEFAULT_LANGUAGES = [];
const CAMPAIGNS_WITHOUT_ADD_VARIANTS = [STATUS.ACTIVE, STATUS.STOPPED];
const tablePrefix = 'open-action';
const languagesPrefix = 'languages-table';

export default ({
  allLanguages = [],
  activeApplication,
  type,
  status,
}) => {
  const classes = useStyles();
  const [languageTab, setLanguageTab] = useState(0);
  const [languageTabList, setLanguageTabList] = useState(DEFAULT_LANGUAGES);
  const [activeVariant, setActiveVariant] = useState(0);
  const {
    values: formikValues, setFieldValue, errors, touched, setFieldTouched,
  } = useFormikContext();
  const languages = _get(formikValues, 'step2.languages');
  const values = formikValues[step];
  const phoneRef = useRef(null);

  useEffect(() => {
    setLanguageTabList(Object.keys(languages)
      .map((v) => allLanguages
        .find((l) => l.locale === v)?.title));
  }, [allLanguages.length]);

  const openTabChange = (value) => {
    setFieldValue('step2.deepLink', '');
    setFieldValue('step2.openAction', value);
  };
  const onSelectLanguage = (value) => {
    const langs = copyObject(languages);
    const variants = langs[Object.keys(langs)[0]];
    const newLanguages = {
      ...langs,
      [getLocale(allLanguages, value)]: variants.map((variant) => ({
        name: variant.name,
        ...DEFAULT_PUSH_LANGUAGE_CONTENT(),
      })),
    };

    setFieldValue('step2.languages', newLanguages).then(() => {
      if (languageTabList.length > MAX_SHOW_TABS - 1) {
        const list = [...languageTabList];
        list.splice(MAX_SHOW_TABS - 1, 0, value);
        setLanguageTabList(list);
        setLanguageTab(MAX_SHOW_TABS - 1);
      } else {
        setLanguageTabList([
          ...languageTabList,
          value,
        ]);
        setLanguageTab(languageTabList.length);
      }
    });
  };
  const onFallbackChange = (e) => {
    setFieldValue('step2.fallbackOtherToEn', e.target.checked);
  };
  if (!languageTabList.length) return null;
  const locale = getLocale(
    allLanguages, languageTabList[languageTab],
  );
  const currentVariants = languages[locale];
  const currentVariant = currentVariants[activeVariant];
  const formikLanguageErrors = copyObject(
    _get(errors, 'step2.languages', {}),
  );
  const formikLanguageTouched = copyObject(
    _get(touched, 'step2.languages', {}),
  );
  const errorList = [...new Set(Object.keys(formikLanguageErrors)
    .filter((l) => !!_get(formikLanguageErrors,
      `${l}.${activeVariant}`)
        && (!!_get(formikLanguageTouched,
          `${l}.${activeVariant}.content.body`)))
    .map((l) => {
      const title = allLanguages
        .find((a) => a.locale === l)?.title;

      return languageTabList.findIndex((e) => e === title);
    }))];
  const variantErrorList = [...new Set(Object.keys(formikLanguageErrors)
    .flatMap((loc) => Object.keys(
      formikLanguageErrors[loc] || {},
    ).filter((num) => (!!formikLanguageErrors[loc][num]
          && (!!_get(formikLanguageTouched, `${loc}.${num}.content.body`)))))
    .map((num) => Number(num)))];
  const isAndroid = activeApplication.platform === PLATFORM.ANDROID;

  return (
    <>
      {type === campaignType.pushScheduled && (
      <PushScheduled />
      )}
      {[campaignType.pushTriggeredCancelPaid,
        campaignType.pushTriggeredSessionEnd,
        campaignType.pushTriggeredCancelTrail]
        .includes(type) && <PushTriggered />}
      <ContentBoxWithVaiants
        label="CONTENT"
        classes={{
          box: classes.contentBox,
        }}
        setActiveVariant={setActiveVariant}
        activeVariant={activeVariant}
        variants={currentVariants}
        locale={locale}
        setValue={setFieldValue}
        removeVariantCallback={(target) => {
          const touchedValues = copyObject(formikLanguageTouched);
          setFieldTouched(`step2.languages.${locale}`,
            moveArray(target, touchedValues[locale]));
        }}
        languages={languages}
        errorList={variantErrorList}
        isVariantActionsDisabled={CAMPAIGNS_WITHOUT_ADD_VARIANTS.includes(status)}
      >
        <div className={classes.container}>
          <LanguageTabsWithVariants
            name={`${step}.languages`}
            allOptions={allLanguages.map((l) => l.title)}
            setTab={setLanguageTab}
            tab={languageTab}
            onSelectLanguage={onSelectLanguage}
            setLanguageTabList={setLanguageTabList}
            tabs={languageTabList}
            languages={languages}
            setFieldValue={setFieldValue}
            allLanguages={allLanguages}
            errorList={errorList}
            a11yPrefix={languagesPrefix}
          >
            {languageTabList
              .map((l, index) => (
                <TabPanel
                  key={l}
                  value={languageTab}
                  tabValue={index}
                  a11yPrefix={languagesPrefix}
                  classes={{
                    tabPanel: classes.tabPanel,
                    tabsPanelWrapper: classes.tabsPanelLanguagesWrapper,
                  }}
                >
                  <LanguageTabsContent
                    key={activeVariant}
                    activeVariant={activeVariant}
                    platform={activeApplication.platform}
                    language={locale}
                  />
                </TabPanel>
              ))}
          </LanguageTabsWithVariants>
          <FormikCheckbox
            name="step2.fallbackOtherToEn"
            label="Use English for other languages"
            checked={values.fallbackOtherToEn}
            onChange={onFallbackChange}
          />
          <div className={classes.openAction}>
            <div className={classes.openActionLabel}>Open action</div>
            <CustomTabs
              handleChange={openTabChange}
              tabsValue={values.openAction}
              tabsConfig={openActionTabsConfig}
              a11yPrefix={tablePrefix}
              sm
            >
              { openActionTabsConfig.map(({ tabValue }) => (
                <TabPanel
                  value={values.openAction}
                  key={tabValue}
                  tabValue={tabValue}
                  a11yPrefix={tablePrefix}
                  classes={{
                    tabsPanelWrapper: classes.tabsPanelWrapper,
                  }}
                >
                  <OpenActionTabsContent
                    tabValue={tabValue}
                    step={step}
                    values={values}
                  />
                </TabPanel>
              ))}
            </CustomTabs>
          </div>
        </div>
        <Phone
          backgroundColor="#8D95A9"
          type="color"
          refp={phoneRef}
        >
          {isAndroid ? (
            <MessageAndroid
              icon={activeApplication.image
                ? (
                  <img
                    src={activeApplication.image}
                    className={classes.messageImgAndroid}
                    alt=""
                  />
                )
                : (
                  <DefaultLogo classes={{ img: classes.messageImgAndroid }} />
                )}
              label={activeApplication.name}
              variant={currentVariant}
              classes={{ container: classes.messageContainer }}
            />
          ) : (
            <MessageIOS
              icon={activeApplication.image
                ? (
                  <img
                    src={activeApplication.image}
                    className={classes.messageImg}
                    alt=""
                  />
                )
                : (
                  <DefaultLogo classes={{ img: classes.messageImg }} />
                )}
              label={activeApplication.name}
              variant={currentVariant}
              classes={{ container: classes.messageContainer }}
            />
          )}
        </Phone>
      </ContentBoxWithVaiants>
    </>
  );
};
