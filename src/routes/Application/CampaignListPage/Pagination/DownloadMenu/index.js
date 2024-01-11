import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { ReactComponent as Download } from 'assets/icons/Download.svg';
import { ReactComponent as XLS } from 'assets/icons/XLS.svg';
import { ReactComponent as XML } from 'assets/icons/XML.svg';
import { ReactComponent as JSON } from 'assets/icons/JSON.svg';
import CSV from 'assets/icons/CSV';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    marginLeft: '10px',
  },
  paper: {
    border: '1px solid #d3d4d5',
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}));

const menuItems = [{
  primary: 'JSON',
  icon: () => <JSON />,
}, {
  primary: 'CSV',
  icon: () => <CSV />,
}, {
  primary: 'XML',
  icon: () => <XML />,
}, {
  primary: 'XLS',
  icon: () => <XLS />,
}];

export default function DownloadMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant={BUTTON_TYPES.BLUE}
        onClick={handleClick}
        startIcon={
          <Download />
        }
      >
        Download
      </Button>
      <Menu
        elevation={0}
        getcontentanchorel={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.paper,
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.primary}
            classes={{ root: classes.menuItem }}
          >
            {item.icon()}
            <ListItemText
              classes={{ root: classes.iconWrapper }}
              primary={item.primary}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
