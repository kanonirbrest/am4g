import React from 'react';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import { a11yProps } from 'utils';
import HiddenTabsList from 'components/HiddenTabsList';
import AddTabComponent from 'components/AddTabComponent';
import { arrayMove } from 'utils/arrayUtils';
import { MAX_SHOW_TABS } from 'utils/constants/campaignForm';
import CloseIcon from 'components/StyledTabs/CloseIcon';
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

export default ({
  tabs,
  name,
  extraLabel,
  withClose,
  tab,
  setTab,
  allOptions = [],
  onSelectLanguage,
  showTabs = MAX_SHOW_TABS,
  a11yPrefix = 'styled-table',
  errorList = [],
}) => {
  const classes = useStyles();
  const formik = useFormikContext();

  const handleChange = (event, newValue) => {
    if (newValue !== addTabIndex) setTab(newValue);
  };
  const onRemoveTab = (e, index, removeTab) => {
    const tabList = _get(formik.values, name);

    if (index <= tab && tab !== 0) {
      setTab(tab - 1);
      /* to handle previous tab delete and set correct active tab */
    }
    formik.setFieldValue(name, tabList.filter((lang) => removeTab !== lang.name));
    e.preventDefault();
    e.stopPropagation();
  };
  const languages = formik ? _get(formik.values, name, [])
    .map((l) => l.name) : [];
  const unselectedLanguages = allOptions
    .filter((label) => !languages.includes(label));
  const onClickShowTab = (tabValue) => {
    const langs = _get(formik.values, 'step2.languages');
    const fromIndex = langs.findIndex((el) => el.name === tabValue);

    formik.setFieldValue('step2.languages', [
      ...arrayMove(langs, fromIndex, 3),
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
        aria-label="languages"
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
          .filter((item, index) => index < showTabs)
          .map((tabItem, index) => {
            const icon = withClose && (tabs.length !== 1) ? (
              <CloseIcon
                onRemoveTab={onRemoveTab}
                index={index}
                tabItem={tabItem}
              />
            ) : null;
            const isError = errorList.includes(index);

            return (
              <Tab
                key={tabItem}
                icon={icon}
                label={(isError ? <ErrorLabel text={tabItem} /> : tabItem)}
                classes={{
                  selected: classes.tabRootSelected,
                  root: classes.tabRoot,
                  wrapper: withClose && tab !== index && classes.tabWrapper,
                }}
                {...a11yProps(a11yPrefix, index)}
              />
            );
          })}
        {languages.length > showTabs && (
          <Tab
            key={dotsTabIndex}
            component={HiddenTabsList}
            options={languages.slice(showTabs)}
            onSelect={onClickShowTab}
            {...a11yProps(a11yPrefix, dotsTabIndex)}
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
              formik,
              onSelect: onSelectLanguage,
            }}
            component={AddTabComponent}
            {...a11yProps(a11yPrefix, addTabIndex)}
          />
        )}
      </Tabs>
    </>
  );
};
