/* we are using custom key because unique key offerId is available
 only on client side, and we can't get this information on mobile
* when loadProducts is call. So we should create our
unique key from fields that available on mobile */
// eslint-disable-next-line import/prefer-default-export
export const buildOfferKey = (identifier, productId) => `${productId}&${identifier}`;
