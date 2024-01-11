import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';

import style from './style';

const useStyles = makeStyles(() => ({
  ...style,
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  container: {
    ...style.container,
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
  },
  block: {
    ...style.block,
    marginTop: '10px',
  },
}));

export default ({
  icon,
  classes: propClasses,
  variant,
}) => {
  const classes = useStyles();
  const {
    content: {
      title, body: message, imgValue,
      subtitle, image,
    },
  } = variant;
  const url = imgValue || image?.link;

  return (
    <div
      className={cn(propClasses.container, classes.container)}
    >
      {icon && icon}
      <div className={classes.body}>
        <div
          className={classes.label}
        >
          {title}
        </div>
        <div className={classes.label}>
          {subtitle}
        </div>
        <div className={classes.message}>
          {message || 'Enter message'}
        </div>
      </div>
      <div className={classes.right}>
        <div>now</div>
        <div className={classes.block}>
          {url && (
          <img
            alt="uploaded"
            className={classes.image}
            src={url}
          />
          )}
        </div>
      </div>
    </div>
  );
};
