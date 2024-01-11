import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/icons/Logo.svg';
import Question from 'assets/icons/Question';
import Down from 'assets/icons/Down';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

const useStyles = makeStyles(() => ({
  appBar: {
    boxShadow: 'none',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    margin: '0 10px',
    fontFamily: 'Helvetica Neue',
    fontSize: '16px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: '20px',
    color: 'white',
    borderRadius: '50%',
    background: '#DC3D88',
  },
  navigateIcon: {
    fill: '#4675C0',
    width: '16px',
  },
  helpContainer: {
    display: 'flex',
    color: 'inherit',
    alignItems: 'center',
    marginRight: '20px',
    cursor: 'pointer',
    '&Text': {
      marginLeft: '10px',
    },
  },
  appBarMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5FA',
  },
  appBarSubMenu: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: '10px',
  },
  appBarMenu: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#3E4554',
  },
  helpContainerText: {
    marginLeft: '10px',
    fontSize: '12px',
    color: '#4675C0',
  },
}));

export default ({ activeApplication, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    handleClose();
    localStorage.removeItem('token');
    window.open(process.env.REACT_APP_URL);
  };
  if (!user) return null;

  return (
    <AppBar
      position="sticky"
      classes={{
        root: classes.appBar,
      }}
    >
      <div className={classes.appBarMain}>
        <Link to={{
          pathname: `/${activeApplication && activeApplication?.id}`,
        }}
        >
          <Logo />
        </Link>

        <div className={classes.appBarMenu}>
          <a
            href={process.env.REACT_APP_API_END_POINT.split('/graphql')[0]}
            target="_blank"
            rel="noreferrer"
            className={classes.helpContainer}
          >
            <KeyboardTabIcon fill="#4675C0" className={classes.navigateIcon} />
            <span className={classes.helpContainerText}>Old admin</span>
          </a>
          <a
            href="https://www.notion.so/AM4G-No-Code-6b3fcb4061d9402cad36bf827f0167d4?pvs=4"
            rel="noreferrer"
            target="blank"
            className={classes.helpContainer}
          >
            <Question color="#4675C0" />
            <span className={classes.helpContainerText}>Help</span>
          </a>

          {user.profile_image ? (
            <img
              className={classes.avatar}
              src={user.profile_image}
              alt=""
            />
          )
            : <div className={classes.avatar}>AA</div>}
          <div className={classes.appBarSubMenu}>
            <div>{user.name}</div>
            <IconButton
              aria-label="menu-appbar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Down />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </AppBar>
  );
};
