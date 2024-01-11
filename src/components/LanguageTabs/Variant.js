import React from 'react';
import { makeStyles } from '@mui/styles';

import StyledTabsWithVariant from 'components/StyledTabs/StyledTabsWithVariant';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: '20px',
  },
}));

export default ({
  children,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledTabsWithVariant
        extraLabel="+ Languages"
        withClose
        {...props}
      />
      {children}
    </div>
  );
};
