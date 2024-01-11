import React from 'react';
import { makeStyles } from '@mui/styles';

import FormikSelect from 'components/FormControls/Select';
import AllProductsContext from 'contexts/Products';
import OfferStateContext from 'contexts/OfferState';
import Hint from 'components/Hint';
import { OFFER_TYPE, PLATFORM } from 'utils/constants';
import { useFormikContext } from 'formik';

const useStyles = makeStyles(() => ({
  label: {
    color: '#6C7688',
    display: 'block',
    fontSize: '11px',
    textAlign: 'start',
    marginBottom: '5px',
    marginTop: '5px',
  },
}));

export default ({
  name,
  actionProps,
  onChange,
  value,
  actionIndex,
  pageOptions,
  platform,
}) => {
  const {
    allProducts,
  } = React.useContext(AllProductsContext);
  const classes = useStyles();
  const { values } = useFormikContext();
  const selectedProductIds = Object.keys(values.step2.products || {});
  const { offerOptions } = React.useContext(OfferStateContext);
  const options = React.useMemo(() => allProducts
    .map((p) => ({
      label: `${p?.title} (${p.productId})`,
      value: p?.productId,
    }))
    .filter((p) => selectedProductIds.includes(p?.value)),
  [selectedProductIds.length, allProducts.length]);

  const offerOps = React.useMemo(() => [{ label: 'no offer', value: '' },
    ...offerOptions
      .filter((o) => value.product === o.productId
          && (o.type !== OFFER_TYPE.INTRO
          || platform === PLATFORM.ANDROID
          )),
  ], [offerOptions, value.product]);

  return (
    <>
      <FormikSelect
        value={value.product}
        name={`${name}.product`}
        options={options}
        onChange={(e) => {
          onChange(e, actionIndex, 'product');
        }}
        placeholder="Select product"
        {...actionProps}
      />
      {!!value.product && (
      <>
        <div
          className={classes.label}
        >
          Choose promo offer applied in case of eligibility
          <Hint text="If eligible, user will be able to purchase a offer,
          otherwise will be initialized the purchase of the main (base) product"
          />
        </div>
        <FormikSelect
          value={value.offer || ''}
          name={`${name}.offer`}
          options={offerOps}
          onChange={(e) => onChange(e, actionIndex, 'offer')} // check if all langs
          placeholder="Select promo offer"
          {...actionProps}
        />
      </>
      )}
      <div className={classes.label}>Success Page</div>
      <FormikSelect
        value={value.successPage || ''}
        name={`${name}.successPage`}
        options={pageOptions}
        onChange={(e) => onChange(e, actionIndex, 'successPage')}
        placeholder="Select success page/action"
        {...actionProps}
      />
      <div className={classes.label}>Error Page</div>
      <FormikSelect
        value={value.errorPage || ''}
        name={`${name}.errorPage`}
        options={pageOptions}
        onChange={(e) => onChange(e, actionIndex, 'errorPage')}
        placeholder="Select error page/action"
        {...actionProps}
      />
    </>
  );
};
