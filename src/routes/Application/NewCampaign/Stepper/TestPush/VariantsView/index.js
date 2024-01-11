import React from 'react';

import LanguageButton
  from 'routes/Application/NewCampaign/Stepper/TestPush/LanguageButton';
import StyledTabs from 'components/StyledTabs';
import TabPanel from 'components/TabPanel';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  label: {
    color: '#6C7688',
    fontSize: '11px',
  },
  tabPanel: {
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.3)',
    border: '1px solid #D8DFE8',
    marginTop: '-1px',
    borderRadius: '8px',
    borderTopLeftRadius: '0',
    marginBottom: '20px',
  },
  tabsPanelLanguagesWrapper: {
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
}));
const tablePrefix = 'test-push-variants';
export default ({
  setLanguageTab, allLanguages = [],
  languageTab, languages,
  variant, setVariant,
  variants,
}) => {
  const classes = useStyles();

  return (
    <>
      <StyledTabs
        withClose={false}
        tab={variant}
        tabs={variants}
        setTab={setVariant}
        showTabs={5}
        a11yPrefix={tablePrefix}
      />
      <TabPanel
        key={variant}
        value={variant}
        tabValue={variant}
        classes={{
          tabPanel: classes.tabPanel,
          tabsPanelWrapper: classes.tabsPanelLanguagesWrapper,
        }}
      >
        <div className={classes.label}>Preview language</div>
        <div>
          {Object.keys(languages).map((language) => (
            <LanguageButton
              key={language}
              audiences={allLanguages}
              setLanguageTab={setLanguageTab}
              languageTab={languageTab}
              language={language}
            />
          ))}
        </div>
      </TabPanel>
    </>
  );
};
