import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import cn from 'classnames';

import Search from 'assets/icons/Search';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles(() => ({
  inputWrapper: {
    display: 'flex',
    position: 'relative',
  },
  root: {
    display: 'flex',
    background: 'white',
  },
  input: {
    padding: '8px',
    paddingRight: '30px',
  },
  icon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
  },
  menu: {
    padding: '5px',
  },
  container: {
    marginLeft: 'auto',
  },
}));

export default function SearchSelect(
  {
    innerRef,
    options, onSelect: onSelectValue, childrenProp,
  },
) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSelect = (value) => {
    onSelectValue(value);
    handleClose();
  };
  const onInputChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (!filter) {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(options.filter((label) => label.toLowerCase()
        .includes(filter.toLowerCase())));
    }
  }, [filter, options]);

  return (
    <div className={classes.container}>
      <Button
        variant={BUTTON_TYPES.TRANSPARENT}
        disableRipple
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {childrenProp}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        classes={{ paper: classes.menu }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.inputWrapper}>
          <TextField
            ref={innerRef}
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
          />
          <Search className={classes.icon} />
        </div>
        {filteredOptions.map((l) => (
          <MenuItem
            tabIndex={null}
            key={l}
            onClick={() => onSelect(l)}
          >
            {l}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
