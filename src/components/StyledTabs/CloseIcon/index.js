import React from 'react';
import { makeStyles } from '@mui/styles';

import { checkKeyEvent } from 'utils';
import CloseFilled from 'assets/icons/CloseFilled';

const useStyles = makeStyles(() => ({
  tabIcon: {
    marginBottom: '0 !important',
  },
  closeWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0!important',
    outline: 'none',
  },
}));

export default React.memo(({
  onRemoveTab,
  index,
  tabItem,
}) => {
  const classes = useStyles();

  return (
  // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      role="button"
      tabIndex={0}
      onKeyPress={checkKeyEvent((e) => onRemoveTab(e, index, tabItem))}
      onClick={(e) => onRemoveTab(e, index, tabItem)}
      className={classes.closeWrapper}
    >
      <CloseFilled
        color="#8D95A9"
        className={classes.tabIcon}
      />
    </div>
  );
});
