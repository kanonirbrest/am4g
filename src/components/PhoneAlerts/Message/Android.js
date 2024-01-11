import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';
import style from './style';

const useStyles = makeStyles(() => ({
  ...style,
  label: {
    fontWeight: 'normal',
    fontSize: '13px',
    color: '#8D95A9',
    textAlign: 'start',
  },
}));

export default ({
  icon,
  label,
  classes: propClasses,
  variant,
}) => {
  const classes = useStyles();
  const {
    content: {
      title, body: message, imgValue, image,
    },
  } = variant;
  const url = imgValue || image?.link;

  return (
    <div
      className={cn(propClasses.container, classes.container)}
    >
      <div
        className={classes.header}
      >
        {icon && icon}
        <div
          className={classes.label}
        >
          {label}
        </div>
        <div
          className={cn(propClasses.label, classes.time)}
        >
          now
        </div>
      </div>

      <div className={classes.block}>
        <div className={classes.textWrapper}>
          <div className={classes.title}>
            {title}
          </div>
          <div className={classes.message}>
            {message || 'Enter message'}
          </div>
        </div>
        {url && (
        <img
          alt="uploaded"
          className={classes.image}
          src={url}
        />
        )}
      </div>
    </div>
  );
};
