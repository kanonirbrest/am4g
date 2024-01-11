import * as React from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';

import InputChanged from 'assets/icons/InputChanged';
import { BootstrapTooltip } from 'components/Tooltip';
import { checkKeyEvent } from 'utils';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginBottom: '10px',
  },
  input: {
    background: 'white',
    fontSize: '12px',
    minHeight: '20px',
    height: '36px',
    width: '100%',
    paddingRight: '10px',
  },
}));

const UncontrolledInput = ({
  label, value, onBlur, isChanged, placeholder, onReset, disabled,
}) => {
  const inputRef = React.useRef();
  const classes = useStyles();

  return (
    <TextField
      ref={inputRef}
      disabled={disabled}
      InputProps={{
        classes: {
          root: classes.input,
        },
        placeholder,
        endAdornment: (isChanged
          ? (
            <BootstrapTooltip
              title="All the changes to the values here
    are for informational purpose only. On the device the user
    will see values from the product as they are in the store"
              placement="right"
              boxWidth="30px"
            >
              <InputAdornment position="end">
                <div
                  role="button"
                  title="remove"
                  tabIndex={0}
                  style={{ cursor: 'pointer', display: 'flex' }}
                  onKeyDown={checkKeyEvent(onReset)}
                  onClick={onReset}
                >
                  <InputChanged height="16px" width="12px" color="#8D95A9" />
                </div>
              </InputAdornment>
            </BootstrapTooltip>
          ) : undefined),
      }}
      classes={{
        root: classes.root,
        input: classes.input,
      }}
      defaultValue={value}
      placeholder={placeholder}
      onChange={(e) => {
        inputRef.current.value = e.target.value;
      }}
      onBlur={(e) => onBlur(e, label)}
    />
  );
};

export default UncontrolledInput;
