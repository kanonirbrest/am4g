import React from 'react';

import InAppCustom
  from 'routes/Application/NewCampaign/Stepper/Step2/InApp/Custom';
import Push from 'routes/Application/NewCampaign/Stepper/Step2/Push';
import { campaignType } from 'components/constants';
import InAppDeeplink from './InApp/Deeplink';
import InAppSubScreen from './InApp/SubScreen';
import InAppHoustonRedistribute from './InApp/HoustonRedistribute';
import InAppRateReview from './InApp/RateReview';
import InAppInterstitials from './InApp/Interstitials';
import Stopgap from './Stopgap';

const getTabContentByType = (type, props) => {
  switch (type) {
    case campaignType.inAppHTML:
      return <InAppCustom {...props} />;
    case campaignType.inAppDeeplink:
      return <InAppDeeplink {...props} />;
    case campaignType.inAppSubScreen:
      return <InAppSubScreen {...props} />;
    case campaignType.inAppHoustonRedistribute:
      return <InAppHoustonRedistribute {...props} />;
    case campaignType.inAppRateReview:
      return <InAppRateReview {...props} />;
    case campaignType.inAppInterstitials:
      return <InAppInterstitials {...props} />;
    case campaignType.pushScheduled:
    case campaignType.pushTriggeredSessionEnd:
    case campaignType.pushTriggeredCancelTrail:
    case campaignType.pushTriggeredCancelPaid:
      return <Push {...props} type={type} />;

    default:
      return <Stopgap />;
  }
};
export default getTabContentByType;
