/* eslint-disable no-param-reassign,prefer-destructuring */
import { campaignType } from 'components/constants';
import { PLATFORM } from 'utils/constants';
import { EXCLUDED_IN_APP_AND_MULTI } from 'utils/targetingConfig/utils';

/*
* isSingle -this props means that the field value is {}, if it is !isSingle
* value will be in array [{}] and it is also influence on parse date when get
* it to edit campaign.
* */
const config = {
  appVersion: {
    field: 'appVersion',
    withOr: false,
    label: 'App Version',
    subFields: [
      'appVersion',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      op: 'lt',
      val: '',
    }),
    parseDate: (target, value) => {
      target.appVersion = [value];
    },
    getSendDate: (target, value) => {
      target.appVersion = value[0];

      return target;
    },
  },
  billingRetry: {
    field: 'billingRetry',
    withOr: false,
    label: 'Billing Retry',
    subFields: [
      'billingRetry',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      billingRetry: 'yes',
    }),
    parseDate: (target, value, key) => {
      target.billingRetry = [{ [key]: value }];
    },
    getSendDate: (target, value) => ({ ...target, ...value[0] }),
  },
  nps: {
    field: 'nps',
    withOr: false,
    isSingle: true,
    label: 'NPS', // we should map label to FILTER constant
    subFields: [
      'npsScores', 'npsCampaigns',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      npsScores: [],
      npsCampaigns: [],
    }),
    parseDate: (target, value, key) => {
      target.nps = { ...target.nps, [key]: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  country: {
    field: 'country',
    withOr: false,
    label: 'Country',
    isSingle: true,
    subFields: [
      'countryOperation', 'country',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      countryOperation: 'in',
      country: [],
    }),
    parseDate: (target, value, key) => {
      target.country = { ...target.country, [key]: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  deviceModel: {
    field: 'deviceModel',
    withOr: false,
    label: 'Device Model',
    subFields: [
      'deviceModel',
    ],
    androidExcluded: Object.keys(campaignType).map((t) => campaignType[t]),
    iosExcluded: [],
    defaultValues: () => ({
      deviceModel: [],
    }),
    parseDate: (target, value, key) => {
      target.deviceModel = [{ [key]: value }];
    },
    getSendDate: (target, value) => ({ ...target, ...value[0] }),
  },
  deviceType: {
    field: 'deviceType',
    withOr: false,
    label: 'Device Type',
    isSingle: true,
    subFields: [
      'deviceType',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: (platformValue) => ({
      deviceType: platformValue === PLATFORM.ANDROID ? 'phone' : 'iPhone',
    }),
    parseDate: (target, value, key) => {
      target.deviceType = { ...target.deviceType, [key]: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  renewCount: {
    field: 'renewCount',
    withOr: false,
    label: 'Renew Count',
    subFields: [
      'renewCount',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      renewCount: '',
    }),
    parseDate: (target, value, key) => {
      target.renewCount = [{ [key]: value }];
    },
    getSendDate: (target, value) => ({ ...target, ...value[0] }),
  },
  expirationDateFrom: {
    field: 'expirationDateFrom',
    withOr: false,
    label: 'Premium Expiration Date in More',
    isSingle: true,
    subFields: [
      'expirationDateFrom',
    ],
    androidExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    iosExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    defaultValues: () => ({
      expirationDateFrom: null,
    }),
    parseDate: (target, value) => {
      target.expirationDateFrom = { expirationDateFrom: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  expirationDateTo: {
    field: 'expirationDateTo',
    withOr: false,
    label: 'Premium Expiration Date in Less',
    isSingle: true,
    subFields: [
      'expirationDateTo',
    ],
    androidExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    iosExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    defaultValues: () => ({
      expirationDateTo: null,
    }),
    parseDate: (target, value) => {
      target.expirationDateTo = { expirationDateTo: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  expirationDateAgoTo: {
    field: 'expirationDateAgoTo',
    withOr: false,
    label: 'Premium expired less than N days ago',
    isSingle: true,
    subFields: [
      'expirationDateAgoTo',
    ],
    androidExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    iosExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    defaultValues: () => ({
      expirationDateAgoTo: null,
    }),
    parseDate: (target, value) => {
      target.expirationDateAgoTo = { expirationDateAgoTo: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  expirationDateAgoFrom: {
    field: 'expirationDateAgoFrom',
    withOr: false,
    label: 'Premium expired more than N days ago',
    isSingle: true,
    subFields: [
      'expirationDateAgoFrom',
    ],
    androidExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    iosExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    defaultValues: () => ({
      expirationDateAgoFrom: null,
    }),
    parseDate: (target, value) => {
      target.expirationDateAgoFrom = { expirationDateAgoFrom: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  IDFAPermissionRequest: {
    field: 'IDFAPermissionRequest',
    withOr: false,
    isSingle: true,
    label: 'IDFA Permission Request',
    subFields: [
      'trackAuthStatus',
    ],
    androidExcluded: Object.keys(campaignType).map((t) => campaignType[t]),
    iosExcluded: [],
    defaultValues: () => ({
      trackAuthStatus: 'not_determined',
    }),
    parseDate: (target, value, key) => {
      target.IDFAPermissionRequest = { ...target.IDFAPermissionRequest, [key]: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  purchaseType: {
    field: 'purchaseType',
    withOr: false,
    label: 'Purchase type',
    isSingle: true,
    subFields: [
      'purposesOperation', 'purposes',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      purposes: [],
      purposesOperation: 'in',
    }),
    parseDate: (target, value, key) => {
      target.purchaseType = { ...target.purchaseType, [key]: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  userBucket: {
    field: 'userBucket',
    withOr: false,
    label: 'User Bucket',
    isSingle: true,
    subFields: [
      'userBucketOperation', 'userBucket',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      userBucket: [''],
      userBucketOperation: 'lt',
    }),
    parseDate: (target, value, key) => {
      target.userBucket = { ...target.userBucket, [key]: value };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  ldTrackId: {
    field: 'ldTrackId',
    withOr: false,
    label: 'LD Track ID',
    subFields: [
      'ldTrackIdOperation',
      'ldTrackId',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      ldTrackId: [],
      ldTrackIdOperation: 'in',
    }),
    parseDate: (target, value, key) => {
      const date = target.ldTrackId ? target.ldTrackId[0] : {};
      target.ldTrackId = [{ ...date, [key]: value }];
    },
    getSendDate: (target, value) => ({ ...target, ...value[0] }),
  },
  deviceIdfv: {
    field: 'deviceIdfv',
    withOr: false,
    label: 'Device Idfv',
    subFields: [
      'deviceIdfv',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      deviceIdfv: '',
    }),
    parseDate: (target, value, key) => {
      target.deviceIdfv = [{ [key]: value }];
    },
    getSendDate: (target, value) => ({ ...target, ...value[0] }),
  },
  osVersion: {
    field: 'osVersion',
    withOr: false,
    label: 'Os Version',
    subFields: [
      'osVersion',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      op: 'lt',
      val: '',
    }),
    parseDate: (target, value) => {
      target.osVersion = [value];
    },
    getSendDate: (target, value) => {
      target.osVersion = value[0];

      return target;
    },
  },
  region: {
    field: 'region',
    withOr: false,
    label: 'Region',
    isSingle: true,
    subFields: [
      'region',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      region: [],
    }),
    parseDate: (target, value, key) => {
      target.region = {
        ...target.region,
        [key]: value,
      };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
  userProperty: {
    field: 'userProperty',
    withOr: true,
    label: 'User Property',
    subFields: [],
    isMulti: true,
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ([{
      name: '',
      val: '',
    }]),
    parseDate: (target, value) => {
      target.userProperty = value;
    },
    getSendDate: (target, value) => ({ ...target, userProperty: value }),
  },
  subscriptionStatus: {
    field: 'subscriptionStatus',
    withOr: false,
    label: 'Subscription Status',
    isSingle: true,
    subFields: [
      'screenId',
      'subscriptionStatus',
      'productId',
    ],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      subscriptionStatus: [],
      productId: null,
      screenId: null,
    }),
    parseDate: (target, value, key) => {
      target.subscriptionStatus = {
        // pass validation only if null
        productId: target.productId || null,
        screenId: target.screenId || null,
        ...target.subscriptionStatus,
        [key]: value,
      };
    },
    getSendDate: (target, value) => ({ ...target, ...value }),
  },
};
export default config;

export const singleFilterProps = Object.keys(config)
  .map((key) => config[key])
  .filter((filter) => filter.isSingle);
