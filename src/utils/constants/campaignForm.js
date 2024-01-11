import React from 'react';
import { campaignType } from 'components/constants';
import { DEFAULT_PUSH_LANGUAGES } from 'utils/constants/campaign';
import { targetingFilters } from 'utils/targetingConfig';
import { v4 as uuidv4 } from 'uuid';
import { SHOW_END_DATE } from 'utils/constants/triggering';
import { ReactComponent as IcHeightHug } from 'assets/icons/IcHeightHug.svg';
import { ReactComponent as IcHeight } from 'assets/icons/IcHeight.svg';
import { DEFAULT_RADIO_OFFER_ITEM } from '../RadioWidget/constant';

export const IN_APP_CUSTOM_TYPE = {
  REPEATED: 'repeated',
  SHOW_ONCE: 'show_once',
  CUSTOM: 'custom',
};

export const NEW_CAMP_CONTROLS = {
  TYPE: 'type',
  SUB_TYPE: 'subType',
  NAME: 'name',
  SCHEDULE_TYPE: 'sheduleType',
  CONTENT_TYPE: 'contentType',
  ACTIONS: 'actions',
  LANGUAGES: 'languages',
  IS_SEND_MESSAGE: 'isSendMessage',
  TRIGGER: 'trigger',
  REPEAT: 'repeat',
  START: 'start',
  EVERY: 'every',
  SHOW_ONCE_FROM: 'showOnceFrom',
  REPEAT_OPTIONS: 'repeatOptions',
  LIMIT: 'limit',
  BACKGROUND: 'background',
  BACKGROUND_VALUE: 'backgroundValue',
  BACKGROUND_COLOR: 'backgroundColor',
  BACKGROUND_POSITION: 'backgroundPosition',
  BACKGROUND_OBJECT_FIT: 'backgroundObjectFit',
};
const inAppTriggering = {
  trigger: '',
  isShowTriggerOnce: false,
  type: IN_APP_CUSTOM_TYPE.REPEATED,
  repeatOptions: {
    start: 1,
    every: 1,
    showOnceFrom: '',
  },
  startCountEventsSince: null,
  startCountEventsSinceCampaignLaunch: null,
  perSession: null,
  perPeriodCount: null,
  perPeriodType: null,
  isShowEndDate: SHOW_END_DATE.NO,
  dateStart: null,
  dateEnd: null,
  timeInterval: null,
  limit: null,
  custom: [],
  hasEventParams: [],
};
export const defaultEng = { name: 'English', locale: 'en', fields: [] };
export const defaultPage = { index: 1, name: 'Page 1', uuid: uuidv4() };
/* because of html campaign is initial when we open step1
* after that when we change type we update step2 fields
* using getStep2InitialValues */
export const inAppHTMLInitialValues = {
  step1: {
    [NEW_CAMP_CONTROLS.NAME]: '',
    [NEW_CAMP_CONTROLS.TYPE]: 'TYPE_IN_APP_HTML',
  },
  step2: {
    triggering: inAppTriggering,
    [NEW_CAMP_CONTROLS.SCHEDULE_TYPE]: 'InApp',
    [NEW_CAMP_CONTROLS.CONTENT_TYPE]: 'OpenApp',
    [NEW_CAMP_CONTROLS.LANGUAGES]: [defaultEng],
    [NEW_CAMP_CONTROLS.BACKGROUND]: 'color',
    pages: [defaultPage],
    [NEW_CAMP_CONTROLS.BACKGROUND_COLOR]: 'rgba(255,255,255,1)',
    [NEW_CAMP_CONTROLS.BACKGROUND_OBJECT_FIT]: 'Original',
    products: {},
  },
  step3: {
    filters: ['subscriptionStatus'],
    additionalFilters: [],
    subscriptionStatus: {
      ...targetingFilters.subscriptionStatus.defaultValues(),
    },
  },
};
export const getStep2InitialValues = (type) => {
  switch (type) {
    case campaignType.inAppHTML:
      return {
        triggering: inAppTriggering,
        [NEW_CAMP_CONTROLS.SCHEDULE_TYPE]: 'InApp',
        [NEW_CAMP_CONTROLS.CONTENT_TYPE]: 'OpenApp',
        [NEW_CAMP_CONTROLS.LANGUAGES]: [defaultEng],
        pages: [defaultPage],
        [NEW_CAMP_CONTROLS.BACKGROUND]: 'color',
        [NEW_CAMP_CONTROLS.BACKGROUND_COLOR]: 'rgba(255,255,255,1)',
        [NEW_CAMP_CONTROLS.BACKGROUND_OBJECT_FIT]: 'Original',
      };

    case campaignType.inAppDeeplink:
      return {
        triggering: inAppTriggering,
        deepLink: '',
      };
    case campaignType.inAppSubScreen:
      return {
        triggering: inAppTriggering,
        subscription_screen_id: '',
      };
    case campaignType.inAppRateReview:
    case campaignType.inAppHoustonRedistribute:
      return {
        triggering: inAppTriggering,
      };
    case campaignType.inAppInterstitials:
      return {
        inters: {
          type: 'cached',
          spots: [],
          is_interval_context_global: false,
        },
        triggering: {
          repeatOptions: {
            start: 1,
            every: 1,
          },
          perSession: null,
          startCountEventsSince: null,
          startCountEventsSinceCampaignLaunch: null,
          timeInterval: null,
          limit: null,
          perPeriodCount: null,
          perPeriodType: null,
          isShowEndDate: SHOW_END_DATE.NO,
          dateStart: null,
          dateEnd: null,
        },
      };

    case campaignType.pushScheduled:
    case campaignType.pushTriggered:
    case campaignType.pushTriggeredSessionEnd:
    case campaignType.pushTriggeredCancelTrail:
    case campaignType.pushTriggeredCancelPaid:
      return {
        schedule: {
          type: 'once',
          sendNow: true,
          time: null,
          daysOfWeek: [],
          endingDate: null,
          endingType: 'never',
          everyNTerm: 1,
          daysOfMonth: [],
          beginningDate: new Date(),
          endingAfterNOccur: null,
        },
        languages: DEFAULT_PUSH_LANGUAGES,
        deepLink: '',
        openAction: 'open_app',
        drawBadge: false,
        pushConsent: false,
        limitPerDevice: type === campaignType.pushScheduled ? null : 1,
      };

    default:
      return {};
  }
};

export const MAX_SHOW_TABS = 4;

export const borderSizeOptions = ['1', '2', '3', '4', '5'];

export const DEFAULT_RADIO = {
  buttonList: [{
    text: [
      {
        ...DEFAULT_RADIO_OFFER_ITEM,
        id: uuidv4(),
      },
    ],
    isSelected: false,
    id: uuidv4(),
    actionValue: {
      product: '',
    }, /* purchase value for each button */
    darkBackground: false,
  }],
};
export const TEMPLATE_VIEW = {
  DEFAULT: 'default',
};
export const RADIO_ICON = {
  DEFAULT: 'default',
};
export const TEMPLATE_OPTIONS = [
  { label: 'Universal Template', value: TEMPLATE_VIEW.DEFAULT },
];
export const ICON_TYPE_OPTIONS = [
  { label: 'Default', value: RADIO_ICON.DEFAULT },
];
export const ICON_SIZE_OPTIONS = [
  { label: 24, value: 24 },
  { label: 40, value: 40 },
];
export const RADIO_HEIGHT_TYPE_OPTIONS = [
  {
    label: 'Fixed',
    value: 'fixed',
    icon: () => <IcHeight />,
  },
  { label: 'Hug content', value: 'huge', icon: () => <IcHeightHug /> },
];
