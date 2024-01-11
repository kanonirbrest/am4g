import React from 'react';
import { makeStyles } from '@mui/styles';

import {
  LABEL_MAP, getIcon, getColor, getExt,
} from 'components/Campaigns/CampaignCard/utils';

const useStyles = makeStyles(() => ({
  trendItem: {
    textDecoration: 'none',
    listStyleType: 'none',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'start',
    fontSize: '12px',
    color: '#3E4554',
    marginBottom: '10px',
    width: 'calc(25% - 10px)',
    minWidth: '145px',
    overflow: 'hidden',
  },
  prevWeek: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    color: 'rgba(123,120,120,0.83)',
    textAlign: 'left',
  },
  currentWeek: {
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '5px',
    textAlign: 'start',
  },
  value: {
    marginRight: '3px',
  },
  trend: {
    display: 'flex',
    alignItems: 'center',
    animation: 'blink 4s linear infinite',
  },
}));

const getFormattedDate = (date, ext) => {
  if (ext === '$') {
    return getExt(ext) + date;
  }

  return date + getExt(ext);
};

export default ({
  previous,
  tendency,
  current,
  ext,
  type,
}) => {
  const classes = useStyles();
  const trendValue = tendency;

  return (
    <li className={classes.trendItem}>
      <div className={classes.label}>
        {LABEL_MAP[type] || type}
      </div>
      <div className={classes.value}>
        <div className={classes.currentWeek}>
          {getFormattedDate(current, getExt(ext))}
        </div>
        {previous && (
        <div className={classes.prevWeek}>
          {getFormattedDate(previous, getExt(ext))}
        </div>
        )}
      </div>
      {(trendValue || trendValue === 0) && (
      <div className={classes.trend} style={{ color: getColor(trendValue) }}>
        <span>(</span>
        {getIcon(trendValue)}
        {trendValue}
        %)
      </div>
      )}
    </li>
  );
};
