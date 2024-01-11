import { campaignType } from 'components/constants';
import { DEFAULT_PUSH_LANGUAGE_CONTENT } from 'utils/constants/index';

export const CAMPAIGN_TYPE = {
  IN_APP: 'IN_APP',
  PUSH: 'PUSH',
  MULTI: 'MULTI',
  EMAIL: 'EMAIL',
};

export const OPEN_ACTION = {
  CLOSE_SCREEN: 'CloseScreen',
  RR_SCREEN: 'RRScreen',
  SUBMIT: 'Submit',
  DEEPLINK: 'Deeplink',
  URL: 'URL',
  SUBSCRIPTION: 'Subscription',
  OPEN_PAGE: 'Open Page',
  BUTTON_TRIGGER: 'ButtonTrigger',
  SEND_ANALYTICS: 'SendAnalyticsEvent',
  PURCHASE: 'Purchase',
  PURCHASE_TRIGGER: 'PurchaseTrigger',
  INVOKE_RADIO: 'Radio Card Group',
  // label for open page subField
  SUB_DEEPLINK: 'Enter Deeplink',
  SUB_URL: 'Enter URL',
  SUB_OPEN_PAGE: 'Select Page',
  SUB_SUBSCRIPTION: 'Enter Subscription Screen Id',
  SUB_SEND_ANALYTICS: 'Enter Analytic Params',
  SUB_PURCHASE: 'Choose Product',
  SUB_PURCHASE_TRIGGER: 'Choose Trigger',
};

export const OPEN_ACTION_LABEL = {
  [OPEN_ACTION.CLOSE_SCREEN]: 'Close Message',
  [OPEN_ACTION.RR_SCREEN]: 'Request App Rating',
  [OPEN_ACTION.SUBMIT]: 'Submit Response',
  [OPEN_ACTION.INVOKE_RADIO]: 'Invoke Radio Group',
  [OPEN_ACTION.DEEPLINK]: 'Deep Link Into App',
  [OPEN_ACTION.URL]: 'Open URL',
  [OPEN_ACTION.SUBSCRIPTION]: 'Open Subscription Screen',
  [OPEN_ACTION.OPEN_PAGE]: 'Open Page',
  [OPEN_ACTION.SEND_ANALYTICS]: 'Send Analytics Event',
  [OPEN_ACTION.PURCHASE]: 'Purchase',
  [OPEN_ACTION.PURCHASE_TRIGGER]: 'Purchase Trigger',
  [OPEN_ACTION.BUTTON_TRIGGER]: 'Link as Trigger',
};

export const ImageActionOptions = [
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.CLOSE_SCREEN],
    value: OPEN_ACTION.CLOSE_SCREEN,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.SEND_ANALYTICS],
    value: OPEN_ACTION.SEND_ANALYTICS,
    subField: OPEN_ACTION.SUB_SEND_ANALYTICS,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.OPEN_PAGE],
    value: OPEN_ACTION.OPEN_PAGE,
    subField: OPEN_ACTION.SUB_OPEN_PAGE,
  },
  { label: OPEN_ACTION_LABEL[OPEN_ACTION.RR_SCREEN], value: OPEN_ACTION.RR_SCREEN },
  { label: OPEN_ACTION_LABEL[OPEN_ACTION.SUBMIT], value: OPEN_ACTION.SUBMIT },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.DEEPLINK],
    value: 'Deeplink',
    subField: OPEN_ACTION.SUB_DEEPLINK,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.URL],
    value: 'URL',
    subField: OPEN_ACTION.SUB_URL,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.SUBSCRIPTION],
    value: 'Subscription',
    subField: OPEN_ACTION.SUB_SUBSCRIPTION,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.PURCHASE],
    value: 'Purchase',
    subField: OPEN_ACTION.SUB_PURCHASE,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.BUTTON_TRIGGER],
    value: OPEN_ACTION.BUTTON_TRIGGER,
    subField: OPEN_ACTION.SUB_PURCHASE_TRIGGER,
  },
];

export const ButtonActionOptions = [
  { label: OPEN_ACTION_LABEL[OPEN_ACTION.CLOSE_SCREEN], value: OPEN_ACTION.CLOSE_SCREEN },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.SEND_ANALYTICS],
    value: OPEN_ACTION.SEND_ANALYTICS,
    subField: OPEN_ACTION.SUB_SEND_ANALYTICS,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.OPEN_PAGE],
    value: OPEN_ACTION.OPEN_PAGE,
    subField: OPEN_ACTION.SUB_OPEN_PAGE,
  },
  { label: OPEN_ACTION_LABEL[OPEN_ACTION.RR_SCREEN], value: OPEN_ACTION.RR_SCREEN },
  { label: OPEN_ACTION_LABEL[OPEN_ACTION.SUBMIT], value: OPEN_ACTION.SUBMIT },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.DEEPLINK],
    value: 'Deeplink',
    subField: OPEN_ACTION.SUB_DEEPLINK,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.URL],
    value: 'URL',
    subField: OPEN_ACTION.SUB_URL,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.SUBSCRIPTION],
    value: 'Subscription',
    subField: OPEN_ACTION.SUB_SUBSCRIPTION,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.PURCHASE],
    value: 'Purchase',
    subField: OPEN_ACTION.SUB_PURCHASE,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.BUTTON_TRIGGER],
    value: OPEN_ACTION.BUTTON_TRIGGER,
    subField: OPEN_ACTION.SUB_PURCHASE_TRIGGER,
  },
];

