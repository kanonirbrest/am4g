import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import HTML from 'routes/Application/NewCampaign/Stepper/Step2/InApp/Custom/Tabs/HTML';
import LanguageTabs from 'components/LanguageTabs';
import { NEW_CAMP_CONTROLS } from 'utils/constants/campaignForm';
import { MESSAGE_TYPE, MESSAGE_TYPE_ENUM } from 'utils/constants/campaign';
import TabPanel from 'components/TabPanel';
import ButtonMenu from 'components/ButtonMenu';
import { findMaxPage, onCopyPage } from 'utils/pageUtils';
import { DEVICE_CONTROL } from 'utils/constants';
import { BUTTON_TYPES } from 'utils/styles/common';
import LabelWithAsterisk from 'components/LabelWithAsterisk';
import LanguageTabsContent from './Tabs/HTML/LanguageTabsContent';
import SystemAlert from './Tabs/SystemAlert';
import ActionSheet from './Tabs/ActionSheet';
import Pages from './Pages';
import AddProduct from './AddProduct';
import ProductList from './ProductList';

export const contentTabsConfig = [{
  tabValue: MESSAGE_TYPE_ENUM[MESSAGE_TYPE.SYSTEM_ALERT],
  label: 'System alert',
}, {
  tabValue: MESSAGE_TYPE_ENUM[MESSAGE_TYPE.ACTION_SHEET],
  label: 'Action sheet',
},
{
  tabValue: MESSAGE_TYPE_ENUM[MESSAGE_TYPE.HTML],
  label: 'HTML',
},
];
const useStyles = makeStyles(() => ({
  tabPanel: {
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.3)',
    border: '1px solid #D8DFE8',
    marginTop: '-1px',
    borderRadius: '8px',
    borderTopLeftRadius: '0',
  },
  tabsPanelWrapper: {
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  pageWrapper: {
    display: 'flex',
    paddingBottom: '20px',
  },
  addProductWrapper: {
    display: 'flex',
    marginBottom: '10px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));
const tablePrefix = 'messages';

export const MessageTabsContent = ({
  tabValue, label,
  step,
  getName,
  allLanguages,
  setLanguageTab,
  languageTab,
  hovered,
  setHovered,
  platform,
  onSelectLanguage,
  submitted,
  page,
  pages = [],
  setPage,
  errorList,
  errorPageList,
  activeApplication,
}) => {
  const classes = useStyles();
  const formik = useFormikContext() ?? {};
  const [forceEditorUpdate, setForceEditorUpdate] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const selectedProduct = React.useRef(null);
  const npsPage = formik.values.step2.languages[0].fields
    .find((f) => f.type === DEVICE_CONTROL.NPS_SLIDER)?.page;
  const addMenuItems = [{
    text: 'Add new page',
    onClick: () => {
      const newIndex = pages[pages.length - 1].index + 1;

      formik.setFieldValue('step2.pages', [...pages, {
        index: newIndex,
        name: `Page ${findMaxPage(pages)}`,
        uuid: uuidv4(),
      }]);
    },
  }, ...pages
    .filter(({ index }) => index !== npsPage) // not allow copy page with nps
    .map((p) => ({
      text: `Copy from ${p.name}`,
      name: p.name,
      onClick: () => {
        const newIndex = onCopyPage(formik, p);
        setPage(newIndex);
      },
    }))];

  switch (tabValue) {
    case MESSAGE_TYPE_ENUM[MESSAGE_TYPE.HTML]:
      return (
        <div>
          <LabelWithAsterisk
            label="Products"
            withAsterisk={false}
          />
          <div className={classes.addProductWrapper}>
            {open && (
              <AddProduct
                open={open}
                setOpen={setOpen}
                activeApplication={activeApplication}
                setForceEditorUpdate={setForceEditorUpdate}
                selectedProduct={selectedProduct}
              />
            )}
            <ProductList
              selectedProduct={selectedProduct}
              setOpen={setOpen}
              products={formik.values.step2.products}
            />
            <Button
              variant={BUTTON_TYPES.TRANSPARENT}
              classes={{ root: classes.button }}
              onClick={() => {
                selectedProduct.current = null;
                setOpen(true);
              }}
              disableRipple
            >
              + Add product
            </Button>
          </div>
          <HTML step={step} />
          <div className={classes.pageWrapper}>
            <ButtonMenu
              menuItems={addMenuItems}
              active={page}
              buttonTitle="+ Add More Pages"
            />
            <Pages
              items={pages}
              setActive={setPage}
              active={page}
              npsPage={npsPage}
              errorList={errorPageList}
            />
          </div>
          <LanguageTabs
            name={getName(NEW_CAMP_CONTROLS.LANGUAGES)}
            setTab={setLanguageTab}
            page={page}
            tab={languageTab}
            onSelectLanguage={onSelectLanguage}
            tabs={formik.values[step].languages.map((l) => l.name)}
            allOptions={allLanguages.map((l) => l.title)}
            a11yPrefix={tablePrefix}
            errorList={errorList}
          >
            {formik.values[step].languages.map((l, index) => (
              <TabPanel
                key={l.name}
                value={languageTab}
                tabValue={index}
                a11yPrefix={tablePrefix}
                page={page}
                classes={{
                  tabPanel: classes.tabPanel,
                  tabsPanelWrapper: classes.tabsPanelWrapper,
                }}
              >
                <LanguageTabsContent
                  tabValue={index}
                  hovered={hovered}
                  setHovered={setHovered}
                  platform={platform}
                  page={page}
                  submitted={submitted}
                  pages={pages}
                  forceEditorUpdate={forceEditorUpdate}
                />
              </TabPanel>
            ))}
          </LanguageTabs>
        </div>
      );

    case MESSAGE_TYPE_ENUM[MESSAGE_TYPE.SYSTEM_ALERT]:

      return (
        <div>
          <SystemAlert step={step} />
        </div>
      );

    case MESSAGE_TYPE_ENUM[MESSAGE_TYPE.ACTION_SHEET]:

      return (
        <div>
          <ActionSheet
            step={step}
            languages={formik.values[step].languages}
            name={getName(NEW_CAMP_CONTROLS.LANGUAGES)}
            allLanguages={allLanguages}
            setTab={setLanguageTab}
            tab={languageTab}
            hovered={hovered}
            setHovered={setHovered}
            onSelectLanguage={onSelectLanguage}
          />
        </div>
      );

    default:
      return (
        <div>
          {label}
        </div>
      );
  }
};
