export const FREE_SUBSCRIPTION_STATUS = {
  STATUS_FREE: 'Free',
  STATUS_EXPIRED_TRIAL: 'Expired Trial',
  EXPIRED_PAID: 'Expired Paid',
};

export const SUBSCRIPTION_STATUS = {
  ...FREE_SUBSCRIPTION_STATUS,
  CANCELLED_TRIAL: 'Cancelled Trial',
  CANCELLED_PAID: 'Cancelled Paid',
  STATUS_TRIAL: 'Trial',
  STATUS_PAID: 'Paid',
};
export const subscriptionOptions = Object.keys(SUBSCRIPTION_STATUS).map((key) => ({
  label: SUBSCRIPTION_STATUS[key],
  value: SUBSCRIPTION_STATUS[key],
}));
export const subscriptionFreeOptions = Object.keys(FREE_SUBSCRIPTION_STATUS)
  .map((key) => ({
    label: SUBSCRIPTION_STATUS[key],
    value: SUBSCRIPTION_STATUS[key],
  }));
export const FILTER = {
  SUBSCRIPTION_STATUS: 'Subscription Status',
  COUNTRY: 'Country',
  REGION: 'Region',
  APP_VERSION: 'App Version',
  OS_VERSION: 'Os Version',
  DEVICE_TYPE: 'Device Type',
  DEVICE_MODEL: 'Device Model',
  PURCHASE_TYPE: 'Purchase type',
  IDFA_PERMISSION_REQUEST: 'IDFA Permission Request',
  LD_TRACK_ID: 'LD Track ID',
  DEVICE_IDFV: 'Device Idfv',
  BILLING_RETRY: 'Billing Retry',
  RENEW_COUNT: 'Renew Count',
  PREMIUM_EXPIRATION_DATE_LESS: 'Premium Expiration Date Less',
  PREMIUM_EXPIRATION_DATE_MORE: 'Premium Expiration Date More',
  USER_PROPERTY: 'User Property',
  USER_BUCKET: 'User Bucket',
  NPS: 'NPS', // we should map FILTER constant to label in filter config
};

export const ADDITIONAL_FILTER = {
  LAST_DID_EVENT: 'Last Did Event',
  HAS_EVENT: 'Has Event',
  SESSION_COUNT: 'Session Count',
  FIRST_USED_LESS: 'First used the app less than',
  FIRST_USED_MORE: 'First used the app more than',
  LAST_USED_MORE: 'Last used the app more than',
  LAST_USED_LESS: 'Last used the app less than',
  IMPRESSION_CAMPAIGN_ID: 'Impression Campaign ID',
};

export const actionButtonOptions = [
  'Action Button', 'Add Page Tapped',
  'App Open URL', 'Cancel Survey Screen Shown',
  'Checkout Complete', 'Checkout Failed',
  'Close Button', 'Delete Tapped',
  'Demo Document Deleted',
].map((a) => ({
  value: a, label: a,
}));

export const timestampOptions = [
  'hours', 'days',
].map((a) => ({
  value: a, label: a,
}));
