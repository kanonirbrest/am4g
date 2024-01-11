import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => {
  const button = {
    flexBasis: '33.333333%',
    minWidth: 'auto',
    padding: 0,
  };

  return {
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '88px',
      height: '88px',
      background: '#F8FAFD',
      border: '1px solid #D8DFE8',
      marginTop: '10px',
      marginLeft: '10px',
    },
    button: {
      ...button,
    },
    active: {
      ...button,
      background: '#8D95A9',
      pointerEvents: 'none',
    },
  };
});
const buttons = [
  '0 0', '50% 0', '100% 0',
  '0 50%', '50% 50%', '100% 50%',
  '0 100%', '50% 100%', '100% 100%',
];
const ImagePositionButtons = ({ onSelect, actionProps = {}, position }) => {
  const classes = useStyles();
  const positionValue = position ? buttons.findIndex((item) => item === position) : 4;
  const [active, setActive] = useState(positionValue);

  return (
    <div className={classes.wrapper}>
      { buttons.map((val, i) => (
        <Button
          key={val}
          color="primary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          classes={{ root: active !== i ? classes.button : classes.active }}
          onClick={() => {
            setActive(i);
            onSelect(val);
          }}
          {...actionProps}
        >
          {active !== i && '*'}
        </Button>
      ))}
    </div>
  );
};
export default ImagePositionButtons;
