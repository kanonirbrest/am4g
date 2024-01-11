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
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import AndLineH from 'assets/icons/AndLineH';
import { CHIP_MODE } from '../Autocomplete';

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
  menu: {
    padding: '5px',
  },
  container: {
  },
  checkbox: {
    fontSize: '12px',
    color: '#3E4554',
    padding: '0px',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  expandIcon: {
    height: '20px',
    marginRight: '0',
  },
  chip: {
    fontSize: '10px',
  },
  icon: {
    width: '14px',
    color: 'white !important',
  },
  titleButton: {
    minWidth: '50px',
    padding: 0,
  },
}));

export default function ChipSelect(
  {
    options, title, onSelect: onSelectValue, values = [],
  },
) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = React.useState('');
  const [innerValue, setInnerValues] = React.useState(values);
  const [filteredOptions, setFilteredOptions] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    onSelectValue(innerValue);
  };
  const onSelect = (v) => {
    let newOps;
    if (innerValue.includes(v)) {
      newOps = innerValue.filter((o) => o !== v);
    } else {
      newOps = [...innerValue, v];
    }
    setInnerValues(newOps);

    return newOps;
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
  React.useEffect(() => {
    if (values.length !== innerValue.length) {
      setInnerValues(values);
    }
  }, [values.length]);
  const optionsMap = React.useMemo(() => {
    const map = {};
    options.forEach((o) => {
      map[o.value] = o.label;
    });

    return map;
  }, [options.length]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {values.map((option, index) => (
          <React.Fragment key={option}>
            {index !== 0 && <AndLineH className={classes.andIcon} />}
            <Chip
              variant={CHIP_MODE.INCLUDE_CHIP}
              label={optionsMap[option]}
              classes={{
                root: classes.chip,
              }}
              onDelete={() => {
                onSelectValue(onSelect(option));
              }}
              deleteIcon={<CloseIcon className={classes.icon} />}
            />
          </React.Fragment>
        ))}
        <Button
          variant={BUTTON_TYPES.TRANSPARENT}
          disableRipple
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.titleButton}
        >
          {title}
        </Button>
      </div>

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
          const isActive = innerValue.includes(o.value);

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
