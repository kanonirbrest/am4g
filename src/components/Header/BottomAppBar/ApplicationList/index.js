import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import List from '@mui/material/List';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

import ApplicationListItem
  from 'components/Header/BottomAppBar/ApplicationList/ApplicationListItem';
import TextField from '@mui/material/TextField';
import Search from 'assets/icons/Search';
import { removeSSItem } from 'services/sessionStorage';
import { CAMPAIGN_LIST_SS_PARAMS, getItemKey } from 'routes/Application/CampaignListPage';

const useStyles = makeStyles(() => ({
  list: {
  },
  fullList: {
    width: 'auto',
    height: '100%',
  },
  // input styles
  inputWrapper: {
    display: 'flex',
    position: 'relative',
    padding: '10px',
    borderTop: 'thin solid #D8DFE8',
  },
  root: {
    display: 'flex',
    background: 'white',
  },
  input: {
    padding: '8px',
    paddingRight: '30px',
    width: '220px',
    fontSize: '14px',
  },
  icon: {
    position: 'absolute',
    top: '17px',
    right: '15px',
  },
  rootList: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    maxHeight: 'calc(100vh - 220px) !important',
    overflow: 'scroll',
  },
}));

export default ({
  toggleDrawer,
  isOpened,
  setActiveApplication,
  activeApplication,
  applicationList,
  handleClose,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [filter, setFilter] = useState('');

  const onInputChange = (v) => {
    setFilter(v.target.value);
  };
  const onSelectApplication = useCallback(
    (e, item) => {
      toggleDrawer(false)(e);
      history.push(`/${item.id}`);
      setActiveApplication(item);
      /* clear session storage items when change application */
      CAMPAIGN_LIST_SS_PARAMS.forEach((ssItem) => {
        removeSSItem(getItemKey(ssItem, activeApplication.id));
      });
      handleClose(e);
    }, [],
  );

  return (
    <div
      className={cn(classes.list, {
        [classes.fullList]: isOpened,
      })}
      role="presentation"
    >
      <div className={classes.inputWrapper}>
        <TextField
          onChange={onInputChange}
          variant="outlined"
          classes={{
            root: cn(classes.root),
          }}
          inputProps={{
            className: classes.input,
          }}
          value={filter}
          autoFocus
          placeholder="Search..."
        />
        <Search className={classes.icon} />
      </div>
      <List classes={{ root: classes.rootList }}>
        {applicationList.filter((app) => app.name.toLowerCase()
          .includes(filter.toLowerCase())).map((item) => (
            <ApplicationListItem
              key={item.id}
              item={item}
              isActive={activeApplication.id === item.id}
              onSelectApplication={onSelectApplication}
            />
        ))}
      </List>
    </div>
  );
};
