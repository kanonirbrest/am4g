import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import defaultPng from 'assets/images/default.png';

const useStyles = makeStyles(() => ({
  image: {
    height: '48px',
    width: '48px',
  },
}));

export default ({ classes: propClasses = {} }) => {
  const classes = useStyles();

  return (
    <img
      alt="defaultLogo"
      className={cn(classes.image, propClasses.img)}
      src={defaultPng}
    />
  );
};
