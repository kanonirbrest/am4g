import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';

import IphoneTopWithBorder from 'assets/icons/IphoneTopWithBorder';
import IMAGE_OBJ_FIT from 'utils/constants/image';

const Styles = {
  screen: {
    overflow: 'visible',
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    margin: 0,
  },
  device: {
    position: 'relative',
    width: '375px',
    minWidth: '375px',
    height: '812px',
    background: '#FFFFFF',
    boxShadow: '0px 0px 15px rgba(62, 69, 84, 0.25)',
    borderRadius: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
  },
};
const useStyles = makeStyles(() => ({
  none: {
    display: 'none !important',
  },
  background: {
    height: '100%',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    borderRadius: '50px',
  },
  topPanel: {
    position: 'absolute',
    top: '12px',
    zIndex: 2000,
    pointerEvents: 'none',
  },
  screen: {
    borderRadius: '50px',
    border: '1px solid rgba(62, 69, 84, 0.1)',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
  },
  device: {
    ...Styles.device,
    position: 'sticky',
    top: '140px',
    overflow: 'hidden',
  },
  grid: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    backgroundImage:
    // eslint-disable-next-line max-len
        'repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)',
    backgroundSize: '23.3px 11.65px',
    borderRadius: '50px',
  },
}));
const getFitStyles = (value, isColor) => {
  if (isColor) {
    return null;
  }

  if (value === IMAGE_OBJ_FIT.ORIGINAL) {
    return {
      backgroundSize: 'auto', backgroundRepeat: 'no-repeat',
    };
  }
  if (value === IMAGE_OBJ_FIT.FIT) {
    return { backgroundSize: '100% auto', backgroundRepeat: 'no-repeat' };
  }
  if (value === IMAGE_OBJ_FIT.FILL) {
    return { backgroundSize: 'cover', backgroundRepeat: 'no-repeat' };
  }
  if (value === IMAGE_OBJ_FIT.TILE) {
    return {
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
    };
  }

  return null;
};
export default function Phone({
  children,
  background,
  backgroundColor,
  type,
  backgroundPosition,
  backgroundObjectFit,
  isShowGreed = false,
  classes: propClasses = {},
  refp,
}) {
  const classes = useStyles();
  const isColor = type === 'color';

  return (
    <div
      className={cn(classes.device, propClasses.device)}
      ref={refp}
    >
      <div
        style={{
          /* add extra background image instead of setting
          background to avoid image corruption
          when we have a couple of pages and width more than 100wv
          (influence on background-cover e.t.c.) */
          ...(!isColor && background) && {
            backgroundImage: `url(${background})`,
            backgroundPosition,
          },
          ...(isColor) && { backgroundColor },
          ...(!isColor && getFitStyles(backgroundObjectFit, isColor)),
          position: 'absolute',
          width: '100vw',
          height: '100vh',
        }}
        className={classes.none}
      />
      <body
        id="device-bound"
        style={{
          ...Styles.screen,
          ...(!isColor && background) && {
            backgroundImage: `url(${background})`,
            backgroundPosition,
          },
          ...(isColor) && { backgroundColor },
          ...(!isColor && getFitStyles(backgroundObjectFit, isColor)),
          position: 'relative',
          /* to avoid ios feedback box scrolling */
          touchAction: 'none',
          msTouchAction: 'none',
        }}
        className={classes.screen}
      >
        {isShowGreed && <div className={classes.grid} />}
        {children}
      </body>
      <IphoneTopWithBorder className={classes.topPanel} />
    </div>
  );
}
