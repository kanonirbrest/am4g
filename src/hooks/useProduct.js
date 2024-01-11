import { copyObject, preventAction } from 'utils';
import * as React from 'react';
import _get from 'lodash.get';

import {
  onRmvProduct,
  rmvOfferValueForAllLanguages,
} from 'utils/languageUtils';
import { updateFieldsText } from '../routes/Application/NewCampaign/Stepper/Step2/InApp/Custom/AddProduct/utils';
import OfferStateContext from '../contexts/OfferState';

const increment = (prev) => prev + 1;

const REMOVE_PRODUCT_MESSAGE = 'Are you sure you want to delete this product? '
  + 'By confirming you agree that the product and its variables '
  + 'will be deleted from the campaign as well';

export default ({
  indexInAllProducts, initialProductValues, productId, formik,
  setAllProducts, allProducts, setForceEditorUpdate,
}) => {
  const [reInitProduct, setReInitProduct] = React.useState(0);
  const { setOfferOptions, offerOptions, setOffers } = React.useContext(OfferStateContext);

  const onRemoveProduct = (e) => {
    preventAction(e);
    if (window// eslint-disable-line no-alert
      .confirm(REMOVE_PRODUCT_MESSAGE)) {
      const obj = copyObject(formik.values.step2.products);
      delete obj[productId];
      formik.setFieldValue('step2.products', obj);

      const products = [...allProducts];
      products[indexInAllProducts] = initialProductValues.current[indexInAllProducts];
      products[indexInAllProducts].alias = initialProductValues.current[indexInAllProducts].productId;

      setAllProducts(products);
      setOfferOptions(offerOptions.filter((o) => o.productId !== productId));
      const languages = onRmvProduct(
        formik.values.step2.languages, productId,
      );
      setOffers((offers) => offers.filter((o) => !o.includes(`${productId}&`)));
      formik.setFieldValue('step2.languages', languages);
    }
  };

  const onProductChange = (e, key) => {
    let newValue = e.target.value;
    const products = [...allProducts];
    const activeProduct = allProducts[indexInAllProducts];
    const oldValue = activeProduct[key];
    if (oldValue === newValue) return;

    if (key === 'alias') {
      if (!newValue
        || Object.values(formik.values.step2.products)
          .map((o) => o.alias)
          .includes(newValue)) {
        // empty alias set as productId
        newValue = activeProduct.productId;
      }

      const languages = formik.values.step2.languages.map((l) => ({
        ...l,
        // key alias
        fields: updateFieldsText(newValue, indexInAllProducts, activeProduct.productId, oldValue, l.fields),
      }));
      formik.setFieldValue('step2.products', {
        ...formik.values.step2.products,
        [productId]: {
          ...formik.values.step2.products[productId],
          alias: newValue,
        },
      });
      // check if we should update languages if it was not alias
      formik.setFieldValue('step2.languages', languages).then(() => {
        setForceEditorUpdate(increment);
      });

      setReInitProduct(increment);
    }

    products[indexInAllProducts][key] = newValue;
    setAllProducts(products);
  };

  const onResetProduct = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const products = [...allProducts];

    products[indexInAllProducts] = {
      ...initialProductValues.current[indexInAllProducts],
      alias: products[indexInAllProducts].alias,
    };
    setAllProducts(products);
    setReInitProduct(increment);
  };

  const onResetProductField = (field) => {
    const products = [...allProducts];
    products[indexInAllProducts][field] = initialProductValues.current[indexInAllProducts][field];
    setAllProducts(products);
    setReInitProduct(increment);
  };

  /* offers */
  const onRemoveOffer = (offerKey) => {
    setOfferOptions((ops) => ops.filter((o) => o.value !== offerKey));

    formik.setFieldValue('step2.products', {
      ...formik.values.step2.products,
      [productId]: {
        ...formik.values.step2.products[productId],
        offers: formik.values.step2.products[productId].offers
          .filter((o) => o !== offerKey),
      },
    });
    const languages = rmvOfferValueForAllLanguages(
      _get(formik.values, 'step2.languages'), offerKey,
    );
    formik.setFieldValue('step2.languages', languages);
    setOffers((offers) => offers.filter((o) => o !== offerKey));
    // re-init update view
    setReInitProduct(increment);
  };
  const onOfferChange = (e, key, offerIndex) => {
    const newValue = e.target.value;
    const products = copyObject(allProducts);
    const oldValue = products[indexInAllProducts][key];
    if (oldValue === newValue) return;
    // null - to handle isModified state when stringify
    products[indexInAllProducts].offers[offerIndex][key] = newValue || null;
    setAllProducts(products);
  };
  const onResetOfferField = (offerIndex, field) => {
    const products = copyObject(allProducts);

    products[indexInAllProducts].offers[offerIndex][field] = initialProductValues
      .current[indexInAllProducts].offers[offerIndex][field];
    setAllProducts(products);
    setReInitProduct(increment);
  };

  return {
    onRemoveProduct,
    onProductChange,
    onResetProduct,
    onResetProductField,
    onRemoveOffer,
    onOfferChange,
    onResetOfferField,
    reInitProduct,
  };
};
