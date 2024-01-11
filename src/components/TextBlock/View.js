import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  label: {
    display: 'inline-block',
    marginRight: '5px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#3E4554',
  },
  value: {
    display: 'flex',
    flexWrap: 'nowrap',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '17px',
    color: '#3E4554',
    marginTop: '5px',
    maxWidth: '200px', /* move to mixins */
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  arrayWrapper: {
    width: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'start',
  },
}));

export default ({
  type, ...item
}) => {
  const classes = useStyles();
  const {
    val, op,
    value = '',
  } = item;

  if (op) {
    const textValue = `${type} ${op}${val}`;

    return (
      <div
        className={classes.value}
      >
        <div className={classes.label} title={textValue}>
          {textValue}
        </div>
      </div>
    );
  }

  if (value && ['string', 'number', 'boolean']
    .includes(typeof value)) {
    return (
      <div
        className={classes.value}
      >
        <div className={classes.label}>
          {type}
          :
        </div>
        <div title={value.toString()}>
          {value}
        </div>
      </div>
    );
  }

  if (value && Array.isArray(value) && value[0] && typeof value[0] === 'object') {
    if (value[0] && typeof value[0] === 'object') {
      const displayedValue = value.map((v) => (`${v.op} ${v.val}`)).join(', ');

      return (
        <div
          className={classes.arrayWrapper}
          title={displayedValue}
        >
          <div className={classes.label}>
            {type}
            :
          </div>
          {displayedValue}
        </div>
      );
    }
    const displayedValue = value.join(', ');

    return (
      <div
        className={classes.value}
      >
        <div className={classes.label}>
          {type}
          :
        </div>
        <div title={displayedValue}>
          {displayedValue}
        </div>
      </div>
    );
  }

  if (value && typeof value === 'object') {
    return (
      <div
        className={classes.value}
      >
        <div className={classes.label}>
          {type}
          :
        </div>
        <div title={value.val}>
          {value.val}
        </div>
      </div>
    );
  }

  return null;
};
