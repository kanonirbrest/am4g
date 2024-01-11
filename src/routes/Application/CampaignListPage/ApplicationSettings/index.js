import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  bodyMain: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    background: '#F1F5FA',
  },
  bodyContent: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    flexGrow: 1,
    width: 'calc(100% - 280px)',
    height: '100%',
    padding: '24px',
  },
}));

const ApplicationSettings = () => {
  const classes = useStyles();

  return (
    <div className={classes.bodyMain}>
      <div className={classes.bodyContent}>
        Application Settings Page
      </div>
    </div>
  );
};

export default ApplicationSettings;
