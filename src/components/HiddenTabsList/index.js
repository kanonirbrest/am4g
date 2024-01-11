import React, { useState, forwardRef } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ErrorLabel from 'components/StyledTabs/ErrorLabel';

import MoreHorizontal from 'assets/icons/MoreHorizontal';
import { MAX_SHOW_TABS } from 'utils/constants/campaignForm';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    background: 'white',
  },
  menu: {
    padding: '5px',
  },
  button: {
    minHeight: '36px',
    height: '36px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    fontSize: '12px',
    textTransform: 'none',
    marginRight: '4px',
    minWidth: '60px',
    background: '#D8DFE8',
  },
  error: {
    background: 'red',
    width: '10px',
    height: '10px',
    border: '2px solid white',
    borderRadius: '50%',
    marginRight: '5px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}));

export default forwardRef((
  {
    options,
    onSelect: onSelectValue,
    errorList = [],
    children,
  }, ref,
) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSelect = (label) => {
    handleClose();
    onSelectValue(label);
  };

  return (
    <div>
      <Button
        ref={ref}
        color="primary"
        classes={{ root: classes.button }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizontal />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        classes={{ paper: classes.menu }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((label, index) => (
          <MenuItem
            key={label}
            onClick={() => onSelect(label)}
            value={label}
            error={errorList.includes(index + MAX_SHOW_TABS)}
          >
            {errorList.includes(index + MAX_SHOW_TABS)
              ? <ErrorLabel text={label} />
              : label}
          </MenuItem>
        ))}
      </Menu>
      {children}
    </div>
  );
});
