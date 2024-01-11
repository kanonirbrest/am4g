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

const OFFER_LABELS = {
  offerId: 'Offer id',
  paymentMethod: 'Payment method',
  numberOfPeriods: 'Number of periods',
  periodLengthOffer: 'Period Length',
  duration: 'Duration',
  identifier: 'Identifier',
  periodCountOffer: 'Period count offer',
  type: 'Type',
  price: 'Price',
  localizedPrice: 'Localized price',
};

export const DISABLED_OFFER_FIELDS = [
  'type', 'duration',
  'paymentMethod', 'offerId', 'periodLengthOffer',
];
export const HIDDEN_OFFER_FIELDS = [
  '__typename', 'offerId', 'identifier',
];
export default ({
  initialOfferValues,
  title,
  offer,
  index,
  onOfferChange,
  onResetOfferField,
}) => {
  const classes = useStyles();
  const keys = Object.keys(offer).filter((k) => !HIDDEN_OFFER_FIELDS
    .includes(k));

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
                const isChanged = (initialOfferValues[k] || '')
                  !== (offer[k] || '');

                return (
                  <div className={classes.inputItem} key={k}>
                    <div className={classes.label}>{OFFER_LABELS[k]}</div>
                    <UncontrolledInput
                      label={ALIAS_LABELS[k] || k}
                      isChanged={isChanged}
                      value={offer[k] || ''}
                      onReset={() => {
                        onResetOfferField(index, k);
                      }}
                      onBlur={(e) => {
                        onOfferChange(e, k, index);
                      }}
                      disabled={DISABLED_OFFER_FIELDS.includes(k)}
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
