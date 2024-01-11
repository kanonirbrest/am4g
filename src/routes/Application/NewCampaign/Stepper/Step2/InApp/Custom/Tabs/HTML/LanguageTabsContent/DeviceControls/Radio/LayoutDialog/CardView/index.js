import * as React from 'react';
import { makeStyles } from '@mui/styles';

import RadioPreview from 'components/RadioPreview';
import { DEFAULT_RADIO_OFFER_ITEM } from 'utils/RadioWidget/constant';
import Controls from '../Controls';

const useStyles = makeStyles(() => ({
  container: {
    borderRadius: '4px',
    border: '1px solid #D8DFE8',
    background: '#F8FAFD',
    flexGrow: 1,
  },
  header: {
    padding: '20px 15px',
    borderBottom: '1px solid #D8DFE8',
  },
  label: {
    margin: 0,
    color: '#6C7688',
    fontSize: '14px',
    fontWeight: 700,
  },
  body: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderBottom: '1px solid rgba(102, 112, 128, 0.30)',
  },
  preview: {
    display: 'flex',
    width: '275px',
    height: '75px',
    padding: '15px 16px',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
    borderRadius: '15px',
    border: '1px solid rgba(102, 112, 128, 0.30)',
    background: '#FFF',
    boxSizing: 'border-box',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
  },
  row: {
    display: 'flex',
  },
  item: {
    flexGrow: 1,
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    padding: '20px 30px',
  },
}));

export default ({
  label, name, values, isSelected, itemValues,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p className={classes.label}>{label}</p>
      </div>
      <div className={classes.body}>
        <RadioPreview
          values={values}
          itemValues={itemValues}
          isSelected={isSelected}
          title={DEFAULT_RADIO_OFFER_ITEM.title}
          subTitle={DEFAULT_RADIO_OFFER_ITEM.subTitle}
          details={DEFAULT_RADIO_OFFER_ITEM.details}
          subDetails={DEFAULT_RADIO_OFFER_ITEM.subDetails}
        />
      </div>
      <div className={classes.controls}>
        <Controls values={itemValues} name={isSelected ? `${name}selected.` : name} isSelected={isSelected} />
      </div>
    </div>
  );
};
