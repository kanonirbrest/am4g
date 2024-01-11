import React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '11px',
    color: '#6C7688',
    display: 'block',
    marginBottom: '5px',
    textAlign: 'start',
  },
  toggleButton: {
    height: '33px',
    width: '33px',
    background: 'transparent',
    border: 'none',
    '&>svg': {
      fill: '#8D95A9',
    },
  },
  selectedButton: {
    background: '#8D95A9 !important',
    '&>svg': {
      fill: 'white',
    },
  },
}));

export default ({
  value, actionProps, name,
  onChange: onChangeProp,
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const onChange = (e, v) => {
    setFieldValue(name, v);
  };

  return (
    <>
      <div className={classes.label}>Align</div>
      <ToggleButtonGroup
        value={value}
        name={name}
        exclusive
        onChange={onChangeProp || onChange}
        aria-label="text alignment"
        {...actionProps}
      >
        <ToggleButton
          classes={{
            root: classes.toggleButton,
            selected: classes.selectedButton,
          }}
          value="start"
          aria-label="left aligned"
        >
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton
          classes={{
            root: classes.toggleButton,
            selected: classes.selectedButton,
          }}
          value="center"
          aria-label="centered"
        >
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton
          classes={{
            root: classes.toggleButton,
            selected: classes.selectedButton,
          }}
          value="end"
          aria-label="right aligned"
        >
          <FormatAlignRightIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
