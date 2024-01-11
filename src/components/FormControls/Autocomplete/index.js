import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import { useField, useFormikContext } from 'formik';

import Plus from 'assets/icons/Plus';
import styles from './style';

const useStyles = makeStyles(() => ({
  ...styles,
  autocomplete: {
    minWidth: '500px',
    padding: '3px',
  },
  autoInput: {
    padding: '4px !important',
    paddingRight: '65px !important',
    background: 'white',
  },
}));
export const CHIP_MODE = {
  EXCLUDE_CHIP: 'excludeChip',
  INCLUDE_CHIP: 'includeChip',
};
export default ({
  classes: propClasses = {},
  options,
  placeholder = '',
  defaultValue = [],
  name = '',
  isExclude = false,
  required = false,
  disabled = false,
  multiple = true,
}) => {
  const [{
    value = [],
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }, {
    setValue, setTouched,
  }] = useField(name);
  const { validateForm } = useFormikContext();

  const classes = useStyles();
  const errorValue = touched && error;
  const onBlur = () => {
    if (setTouched) {
      setTouched(name)
        .then(() => {
          validateForm();
        });
    }
  };

  const renderTags = (selectedItems, getTagProps) => selectedItems
    .map((item, index) => {
      const chipLabel = options.find((o) => o.value === item)?.label;

      return (
        <Chip
          variant={isExclude ? CHIP_MODE.EXCLUDE_CHIP : CHIP_MODE.INCLUDE_CHIP}
          label={chipLabel}
          deleteIcon={<CloseIcon className={classes.icon} />}
          {...getTagProps({ index })}
          onDelete={() => {
            // eslint-disable-next-line no-shadow
            setValue(selectedItems?.filter((_, i) => i !== index))
              .then(() => {
                validateForm();
              });
          }}
        />
      );
    });
  const renderInput = (params) => (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      error={!!errorValue}
      {...params}
    />
  );
  const onChange = (e, valueProp) => {
    const selected = valueProp.map((v) => {
      // for no region check v?.value = ''
      if (v?.value || v?.value === '') {
        return v?.value;
      }

      return v;
    });
    setValue(selected);
  };

  return (
    <FormControl
      className={cn(classes.control, propClasses.control)}
    >
      <div>
        <Autocomplete
          multiple={multiple}
          options={options}
          renderOption={(props, option) => (
            <div {...props} key={props.id}>
              {(option?.renderLabel && option?.renderLabel())
                  || `${option.label}`}
            </div>
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          classes={{
            root: cn(classes.autocomplete, propClasses.autocomplete),
            inputRoot: classes.autoInput,
            input: classes.input,
            option: classes.option,
          }}
          value={value}
          fullWidth
          isOptionEqualToValue={(option) => value.includes(option?.value)}
          onChange={onChange}
          popupIcon={<Plus />}
          renderTags={renderTags}
          renderInput={renderInput}
          required={required}
          onBlur={onBlur}
          name={name}
        />
        {errorValue && (
        <div className={classes.error}>
          {errorValue}
        </div>
        )}
      </div>
    </FormControl>
  );
};
