import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import cn from 'classnames';
import _debounce from 'lodash.debounce';

import LabelWithAsterisk from 'components/LabelWithAsterisk';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  input: {
    padding: '8px',
    background: 'white',
    fontSize: '12px',
    minHeight: '20px',
    height: '20px',
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    fontSize: '10px',
    color: '#E14B50',
    margin: 0,
  },
}));
const INPUT_PADDING = '6px';
const withDebounce = true;
export default ({
  label,
  classes: propClasses = {},
  withAsterisk = true,
  name = '',
  inputProps = {},
  customError,
  icon,
  placeholder,
  ...props
}) => {
  const classes = useStyles();
  // const textRef = React.useRef();
  const [{
    value,
    onChange,
    onBlur,
    // eslint-disable-next-line no-unused-vars
  }, { error, touched }, {
    setTouched,
  }] = useField(name);
  const textRef = React.useRef();

  /* to handle lagging when type value */
  const debouncedChangeHandler = _debounce((e) => {
    if (textRef.current) {
      if (props.onChange) {
        props.onChange(e);
      } else {
        onChange(e);
      }
    }
  }, 350);
  const debouncedBlurHandler = _debounce((e) => {
    if (textRef.current) {
      setTouched(true);
      if (props.onBlur) {
        props.onBlur(e);
      } else {
        onBlur(e);
      }
    }
  }, 350);

  const handlers = withDebounce ? {
    onChange: debouncedChangeHandler,
    onBlur: debouncedBlurHandler,
    defaultValue: value,
  } : {
    onChange,
    value,
  };

  /* to handle changing value while drag-n-drop fields */
  React.useEffect(() => {
    if (withDebounce && textRef.current?.value && value !== textRef.current?.value) {
      textRef.current.value = value;
    }

    return () => {};
  }, [value]);

  return (
    <div
      className={cn(classes.control, propClasses.control)}
      classes={{ root: cn(classes.control, propClasses.control) }}
    >
      {label && (
        <LabelWithAsterisk
          label={label}
          withAsterisk={withAsterisk}
        />
      )}
      <TextField
        inputRef={textRef}
        classes={{
          root: cn(classes.root, propClasses.root),
        }}
        name={name}
        inputProps={{
          className: cn(classes.input, propClasses.input),
          style: {
            padding: INPUT_PADDING,
          },
          ...inputProps,
        }}
        FormHelperTextProps={
              { classes: { error: classes.error } }
            }
        helperText={(touched && error) || ''}
        error={Boolean((touched && error)
                || customError?.error)}
        placeholder={placeholder}
        {...props}
        {...handlers}
      />
      {icon && icon}
    </div>
  );
};
