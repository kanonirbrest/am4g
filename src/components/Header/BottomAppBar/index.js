import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';

import ApplicationList from 'components/Header/BottomAppBar/ApplicationList';
import HeaderTabs from 'components/Header/BottomAppBar/HeaderTabs';
import ApplicationListItem
  from 'components/Header/BottomAppBar/ApplicationList/ApplicationListItem';
import Fade from '@mui/material/Fade';

// there is an issue with findDomnNode, should be fixed in V5
// https://stackoverflow.com/questions/61220424/
// material-ui-drawer-finddomnode-is-deprecated-in-strictmode
const useStyles = makeStyles(() => ({
  appBar: {
    boxShadow: '0px 0px 4px rgba(141, 149, 169, 0.3)',
    top: '60px',
  },
  button: {
    height: '68px',
    width: '280px',
    justifyContent: 'flex-start',
  },
  text: {
    padding: '0 20px',
  },
  paper: {
    top: '63px',
    width: '280px',
    height: 'calc(100% - 63px)',
  },
  appBarMain: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: '68px',
    color: ' #3E4554',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    margin: '0 20px',
  },
  menuPaper: {
    maxHeight: 'calc(100vh - 128px) !important',
    top: '124px !important',
    left: '0 !important',
    boxShadow: 'none !important',
    width: '280px',
  },
}));

export default ({
  activeApplication,
  setActiveApplication,
  applicationList,
  ...props
}) => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setIsOpened(false);
  };

  const toggleDrawer = (value) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpened(value);
  };

  return (
    <AppBar
      position="sticky"
      classes={{ root: classes.appBar }}
    >
      <div className={classes.appBarMain}>
        <div>
          <div
            className={classes.button}
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {!!activeApplication && (
            <ApplicationListItem
              item={activeApplication}
              open={open}
              onSelectApplication={(e) => {
                toggleDrawer(true);
                setIsOpened(true);
                setAnchorEl(e.currentTarget);
              }}
              isActive={false}
              isDropDown
              isRotated={isOpened}
            />
            )}
          </div>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={open}
            classes={{
              paper: classes.menuPaper,
            }}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            TransitionComponent={Fade}
          >
            <ApplicationList
              isOpened={isOpened}
              toggleDrawer={toggleDrawer}
              setActiveApplication={setActiveApplication}
              activeApplication={activeApplication}
              classes={classes}
              applicationList={applicationList}
              handleClose={handleClose}
            />
          </Menu>
        </div>
        <HeaderTabs
          {...props}
          activeApplication={activeApplication}
        />
      </div>
    </AppBar>
  );
};
