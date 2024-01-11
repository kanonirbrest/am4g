import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomTab from 'routes/Application/NewCampaign/Stepper/Step1/CustomTab';
import { a11yProps } from 'utils';

const useStyles = makeStyles(() => ({
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  tabs: {
    marginLeft: '-5px',
  },
  flexContainer: {
    flexWrap: 'wrap',
  },
}));

export default ({
  handleChange, tabsValue,
  tabsConfig, children,
  sm = false,
  disabled,
  a11yPrefix,
}) => {
  const classes = useStyles();

  return (
    <>
      <AppBar
        position="static"
        classes={{ root: classes.appBar }}
      >
        <Tabs
          classes={{
            root: classes.tabs,
            flexContainer: classes.flexContainer,
          }}
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
          value={tabsValue}
          onChange={handleChange}
          aria-label="tabs"
        >
          {tabsConfig.map(({
            tabValue,
            tabValues,
            icon,
            label,
          }, index) => (
            <Tab
              key={tabValue}
              label={label}
              value={tabsValue}
              innerProps={{
                tabValue,
                icon,
                onTabChange: handleChange,
                value: tabsValue,
                values: tabValues,
                sm,
                disabled,
              }}
              component={CustomTab}
              {...a11yProps(a11yPrefix, index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {children}
    </>
  );
};
