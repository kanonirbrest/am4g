/* eslint-disable no-param-reassign,prefer-destructuring */
import { EXCLUDED_IN_APP_AND_MULTI } from 'utils/targetingConfig/utils';

const config = {
  afterEvent: {
    field: 'afterEvent',
    label: 'Last Did Event',
    subFields: ['afterEvent'],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      name: '',
      type: 'hours',
      op: 'lt',
      val: '',
    }),
    parseDate: (target, value) => {
      target.afterEvent = [value];
    },
    getSendDate: (target, value) => {
      target.afterEvent = value[0];

      return target;
    },
  },
  hasEvent: {
    field: 'hasEvent',
    label: 'Has Event',
    subFields: ['hasEvent'],
    androidExcluded: [],
    iosExcluded: [],
    isMulti: true,
    withOr: true,
    defaultValues: () => ([{
      name: '',
      op: 'lt',
      val: '',
      params: [],
    }]),
    parseDate: (target, value) => {
      target.hasEvent = value;
    },
    getSendDate: (target, value) => {
      target.hasEvent = value;

      return target;
    },
  },
  sessionCount: {
    field: 'sessionCount',
    label: 'Session Count',
    subFields: ['sessionCount'],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      op: 'lt',
      val: '',
    }),
    parseDate: (target, value) => {
      target.sessionCount = [value];
    },
    getSendDate: (target, value) => {
      target.sessionCount = value[0];

      return target;
    },
  },
  sinceFirstVisitLess: {
    field: 'sinceFirstVisitLess',
    label: 'First used the app less than',
    subFields: ['sinceFirstVisitLess'],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      type: 'hours',
      val: '',
    }),
    parseDate: (target, value) => {
      target.sinceFirstVisitLess = [value];
    },
    getSendDate: (target, value) => {
      target.sinceFirstVisitLess = value[0];

      return target;
    },
  },
  sinceFirstVisitMore: {
    field: 'sinceFirstVisitMore',
    label: 'First used the app more than',
    subFields: ['sinceFirstVisitMore'],
    androidExcluded: [],
    iosExcluded: [],
    defaultValues: () => ({
      type: 'hours',
      val: '',
    }),
    parseDate: (target, value) => {
      target.sinceFirstVisitMore = [value];
    },
    getSendDate: (target, value) => {
      target.sinceFirstVisitMore = value[0];

      return target;
    },
  },
  sinceLastVisitLess: {
    field: 'sinceLastVisitLess',
    label: 'Last used the app less than',
    subFields: ['sinceLastVisitLess'],
    androidExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    iosExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    // restrict last used for InApp campaigns
    // https://jira.jabodo.com:8443/browse/AM4G-1276
    defaultValues: () => ({
      type: 'hours',
      val: '',
    }),
    parseDate: (target, value) => {
      target.sinceLastVisitLess = [value];
    },
    getSendDate: (target, value) => {
      target.sinceLastVisitLess = value[0];

      return target;
    },
  },
  sinceLastVisitMore: {
    field: 'sinceLastVisitMore',
    label: 'Last used the app more than',
    subFields: ['sinceLastVisitMore'],
    androidExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    iosExcluded: [
      // only for push and email
      ...EXCLUDED_IN_APP_AND_MULTI,
    ],
    defaultValues: () => ({
      type: 'hours',
      val: '',
    }),
    parseDate: (target, value) => {
      target.sinceLastVisitMore = [value];
    },
    getSendDate: (target, value) => {
      target.sinceLastVisitMore = value[0];

      return target;
    },
  },
  impressionCampaign: {
    field: 'impressionCampaign',
    label: 'Impression Campaign ID',
    subFields: ['ids',
      'was'],
    androidExcluded: [],
    iosExcluded: [],
    isMulti: true,
    withOr: false,
    defaultValues: () => ({
      was: true,
      ids: [],
    }),
    parseDate: (target, value) => {
      target.impressionCampaign = value;
    },
    getSendDate: (target, value) => {
      target.impressionCampaign = value;

      return target;
    },
  },
};
export default config;
