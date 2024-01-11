import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import GetViewByType from 'components/TextBlock/View';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '11px',
    lineHeight: '13px',
    textAlign: 'start',
    color: '#6C7688',
  },
  wrapper: {
    padding: '0 25px',
    maxHeight: '65px',
    overflow: 'hidden',
    width: '150px',
  },
}));

export default ({
  title,
  items = [],
  classes: propClasses = {},
}) => {
  const classes = useStyles();
  const shownItems = items.slice(0, 2);

  return (
    <div className={cn(classes.wrapper, propClasses.wrapper)}>
      <div className={classes.title}>
        {title}
      </div>
      {shownItems
        .map(({ key, ...item }) => (
          <GetViewByType
            key={key}
            type={key}
            {...item}
          />
        ))}
    </div>
  );
};
