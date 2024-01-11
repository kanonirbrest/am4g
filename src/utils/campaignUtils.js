import InApp from 'assets/icons/InApp';
import Push from 'assets/icons/Push';
import Email from 'assets/icons/Email';
import Multi from 'assets/icons/Multi';
import { CAMPAIGN_TYPE_LABEL, campaignType } from 'components/constants';
import CAMPAIGN_TYPE_OPTIONS
  from 'routes/Application/NewCampaign/Stepper/Step1/Tabs/constant';
import {
  MESSAGE_TYPE,
  MESSAGE_TYPE_ENUM,
  CAMPAIGN_TYPE,
} from './constants/campaign';

const allCampaignTypes = Object.values(CAMPAIGN_TYPE_OPTIONS).reduce(
  (previousValue, currentValue) => {
    const subItems = currentValue.reduce(
      (pr, c) => pr.concat(c.values || []),
      [],
    );

    return previousValue.concat([...currentValue, ...subItems]);
  },
  [],
);

export const getCampaignLabel = (type) => {
  const index = allCampaignTypes
    .findIndex((item) => item.value === type || item === type);

  if (index < 0) {
    return CAMPAIGN_TYPE_LABEL[type];
  }

  return allCampaignTypes[index].label;
};
const checkSubTypes = (item, input) => item.values && item.values
  .map((i) => i.value).includes(input);
export const getCampaignTypeLabel = (inputType) => {
  let label;
  Object.keys(CAMPAIGN_TYPE_OPTIONS).forEach((type) => {
    if (CAMPAIGN_TYPE_OPTIONS[type].find((
      (item) => (item.value === inputType) || checkSubTypes(item, inputType)))
    ) {
      label = type;
    }
  });

  return CAMPAIGN_TYPE_LABEL[`TYPE_${label}`];
};

export const getCampaignType = (inputType) => {
  let label;
  Object.keys(CAMPAIGN_TYPE_OPTIONS)
    .forEach((type) => {
      if (CAMPAIGN_TYPE_OPTIONS[type].find((
        (item) => item.value === inputType || (item.values && item.values.find(
          (i) => i.value === inputType,
        ))))
      ) {
        label = type;
      }
    });

  return CAMPAIGN_TYPE[label];
};

export const getCampaignListByType = (type) => CAMPAIGN_TYPE_OPTIONS[type]
  .reduce(
    (pr, c) => pr.concat(c.values || [c]),
    [],
  );

export const getIconByType = (type) => {
  switch (true) {
    case CAMPAIGN_TYPE_OPTIONS[CAMPAIGN_TYPE.EMAIL]
      .map((l) => l.value)
      .includes(type):
      return Email;

    case CAMPAIGN_TYPE_OPTIONS[CAMPAIGN_TYPE.IN_APP]
      .map((l) => l.value)
      .includes(type):
      return InApp;

    case getCampaignListByType(CAMPAIGN_TYPE.PUSH)
      .map((l) => l.value)
      .includes(type):
      return Push;

    case CAMPAIGN_TYPE_OPTIONS[CAMPAIGN_TYPE.MULTI]
      .map((l) => l.value)
      .includes(type):
      return Multi;

    default: {
      return InApp;
    }
  }
};

export const CAMPAIGN_TYPE_DESCRIPTION = {
  [campaignType.emailTriggered]:
       'Email is sent at the moment when an event occurs.',
  [campaignType.emailTriggeredWithDelay]:
       'Email is sent with delay after the moment when an event occurs.',
  [campaignType.pushScheduled]:
       'Send push notification according to the timetable or immediately.',
  [campaignType.emailScheduled]:
       'You can set up Email notification that '
          + 'will be sent according to the calendar.',
  [campaignType.pushTriggeredSessionEnd]:
      'Send push notification at the moment when an event occurs.',
  [campaignType.pushTriggeredCancelTrail]:
      'Send push notification at the moment when an event occurs.',
  [campaignType.pushTriggeredCancelPaid]:
      'Send push notification at the moment when an event occurs.',
  [campaignType.inAppDeeplink]:
       'Create a campaign with a direct link to'
          + ' a specific location inside o`r outside the app.',
  [campaignType.multiCustom]:
       'Combine yourself any type of Push campaign with any InApp campaign.',
  [campaignType.inAppCustom]:
       'Show a message with an offer to take a survey, tell '
          + 'about a new feature, etc.',
  [campaignType.inAppHTML]:
       'Create any campaign like system alert, action sheet, '
          + 'or any custom screen with the help of HTML builder.',
  [campaignType.inAppSubScreen]:
      'Create a campaign with a screen ID to any subscription screen you′ve '
      + 'created in the app. The screen id must be added to '
      + 'subscription screen by developer.',
  [campaignType.inAppRateReview]:
  'Create a review request campaign to ask users to rate your app.',
  [campaignType.inAppHoustonRedistribute]:
      'Create a campaign to set up the audience for Houston tests on existing users.',
  [campaignType.inAppInterstitials]:
      'Create a campaign with cached or instant full-screen '
       + 'ads that cover the interface of their app.',
  TYPE_PUSH_TRIGGERED_CLOSED_START_SCREEN:
       'Users get a push if they closed an app while on the first '
          + 'subscription screen. Send a push and show a screen with a '
          + 'unique offer at the next start.',
  [campaignType.pushTriggered]:
       'Users get a push at the moment when they canceled a '
          + 'trial or paid subscription. At the next start we ask the '
          + 'reason for cancellation and show a relevant offer.',
};

export const getSubTypeInitialValue = (type) => CAMPAIGN_TYPE_OPTIONS[type][0].value;

export const getObjectFitValue = (value) => {
  switch (value) {
    case 'fitIn':
      return 'contain';

    case 'fitOut':
      return 'cover';

    default:
      return null;
  }
};

export const getDefaultASValues = (type) => {
  switch (type) {
    case 'ASTitle':

      return {
        title: '',
        message: '',
        type: 'ASTitle',
      };

    case 'action':

      return {
        fontWeight: 'bold',
        result: '',
        title: 'Action',
        color: '#4675C0',
        type: 'action',
      };

    case 'cancel':

      return {
        fontWeight: 'normal',
        result: 'cancel',
        title: 'Cancel',
        color: '#4675C0',
        type: 'cancel',
      };

    default:
      return null;
  }
};

export const getDefaultFields = (type) => {
  switch (type) {
    case MESSAGE_TYPE_ENUM[MESSAGE_TYPE.HTML]:

      return [];
    case MESSAGE_TYPE_ENUM[MESSAGE_TYPE.ACTION_SHEET]:

      return [getDefaultASValues('action'), getDefaultASValues('cancel')];

    default:
      return [];
  }
};

export const getDefaultStyles = (type) => {
  switch (type) {
    case MESSAGE_TYPE_ENUM[MESSAGE_TYPE.ACTION_SHEET]:

      return { backgroundColor: '#8D95A9', background: 'color' };

    case MESSAGE_TYPE_ENUM[MESSAGE_TYPE.HTML]:

      return { backgroundColor: 'rgba(255,255,255,1)', background: 'color' };
    default:
      return {};
  }
};

export const getFieldByKey = (data, key) => {
  const foundItem = data.find((item) => item.key === key);

  return foundItem?.value;
};
