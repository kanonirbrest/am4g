import * as React from 'react';
import { makeStyles } from '@mui/styles';

import UncontrolledInput from '../UncontrolledInput';
import { ALIAS_LABELS } from '../constant';

const useStyles = makeStyles(() => ({
  defaultLabel: {
    fontSize: '10px',
    color: '#6C7688',
    marginTop: '20px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  inputItem: {
    width: '140px',
    marginRight: '20px',
  },
  inputList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: '11px',
    color: '#6C7688',
    marginBottom: '5px',
  },
  emptyLabel: {
    color: '#6C7688',
    fontSize: '12px',
    marginBottom: '5px',
  },
}));

export default ({
  onChange,
  initialProductValues,
  indexInAllProducts,
  onResetProductField,
  selectedProduct,
  title,
  keys,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.defaultLabel}>
        {title}
      </div>
      <div className={classes.inputList}>
        {
          keys
            .map(
              (k) => {
                const isChanged = (initialProductValues[k] || '')
                      !== (selectedProduct[k] || '');

                return (
                  <div className={classes.inputItem} key={k}>
                    <div className={classes.label}>{ALIAS_LABELS[k]}</div>
                    <UncontrolledInput
                      label={ALIAS_LABELS[k] || k}
                      isChanged={isChanged}
                      value={selectedProduct[k] || ''}
                      onReset={() => onResetProductField(k)}
                      onBlur={(e) => {
                        onChange(e, k, indexInAllProducts);
                      }}
                    />
                  </div>
                );
              },
            )
}
      </div>
    </>
  );
};
