import React from 'react';
import { makeStyles } from '@mui/styles';

import FormikTabRadio from 'components/FormControls/FormikTabRadio';
import { getLabel } from './utils';

const useStyles = makeStyles(() => ({
  legendList: {
    padding: '10px 20px',
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    background: '#F1F5FA',
    border: '1px solid #D8DFE8',
    borderRadius: '4px',
  },
  radioWrapper: {
    marginBottom: '15px',
  },
  legendLi: {
    display: 'flex',
    alignItems: 'center',
    color: '#3E4554',
    fontSize: '12px',
    marginRight: '30px',
    '&:last-child': {
      marginRight: '0',
    },
  },
  dot: {
    minWidth: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'blue',
    marginRight: '10px',
  },
  wrapper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default ({
  payload, onLegendClick, lines, variant, setVariant,
  variants, labelMapper,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {variants.length > 1 && (
      <div className={classes.radioWrapper}>
        <FormikTabRadio
          options={variants
            .map((v) => ({
              label: (labelMapper && labelMapper[v]) || v,
              value: v,
            }))}
          value={variant}
          onChange={(v) => {
            setVariant(v);
          }}
          error={null}
        />
      </div>
      )}
      <ul
        className={classes.legendList}
      >
        {
            lines.map((entry) => {
              const isHidden = !payload.find((p) => p.value === entry.name);

              return (
                <li
                  key={entry.name}
                  role="presentation"
                  className={classes.legendLi}
                  onClick={() => onLegendClick(entry)}
                  data-testid="legend-item"
                >
                  <div
                    className={classes.dot}
                    style={{
                      background: isHidden
                        ? 'grey' : entry.color,
                    }}
                  />
                  {getLabel(entry.name, labelMapper)}
                </li>
              );
            })
          }
      </ul>
    </div>
  );
};
