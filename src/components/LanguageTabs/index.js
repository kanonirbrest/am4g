import React from 'react';
import { makeStyles } from '@mui/styles';

import StyledTabs from 'components/StyledTabs';

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
      <StyledTabs
        extraLabel="+ Languages"
        withClose
        {...props}
      />
      {children}
    </div>
  );
};
