import * as React from 'react';
import { makeStyles } from '@mui/styles';

import MultiSearchSelect from 'components/FormControls/MultiSearchSelect';
import { buildOfferKey } from 'utils/OfferUtils';
import UncontrolledInput from '../UncontrolledInput';
import InputList from './InputList';
import OfferItem from '../Offer';
import { ALIAS_LABELS, getHiddenFields } from '../constant';

const useStyles = makeStyles(() => ({
  item: {
    position: 'relative',
    flexGrow: 1,
  },
  title: {
    display: 'flex',
    fontSize: '12px',
    padding: '20px 0',
    borderBottom: '1px solid #D8DFE8',
  },
  list: {
    display: 'flex',
  },
  productId: {
    fontSize: '11px',
    color: '#8D95A9',
  },
  container: {
    padding: '0 50px',
  },
  info: {
    flexGrow: 1,
    paddingLeft: '20px',
  },
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
  row: {
    display: 'flex',
    flexGrow: 1,
    width: '50%',
    flexDirection: 'column',
  },
  label: {
    fontSize: '11px',
    color: '#6C7688',
    marginBottom: '5px',
  },
}));

export default ({
  allProducts,
  activeProductId,
  onChange,
  onRemoveOffer,
  initialProductValues,
  indexInAllProducts,
  onResetProductField,
  offers = [],
  onOfferChange,
  onResetOfferField,
  onSelect,
  setExpand,
  expand,
}) => {
  const classes = useStyles();
  const selectedProduct = allProducts[indexInAllProducts];

  const hiddenFields = getHiddenFields(selectedProduct);
  // to make alias first
  const keys = [...Object.keys(selectedProduct)
    .filter((k) => !hiddenFields.includes(k))];
  const allOffers = selectedProduct.offers.map((o) => ({
    label: `${o.identifier} (${o.paymentMethod}) `,
    value: buildOfferKey(o?.identifier, selectedProduct?.productId),
  }));

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <div className={classes.item}>
          <div className={classes.label}>
            {ALIAS_LABELS.alias}
          </div>
          <UncontrolledInput
            label={ALIAS_LABELS.alias || 'alias'}
            value={selectedProduct.alias || ''}
            placeholder="Enter Alias..."
            onBlur={(e) => {
              e.target.value = e.target.value.replace(/\s+/g, ' ').trim();
              onChange(e, 'alias', indexInAllProducts);
            }}
          />
        </div>
        <div className={classes.info}>
          <div>
            {selectedProduct.title}
          </div>
          <div className={classes.productId}>
            {selectedProduct.productId}
          </div>
        </div>
      </div>
      <div className={classes.list} key={activeProductId}>
        <div className={classes.row}>
          <InputList
            onChange={onChange}
            initialProductValues={initialProductValues}
            indexInAllProducts={indexInAllProducts}
            onResetProductField={onResetProductField}
            selectedProduct={selectedProduct}
            title="Default product"
            keys={keys}
          />
        </div>
        <div className={classes.row}>
          <div className={classes.defaultLabel}>
            <span style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            >
              Offers
            </span>
            <MultiSearchSelect
              onSelect={onSelect}
              values={offers}
              options={allOffers}
              title="Available offers"
            />
          </div>
          {selectedProduct.offers.filter((
            of,
          ) => offers.includes(buildOfferKey(of?.identifier, selectedProduct?.productId)))
            .map((offer, index) => (
              <OfferItem
                key={offer.identifier}
                offer={offer}
                onRemove={onRemoveOffer}
                initialOfferValues={initialProductValues.offers[index]}
                index={index}
                offerKey={buildOfferKey(offer?.identifier, selectedProduct?.productId)}
                onOfferChange={onOfferChange}
                onResetOfferField={onResetOfferField}
                expand={expand}
                setExpand={setExpand}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
