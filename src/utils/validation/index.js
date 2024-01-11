import * as Yup from 'yup';

import { campaignType } from 'components/constants';
import InAppHTML from 'utils/validation/Step2/InApp/HTML';
import InAppDeeplink from 'utils/validation/Step2/InApp/Deeplink';
import InAppSubScreen from 'utils/validation/Step2/InApp/SubScreen';
import PushScheduled from 'utils/validation/Step2/PushScheduled';
import PushTriggered from 'utils/validation/Step2/PushTriggered';
import Step1 from 'utils/validation/Step1';
import Step3 from 'utils/validation/Step3';
import InAppRateReview from 'utils/validation/Step2/InApp/RateReview';
import InAppInterstitials from 'utils/validation/Step2/InApp/Interstitials';

const getSchemaByType = (type) => {
  switch (type) {
    case campaignType.inAppHTML:
      return InAppHTML;

    case campaignType.inAppDeeplink:
      return InAppDeeplink;

    case campaignType.inAppSubScreen:
      return InAppSubScreen;

    case campaignType.inAppHoustonRedistribute:
    case campaignType.inAppRateReview:
      return InAppRateReview;

    case campaignType.inAppInterstitials:
      return InAppInterstitials;

    case campaignType.pushScheduled:
      return PushScheduled;

    case campaignType.pushTriggered:
    case campaignType.pushTriggeredCancelTrail:
    case campaignType.pushTriggeredSessionEnd:
    case campaignType.pushTriggeredClosedScreen:
      return PushTriggered;

    default:
      return Yup.object();
  }
};

// eslint-disable-next-line import/prefer-default-export
export const getSchema = (step, type) => {
  switch (step) {
    case 0:
      return Step1;

    case 1:
      return getSchemaByType(type);

    case 2:
      return Step3;

    default:
      return Yup.object();
  }
};
