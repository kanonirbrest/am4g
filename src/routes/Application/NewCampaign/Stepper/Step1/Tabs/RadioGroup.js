import React from 'react';
import { makeStyles } from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

import { CAMPAIGN_TYPE_DESCRIPTION } from 'utils/campaignUtils';

const useStyles = makeStyles(() => ({
  subLabel: {
    color: '#8D95A9',
    fontSize: '12px',
    textAlign: 'start',
    lineHeight: '18px',
  },
  wrapper: {
    display: 'flex',
  },
  itemWrapper: {
    display: 'flex',
    marginBottom: '15px',
    alignItems: 'center',
  },
  text: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

export default ({
  value, handleChange, items,
  disabled = false,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <FormControl component="div">
        <RadioGroup
          value={value}
          onChange={handleChange}
        >
          {items.map(({ label, value: optionValue, values }) => (
            <div
              className={classes.itemWrapper}
              key={`${label}_${value}`}
            >
              <Radio
                checked={optionValue === value
                      || (values && values.map((i) => i.value).includes(value))}
                color="primary"
                disabled={disabled}
                value={optionValue}
              />
              <div className={classes.textWrapper}>
                <div className={classes.text}>{label}</div>
                <div className={classes.subLabel}>
                  {CAMPAIGN_TYPE_DESCRIPTION[optionValue] || 'Unknown'}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
