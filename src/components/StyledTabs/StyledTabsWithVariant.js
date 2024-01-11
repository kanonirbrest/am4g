import React from 'react';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {
  a11yProps, copyObject, preventAction,
} from 'utils';
import HiddenTabsList from 'components/HiddenTabsList';
import AddTabComponent from 'components/AddTabComponent';
import { arrayMove } from 'utils/arrayUtils';
import { getLocale } from 'utils/languageUtils';
import CloseIcon from 'components/StyledTabs/CloseIcon';
import { MAX_SHOW_TABS } from 'utils/constants/campaignForm';
import ErrorLabel from 'components/StyledTabs/ErrorLabel';

const addTabIndex = 'add_lang';
const dotsTabIndex = 'dots';
const scrollButtons = false;

const useStyles = makeStyles((theme) => {
  const tabSize = {
    minHeight: '36px',
    height: '36px',
  };
  const tabItem = {
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    fontSize: '12px',
    textTransform: 'none',
    marginRight: '4px',
    ...tabSize,
  };

  return ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginBottom: '20px',
    },
    tabRootSelected: {
      ...tabItem,
      border: '1px solid #D8DFE8',
      color: '#3E4554 !important',
      borderBottom: 'none',
      background: '#fff !important',
      boxShadow: '0px -1px 2px rgb(62 69 84 / 40%)',
      marginTop: '2px',
    },
    tabRoot: {
      ...tabItem,
      color: '#3E4554 !important',
      background: '#D8DFE8',
      flexDirection: 'row-reverse',
    },
    tabsRoot: {
      minHeight: 'auto',
      overflow: 'visible',
    },
    tabIcon: {
      marginBottom: '0 !important',
    },
    tabWrapper: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      flexGrow: 1,
      marginLeft: '40px',
    },
    addLang: {
      marginLeft: 'auto',
    },
    closeWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0!important',
    },
    scroller: {
      overflow: 'visible',
    },
  });
});

export default function StyledTabsWithVariant({
  tabs,
  name,
  extraLabel,
  withClose,
  tab,
  setTab,
  allOptions = [],
  onSelectLanguage,
  allLanguages,
  setLanguageTabList,
  languages,
  setFieldValue,
  errorList = [],
  a11yPrefix,
}) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    if (newValue !== addTabIndex) setTab(newValue);
  };
  const onRemoveTab = (e, index, removeTab) => {
    const condition = () => (languages[Object.keys(languages)[0]].length > 1
      ? window// eslint-disable-line no-alert
        .confirm('Language will be removed from all variants.') : true);
    if (condition()) {
      const tabList = tabs;
      if (index <= tab && tab !== 0) {
        setTab(tab - 1);
      }
      const copiedLanguages = copyObject(languages);
      const locale = getLocale(allLanguages, removeTab);
      delete copiedLanguages[locale];
      setFieldValue(name, copiedLanguages);
      setLanguageTabList(tabList.filter((t, ind) => ind !== index));

      preventAction(e);
    }
    document.activeElement.blur();
  };
  const unselectedLanguages = allOptions
    .filter((label) => !tabs.includes(label));
  const onClickShowTab = (tabValue) => {
    const fromIndex = tabs.findIndex((el) => el === tabValue);
    setLanguageTabList([
      ...arrayMove([...tabs], fromIndex, 3),
    ]);

    setTab(MAX_SHOW_TABS - 1);
  };

  /* use custom tabs */
  return (
    <>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={scrollButtons}
        aria-label="language tabs"
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        classes={{
          root: classes.tabsRoot,
          scroller: classes.scroller,
        }}
      >
        {tabs
          .filter((item, index) => index < MAX_SHOW_TABS)
          .map((tabItem, index) => {
            const isError = errorList.includes(index);

            const icon = withClose && (tabs.length !== 1) ? (
              <CloseIcon
                onRemoveTab={onRemoveTab}
                index={index}
                tabItem={tabItem}
              />
            ) : null;

            return (
              <Tab
                key={tabItem}
                icon={icon}
                label={(isError ? <ErrorLabel text={tabItem} /> : tabItem)}
                value={index}
                classes={{
                  selected: classes.tabRootSelected,
                  root: classes.tabRoot,
                  wrapper: withClose && tab !== index && classes.tabWrapper,
                }}
                {...a11yProps(a11yPrefix, index)}
              />
            );
          })}
        {tabs.length > 4 && (
          <Tab
            key={dotsTabIndex}
            component={HiddenTabsList}
            options={tabs.slice(MAX_SHOW_TABS)}
            onSelect={onClickShowTab}
            errorList={errorList}
          />
        )}
        {extraLabel && unselectedLanguages.length && (
          <Tab
            key={extraLabel}
            label={extraLabel}
            classes={{
              root: classes.addLang,
            }}
            innerProps={{
              options: unselectedLanguages,
              onSelect: onSelectLanguage,
            }}
            component={AddTabComponent}
          />
        )}
      </Tabs>
    </>
  );
}
