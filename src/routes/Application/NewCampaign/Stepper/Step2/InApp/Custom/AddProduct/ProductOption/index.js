import * as React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  optionContainer: {
    '&:hover': {
      background: '#F1F5FA',
    },
    cursor: 'pointer',
    padding: '10px',
  },
  optionLabel: {
    fontSize: '12px',
  },
  optionValue: {
    fontSize: '10px',
    color: '#8D95A9',
  },
}));

const ProductOption = ({ props, option }) => {
  const classes = useStyles();

  return (
    <div {...props} className={classes.optionContainer}>
      <div className={classes.optionLabel}>
        {option.label}
      </div>
      <div className={classes.optionValue}>{option.value}</div>
    </div>
  );
};

export default ProductOption;
