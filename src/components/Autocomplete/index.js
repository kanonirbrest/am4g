import React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import cn from 'classnames';

import Plus from 'assets/icons/Plus';
import styles from '../FormControls/Autocomplete/style';
import { CHIP_MODE } from '../FormControls/Autocomplete';

const useStyles = makeStyles(() => ({
  ...styles,
  container: {
    minWidth: '400px',
  },
  autocomplete: {
    padding: '3px',
  },
  autoInput: {
    padding: '4px !important',
    paddingRight: '30px !important',
    background: 'white',
  },
}));

export default ({
  options, onChange, value, containerClass,
}) => {
  const classes = useStyles();

  const map = React.useMemo(() => {
    const m = {};
    options.forEach((opt) => {
      m[opt.value] = opt.label;
    });

    return m;
  }, [options]);
  const renderTags = (v, getTagProps) => v
    .map((option, index) => (
      <Chip
        key={option.value}
        variant={CHIP_MODE.INCLUDE_CHIP}
        label={map[option?.value || option]}
        classes={{
          root: classes.chip,
        }}
        deleteIcon={<CloseIcon className={classes.icon} />}
        {...getTagProps({ index })}
      />
    ));

  return (
    <div className={cn(classes.container, containerClass)}>
      <Autocomplete
        multiple
        options={options}
        onChange={onChange}
        defaultValue={[]}
        value={value}
        getOptionLabel={(o) => o.label}
        classes={{
          root: classes.autocomplete,
          inputRoot: classes.autoInput,
          input: classes.input,
          option: classes.option,
        }}
        renderOption={(props, option) => (
          <div {...props} key={props.value}>
            {option.label}
          </div>
        )}
        popupIcon={<Plus />}
        renderTags={renderTags}
        isOptionEqualToValue={(option) => value.includes(option?.value)}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            placeholder="Select offers"
            {...params}
          />
        )}
      />
    </div>
  );
};
