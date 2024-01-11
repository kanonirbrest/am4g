export const HIDDEN_FIELDS = ['alias',
  '__typename', 'productId',
  'title', 'period',
  'periodLengthSubs',
  'periodLengthTrial',
  'type', 'offers',
];

// TODO: check here
export const getHiddenFields = (product) => {
  if (product.type === 'inapp') {
    return [...HIDDEN_FIELDS, 'periodCountSubs'];
  }

  return HIDDEN_FIELDS;
};
export const ALIAS_LABELS = {
  alias: 'Alias',
  title: 'Title',
  productId: 'Product ID',
  localizedPrice: 'Localized Price',
  period: 'Period',
  currency: 'Currency',
  periodCountSubs: 'Subs Count',
  periodLengthSubs: 'Subs Length',
  price: 'Price',
  type: 'Type',
};
export const UNCHECK_OFFER_MESSAGE = 'Please note that unchecking an offer means '
  + 'it will be deleted from the campaign. If you have already used this offer in '
  + '“Variants“, it will be deleted too. This action is irreversible. Continue anyway? ';
