import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import Checkbox from '@mui/material/Checkbox';

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
    paddingRight: '30px',
    padding: '7px',
    fontSize: '12px',
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
  checkbox: {
    fontSize: '12px',
    color: '#3E4554',
    padding: '0px',
  },
}));

export default function SearchSelect(
  {
    options, title, onSelect: onSelectValue, values,
  },
) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSelect = (value) => {
    onSelectValue(value);
  };
  const onInputChange = (e) => {
    setFilter(e.target.value);
  };

  React.useEffect(() => {
    if (!filter) {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(options.filter((o) => o.label.toLowerCase()
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
        {title}
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
        {filteredOptions.map((o) => {
          const isActive = values.includes(o.value);

          return (
            <MenuItem
              tabIndex={null}
              key={o.value}
              onClick={() => onSelect(o.value)}
              classes={{ root: classes.checkbox }}
            >
              <Checkbox checked={isActive} size="small" />
              {o.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
