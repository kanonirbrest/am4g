import React from 'react';

import { getIconByType } from 'utils/campaignUtils';
import { CAMPAIGN_TYPE } from 'utils/constants/campaign';
import {
  Email, InApp, Multi, Push,
} from 'routes/Application/NewCampaign/Stepper/Step1/Tabs';
import { campaignType } from 'components/constants';

export const getTabContentByType = (type, props) => {
  switch (type) {
    case CAMPAIGN_TYPE.IN_APP:
    case campaignType.inAppCustom:
    case campaignType.inAppHTML:
    case campaignType.inAppDeeplink:
    case campaignType.inAppRateReview:
    case campaignType.inAppSubScreen:
    case campaignType.inAppHoustonRedistribute:
    case campaignType.inAppInterstitials:

      return <InApp type={type} {...props} />;
    case CAMPAIGN_TYPE.PUSH:
    case campaignType.pushScheduled:
    case campaignType.pushTriggeredCancelPaid:
    case campaignType.pushTriggeredCancelTrail:
    case campaignType.pushTriggeredSessionEnd:

      return <Push type={type} {...props} />;
    case CAMPAIGN_TYPE.EMAIL:
    case campaignType.emailTriggered:
    case campaignType.emailScheduled:
    case campaignType.emailCancelPaid:
    case campaignType.emailCancelTrail:
    case campaignType.emailTriggeredWithDelay:

      return <Email type={CAMPAIGN_TYPE.EMAIL} {...props} />;
    case CAMPAIGN_TYPE.MULTI:
    case campaignType.pushTriggered:
    case campaignType.multiCustom:
    case campaignType.pushTriggeredClosedScreen:

      return <Multi type={CAMPAIGN_TYPE.MULTI} {...props} />;

    default:
      return null;
  }
};

export const tabsConfig = [{
  tabValue: CAMPAIGN_TYPE.PUSH,
  tabValues: [campaignType.pushTriggeredSessionEnd,
    campaignType.pushTriggeredCancelTrail, campaignType.pushTriggeredCancelPaid],
  label: 'Push Campaigns',
  icon: getIconByType(campaignType.pushScheduled),
}, {
  tabValue: CAMPAIGN_TYPE.IN_APP,
  tabValues: [campaignType.inAppHTML,
    campaignType.inAppCustom, campaignType.inAppDeeplink, campaignType.inAppRateReview,
    campaignType.inAppSubScreen, campaignType.inAppHoustonRedistribute,
    campaignType.inAppInterstitials],
  label: 'InApp Campaigns',
  icon: getIconByType(campaignType.inAppHTML),
}, {
  tabValue: CAMPAIGN_TYPE.MULTI,
  label: 'Multi Campaigns',
  icon: getIconByType(campaignType.multiCustom),
}, {
  tabValue: CAMPAIGN_TYPE.EMAIL,
  label: 'Email Campaigns',
  icon: getIconByType(campaignType.emailTriggered),
}];
