import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import cn from 'classnames';

const useStyles = makeStyles(() => ({
  tabBox: {
    padding: '24px',
  },
}));

export default ({
  children, value, tabValue, classes: propClasses = {},
  tabValues = [],
  a11yPrefix = 'simple',
}) => {
  const classes = useStyles();
  const isActive = value === tabValue || tabValues.includes(value);

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      id={`${a11yPrefix}-tabpanel-${tabValue}`}
      aria-labelledby={`${a11yPrefix}-tab-${tabValue}`}
      className={propClasses.tabPanel}
    >
      {isActive && (
        <Box
          p={3}
          className={cn(classes.tabBox, propClasses.tabsPanelWrapper)}
        >
          {children}
        </Box>
      )}
    </div>
  );
};
