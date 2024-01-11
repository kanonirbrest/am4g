import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { a11yProps } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    boxShadow: 'none',
    marginLeft: '30px',
  },
}));
export const HEADER_TABS = {
  CAMPAIGNS: 'Campaigns',
  SETTINGS: 'Application Settings',
};
const headerTabsConfig = [
  {
    label: HEADER_TABS.CAMPAIGNS,
  },
  {
    label: HEADER_TABS.SETTINGS,
  },
];

const headerPrefix = 'header';
export default function HeaderTabs({
  activeTab,
  setActiveTab,
  activeApplication,
}) {
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event, newValue) => {
    if (newValue === HEADER_TABS.SETTINGS) {
      if (history.location.pathname !== `/${activeApplication.id}`) {
        history.push(`/${activeApplication.id}`);
      }
    }
    setActiveTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="transparent"
        classes={{ root: classes.appBar }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="header-tabs"
        >
          {headerTabsConfig.map((tab) => (
            <Tab
              key={tab.label}
              value={tab.label}
              label={tab.label}
              {...a11yProps(headerPrefix, tab.label)}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}