export const RadioActionOptions = [
  { label: OPEN_ACTION_LABEL[OPEN_ACTION.PURCHASE_TRIGGER], value: OPEN_ACTION.PURCHASE_TRIGGER },
];

export const NPSButtonActionOptions = [
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.OPEN_PAGE],
    value: OPEN_ACTION.OPEN_PAGE,
    subField: OPEN_ACTION.SUB_OPEN_PAGE,
  },
  {
    label: OPEN_ACTION_LABEL[OPEN_ACTION.SEND_ANALYTICS],
    value: OPEN_ACTION.SEND_ANALYTICS,
    subField: OPEN_ACTION.SUB_SEND_ANALYTICS,
  },
  { label: OPEN_ACTION_LABEL[OPEN_ACTION.SUBMIT], value: OPEN_ACTION.SUBMIT },
  { label: OPEN_ACTION_LABEL[OPEN_ACTION.CLOSE_SCREEN], value: OPEN_ACTION.CLOSE_SCREEN },
];

export const actionResultOptions = [
  { label: 'Cancel', value: 'cancel' },
  { label: 'Deeplink/Url', value: 'open_url', subField: 'Deeplink/Url' },
];

export const NEW_CAMPAIGN_STEPS = ['Name & Type', 'Settings', 'Targeting'];

export const DEVICE_STATUS = {
  OK: 'ok',
  ERROR: 'error',
};

export const inAppDeliveryTooltip = 'You can select how many times you want to show '
  + 'your campaign. ‘Repeat‘ is for cyclical repeated impressions '
  + 'of the campaign. ‘Show once‘ is for a single impression '
  + 'of the campaign. ‘Custom’ is for a non-cyclical '
  + 'repeated campaign with specific event settings.';

export const SUPPORTED_CAMPAIGNS = [
  campaignType.inAppHTML,
  campaignType.inAppDeeplink,
  campaignType.inAppSubScreen,
  campaignType.inAppRateReview,
  campaignType.inAppHoustonRedistribute,
  campaignType.inAppInterstitials,
  campaignType.pushScheduled,
  campaignType.pushTriggeredSessionEnd,
  campaignType.pushTriggeredCancelPaid,
  campaignType.pushTriggeredCancelTrail,
];

export const CAMPAIGNS_WITH_LANGUAGES = [
  campaignType.inAppHTML,
  campaignType.pushScheduled,
  campaignType.pushTriggeredSessionEnd,
  campaignType.pushTriggeredCancelPaid,
  campaignType.pushTriggeredCancelTrail,
];

export const MESSAGE_TYPE = {
  SYSTEM_ALERT: 'repeated',
  ACTION_SHEET: 'action sheet',
  MULTI_MESSAGE: 'multi message',
  HTML: 'HTML',
  OTHER: 'other',
};

export const MESSAGE_TYPE_ENUM = {
  [MESSAGE_TYPE.SYSTEM_ALERT]: 'TYPE_IN_APP_CUSTOM',
  [MESSAGE_TYPE.ACTION_SHEET]: 'TYPE_ACTION_SHEET',
  [MESSAGE_TYPE.MULTI_MESSAGE]: 'TYPE_MULTI_MESSAGE',
  [MESSAGE_TYPE.HTML]: 'TYPE_IN_APP_HTML',
  [MESSAGE_TYPE.OTHER]: 'TYPE_OTHER',
};

export const STATUS_ENUM = {
  STATUS_ACTIVE: 'active',
  STATUS_DRAFT: 'draft',
  STATUS_STOPPED: 'stopped',
  STATUS_ARCHIVED: 'archived',
};

export const STATUS = {
  ACTIVE: 'STATUS_ACTIVE',
  DRAFT: 'STATUS_DRAFT',
  STOPPED: 'STATUS_STOPPED',
  ARCHIVED: 'STATUS_ARCHIVED',
};

export const DEFAULT_PUSH_LANGUAGES = {
  en: [
    {
      name: 'Variant 1',
      ...DEFAULT_PUSH_LANGUAGE_CONTENT(),
    },
  ],
};

export const MAX_VARIANTS = 4;

export const PUSH_CAMPAIGNS = [
  campaignType.pushScheduled,
  campaignType.pushTriggeredSessionEnd,
  campaignType.pushTriggeredCancelTrail,
  campaignType.pushTriggeredCancelPaid,
];
