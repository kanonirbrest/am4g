import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const useStyles = makeStyles(() => ({
  mainButton: {
    textTransform: 'none',
    minWidth: '115px',
  },
  paper: {
    border: '1px solid #d3d4d5',
    fontSize: '22px',
  },
  menuItem: {
    fontSize: '12px',
    color: '#3E4554',
  },
}));

export default ({ menuItems, disabled, buttonTitle }) => {
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
        onClick={handleClick}
        className={classes.mainButton}
        disabled={disabled}
      >
        {buttonTitle}
      </Button>
      <Menu
        classes={{
          paper: classes.paper,
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
          >
            <ListItemText
              classes={{ primary: classes.menuItem }}
              primary={item.text}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
