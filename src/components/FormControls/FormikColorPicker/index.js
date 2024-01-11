import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import { SketchPicker } from 'react-color';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { checkKeyEvent } from 'utils';
import { useField } from 'formik';

const useStyles = makeStyles(() => {
  const block = {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
  };

  return {
    wrapper: {
      marginRight: '10px',
    },
    picker: {
      border: ' 1px solid #D8DFE8',
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '32px',
      padding: '0 10px',
      width: '130px',
      borderRadius: '4px',
      background: 'white',
      color: '#3E4554',
    },
    label: {
      fontSize: '11px',
      color: '#6C7688',
      display: 'block',
      marginBottom: '5px',
      textAlign: 'start',
    },
    colorBlock: {
      ...block,
      border: '1px solid #D8DFE8',
    },
    grid: {
      color: '#8D95A9',
    },
    colorBlockWithoutBorder: {
      ...block,
    },
    value: {
      fontSize: '10px',
    },
    tooltip: {
      padding: 0,
      backgroundColor: 'none',
      marginBottom: '2px !important',
    },
  };
});

export default ({
  label,
  onFocus = () => {},
  onBlur = () => {},
  name,
  classes: propClasses = {},
}) => {
  const classes = useStyles();
  const [{
    value,
    // eslint-disable-next-line no-unused-vars
  }, _, {
    setValue,
  }] = useField(name);
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = (e) => {
    if (open) {
      setOpen(false);
      if (onBlur) {
        onBlur(e);
      }
    }
  };
  const handleTooltipOpen = (e) => {
    setOpen(true);
    if (onFocus) {
      onFocus(e);
    }
  };
  const onColorChange = (c) => {
    const rgba = `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`;
    setValue(rgba);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          classes={{
            tooltip: classes.tooltip,
          }}
          title={(
            <SketchPicker
              color={value}
              onChange={onColorChange}
            />
          )}
          placement="top-start"
        >
          <div
            className={cn(classes.wrapper, propClasses.wrapper)}
            role="button"
            tabIndex={0}
            onKeyPress={checkKeyEvent((e) => { handleTooltipOpen(e); })}
            onClick={handleTooltipOpen}
          >
            {label && <div className={classes.label}>{label}</div>}
            <div className={classes.picker}>
              <div
                style={{
                  backgroundColor: value,
                }}
                className={classes.colorBlock}
              />
              <div className={classes.value}>
                {value}
              </div>
            </div>
          </div>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};
