// noinspection JSAnnotator

import React from 'react';

import AllProductsContext from 'contexts/Products';
import {
  getHiddenFields,
} from '../routes/Application/NewCampaign/Stepper/Step2/InApp/Custom/AddProduct/ProductItem/constant';
import {
  DISABLED_OFFER_FIELDS,
  HIDDEN_OFFER_FIELDS,
} from '../routes/Application/NewCampaign/Stepper/Step2/InApp/Custom/AddProduct/ProductItem/Offer/InputList';
import { buildOfferKey } from '../utils/OfferUtils';

const NESTED_MENU_ITEM = 'nestedmenuitem';
const MENU_ITEM = 'menuitem';
const OFFER_FOLDERS_NAME = 'offers';

const getOfferItems = (products, product, editorRef) => product.offers
  .filter((off) => products[product.productId].offers.includes(
    buildOfferKey(off.identifier, product.productId),
  ))
  .map((offer) => ({
    type: NESTED_MENU_ITEM,
    text: offer.identifier,
    getSubmenuItems: () => {
      const offerKeys = Object.keys(offer)
        .filter((k) => ![...HIDDEN_OFFER_FIELDS, ...DISABLED_OFFER_FIELDS]
          .includes(k));

      return offerKeys.map((k) => ({
        type: MENU_ITEM,
        text: k,
        onAction: () => {
          editorRef.current
            // eslint-disable-next-line
                .insertContent(
              `<span
                        class="template mceNonEditable"
                        data-field="${k}"
                        data-productId="${product.productId}"
                        data-offerIdentifier="${offer.identifier}"
                        data-oldtemplate="{{${product.alias}.${offer.identifier}.${k}}}"
                        style="display: inline" 
                      >{{${product.alias}.${offer.identifier}.${k}}}</span>`,
            );
        },
      }));
    },
  }));
export default ({
  values,
  products,
  forceEditorUpdate,
  editorText,
  selectedProduct,
}) => {
  const editorRef = React.useRef(null);
  const {
    allProducts,
  } = React.useContext(AllProductsContext);
  const updateEditorStyle = (prop, value) => {
    editorRef.current.getBody().style[prop] = value;
  };
  const updateProductMenu = () => {
    const selectedProductIds = allProducts
      .filter((p) => Object.keys(products || {}).filter((k) => (selectedProduct
        ? k === selectedProduct : true)) // if we have selected - apply only selected, if no apply all
        .includes(p.productId));

    const items = selectedProductIds.map((p) => ({
      type: NESTED_MENU_ITEM,
      text: p.alias,
      getSubmenuItems: () => {
        const hiddenFields = getHiddenFields(p);
        let offerItems = [];

        const keys = Object.keys(p)
          .filter((k) => !hiddenFields.includes(k));
        if (products[p.productId]?.offers?.length) {
          offerItems = getOfferItems(products, p, editorRef);
        }

        return [{
          type: NESTED_MENU_ITEM,
          text: OFFER_FOLDERS_NAME,
          getSubmenuItems: () => offerItems,
        }, ...keys.map((k) => ({
          type: MENU_ITEM,
          text: k,
          onAction: () => {
            editorRef.current
              // eslint-disable-next-line
              .insertContent(
                `<span
                  class="template mceNonEditable"
                  data-field="${k}"
                  data-productId="${p.productId}"
                  data-oldtemplate="{{${p.alias}.${k}}}"
                  style="display: inline"
                >{{${p.alias}.${k}}}</span>`,
              );
          },
        }))];
      },
    }
    ));

    // context menu
    editorRef.current.ui.registry
      .addNestedMenuItem('product', {
        text: 'Add Product',
        getSubmenuItems: () => items,
      });

    // we re-record it later
    editorRef.current.ui.registry.addNestedMenuItem('nesteditem', {
      text: 'Selected Products',
      getSubmenuItems: () => items,
    });
  };

  React.useEffect(() => {
    if (editorRef.current) {
      // update product list {}
      updateProductMenu();
    }
  }, [products]);
  React.useEffect(() => {
    if (editorRef?.current && forceEditorUpdate) {
      // external editor update
      editorRef.current.setContent(editorText);
    }
  }, [forceEditorUpdate]);

  const updateInitialEditorStyles = () => {
    if (editorRef.current?.getBody()) {
      editorRef.current.getBody().style.fontSize = `${values.fontSize}px`;
      editorRef.current.getBody().style.color = values.color;
      editorRef.current.getBody().style.fontWeight = values.fontWeight;
      editorRef.current.getBody().style.fontFamily = values.fontFamily;
      editorRef.current.getBody().style.textAlign = values.alignment;
    }

    updateProductMenu();
  };

  return {
    editorRef, updateEditorStyle, updateInitialEditorStyles, updateProductMenu,
  };
};
