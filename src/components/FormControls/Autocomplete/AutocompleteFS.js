import React from 'react';
import Chip from '@mui/material/Chip';
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import { useField, useFormikContext } from 'formik';

import { CHIP_MODE } from 'components/FormControls/Autocomplete/index';
import styles from './style';

const useStyles = makeStyles(() => ({
  ...styles,
  control: {
    display: 'flex',
  },
  autocomplete: {
    minWidth: '330px',
  },
  autoInput: {
    padding: '4px !important',
    paddingRight: '45px !important',
    background: 'white',
  },
  input: {
    ...styles.input,
    height: '20px',
    minWidth: '115px !important',
  },
}));

export default ({
  classes: propClasses = {},
  options,
  placeholder = '',
  defaultValue = [],
  name = '',
  required = false,
  isExclude = false,
}) => {
  const classes = useStyles();
  const [{
    value,
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }, {
    setTouched, setValue,
  }] = useField(name);
  const { validateForm } = useFormikContext();

  const onInputChange = (e, str, reason) => {
    if (str.endsWith(' ') && str.trim().length && reason === 'input') {
      setValue(
        [...new Set([...value, str.trim()])],
      );
    }
  };
  const errorValue = touched && error;
  const onBlur = (e) => {
    if (e.target.value.length) {
      setValue(
        [...new Set([...value,
          e.target.value.trim()]),
        ],
      );
    }
    if (setTouched) {
      setTouched(name)
        .then(() => {
          validateForm();
        });
    }
  };
  const onChange = (e, v) => {
    setValue(v);
  };
  const renderTags = (v, getTagProps) => v
    .map((option, index) => (
      <Chip
        variant={
          isExclude
            ? CHIP_MODE.EXCLUDE_CHIP : CHIP_MODE.INCLUDE_CHIP
        }
        label={option.label || option}
        classes={{
          root: propClasses.chip,
        }}
        deleteIcon={<CloseIcon className={classes.icon} />}
        {...getTagProps({ index })}
        onDelete={() => {
          // eslint-disable-next-line no-shadow
          setValue(value.filter((_, i) => i !== index))
            .then(() => {
              /* todo check set touched */
              validateForm();
            });
        }}
      />
    ));

  return (
    <FormControl
      className={cn(classes.control, propClasses.control)}
    >
      <div>
        <Autocomplete
          multiple
          classes={{
            root: classes.autocomplete,
            inputRoot: classes.autoInput,
            input: classes.input,
            option: classes.option,
          }}
          options={options.map((option) => option.label)}
          defaultValue={defaultValue}
          clearOnBlur
          onInputChange={onInputChange}
          onChange={onChange}
          value={value}
          freeSolo
          onBlur={onBlur}
          renderTags={renderTags}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder={placeholder}
              {...params}
              error={errorValue}
            />
          )}
          required={required}
        />
      </div>
      {errorValue && (
      <div className={classes.error}>
        {errorValue}
      </div>
      )}
    </FormControl>
  );
};
