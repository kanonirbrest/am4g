import React from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import cn from 'classnames';

const useStyles = makeStyles((theme) => {
  const defaultLink = {
    marginRight: '10px',
    marginLeft: '10px',
    textDecoration: 'none',
  };

  return {
    breadCrumbs: {
      display: 'flex',
      fontWeight: 'bold',
      fontSize: '20px',
    },
    activeTitle: {
      ...defaultLink,
      color: theme.palette.primary.main,
    },
    disabled: {
      ...defaultLink,
      cursor: 'default',
      color: '#3E4554',
    },
  };
});

export default ({ links, classes: propClasses = {} }) => {
  const classes = useStyles();

  return (
    <div className={cn(classes.breadCrumbs, propClasses.container)}>
      {links.map(({ pathname, label }, index) => (
        <React.Fragment key={label}>
          <Link
            className={pathname ? classes.activeTitle : classes.disabled}
            to={{
              pathname,
            }}
            disabled={!pathname}
          >
            {label}
          </Link>
          {index !== links.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
