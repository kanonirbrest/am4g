import { makeStyles } from '@mui/styles';
import React from 'react';

import { getLabel } from './utils';

const useStyles = makeStyles(() => ({
  point: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  tooltip: {
    border: '1px solid black',
    padding: '5px',
    background: 'rgba(62, 69, 84, 0.8);',
    borderRadius: '8px',
  },
  label: {
    fontSize: '12px',
    marginBottom: '3px',
    color: 'white',
  },
  line: {
    fontSize: '12px',
    display: 'flex',
    padding: '2px 0',
    alignItems: 'center',
    color: 'white',
  },
}));
const getDisplayValue = (value, dataKey, isPerformanceField, isFinanceField) => {
  if (isPerformanceField) {
    if (['sub_screen_cvr', 'sub_screen_ctr', 'sub_screen_i2p']
      .includes(dataKey)) {
      return `${value.toFixed(2)}%`;
    }

    return `${value.toFixed(1)}%`;
  } if (isFinanceField) {
    return `${value.toFixed(1)}$`;
  }

  return value;
};
export default React.memo(({
  active, payload, label, isPerformanceField, nameMapper,
  isFinanceField,
}) => {
  const classes = useStyles();

  if (active && payload && payload.length) {
    return (
      <div className={classes.tooltip}>
        <div className={classes.label}>{label}</div>
        {payload.map(({
          name, value, color, dataKey,
        }) => {
          const displayedValue = getDisplayValue(
            value, dataKey, isPerformanceField, isFinanceField,
          );

          return (
            <div
              key={name}
              className={classes.line}
            >
              <div
                className={classes.point}
                style={{
                  background: color,
                }}
              />
              {getLabel(name, nameMapper)}
              :
              {' '}
              {displayedValue}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
});
