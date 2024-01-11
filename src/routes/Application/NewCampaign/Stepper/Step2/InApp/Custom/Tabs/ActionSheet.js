import React from 'react';
import { makeStyles } from '@mui/styles';

import TabPanel from 'components/TabPanel';
import LanguageTabs from 'components/LanguageTabs';
import { useFormikContext } from 'formik';
import LanguageTabsContent
  from './ActionSheet/LanguageTabsContent';

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
}));
const tablePrefix = 'languages';
export default ({
  step,
  name,
  allLanguages,
  setTab,
  tab,
  hovered,
  setHovered,
  onSelectLanguage,
}) => {
  const classes = useStyles();
  const { values } = useFormikContext();

  return (
    <LanguageTabs
      name={name}
      setTab={setTab}
      tab={tab}
      onSelectLanguage={onSelectLanguage}
      tabs={values[step].languages.map((l) => l.name)}
      allOptions={allLanguages.map((l) => l.title)}
      a11yPrefix={tablePrefix}
    >
      {values[step].languages.map((l, index) => (
        <TabPanel
          key={l.name}
          value={tab}
          tabValue={index}
          a11yPrefix={tablePrefix}
          classes={{
            tabPanel: classes.tabPanel,
            tabsPanelWrapper: classes.tabsPanelWrapper,
          }}
        >
          <LanguageTabsContent
            tabValue={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        </TabPanel>
      ))}
    </LanguageTabs>
  );
};
