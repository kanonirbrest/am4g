import { campaignType } from 'components/constants';
import { CAMPAIGN_TYPE } from 'utils/constants/campaign';

const CAMPAIGN_TYPE_OPTIONS = {
  [CAMPAIGN_TYPE.IN_APP]: [{
    label: 'Rate Review',
    value: campaignType.inAppRateReview,
  }, {
    label: 'Deeplink',
    value: campaignType.inAppDeeplink,
  }, {
    label: 'HTML',
    value: campaignType.inAppHTML,
  }, {
    label: 'Subscription screen',
    value: campaignType.inAppSubScreen,
  }, {
    label: 'Houston redistribute',
    value: campaignType.inAppHoustonRedistribute,
  }, {
    label: 'Interstitials',
    value: campaignType.inAppInterstitials,
  }, {
    label: 'Custom',
    value: campaignType.inAppCustom,
  }],
  [CAMPAIGN_TYPE.EMAIL]: [
    {
      label: 'Triggered',
      value: campaignType.emailTriggered,
    }, {
      label: 'Triggered With Delay',
      value: campaignType.emailTriggeredWithDelay,
    }, {
      label: 'Scheduled',
      value: campaignType.emailScheduled,
    }, {
      label: 'Trial Cancelled',
      value: campaignType.emailCancelTrail,
    }, {
      label: 'Paid Cancelled',
      value: campaignType.emailCancelPaid,
    },
  ],
  [CAMPAIGN_TYPE.PUSH]: [{
    label: 'Scheduled',
    value: campaignType.pushScheduled,
  }, {
    label: 'Triggered',
    value: campaignType.pushTriggeredSessionEnd,
    values: [
      {
        value: campaignType.pushTriggeredSessionEnd,
        label: 'Session End',
      },
      {
        value: campaignType.pushTriggeredCancelTrail,
        label: 'Cancel Trail',
      },
      {
        value: campaignType.pushTriggeredCancelPaid,
        label: 'Cancel Paid',
      },
    ],
  }],
  [CAMPAIGN_TYPE.MULTI]: [
    {
      label: 'Cancel Survey',
      value: campaignType.pushTriggered,
    }, {
      label: '1st SubScreen Close Offer',
      value: campaignType.pushTriggeredClosedScreen,
    }, {
      label: 'Custom',
      value: campaignType.multiCustom,
    },
  ],
};

export default CAMPAIGN_TYPE_OPTIONS;
