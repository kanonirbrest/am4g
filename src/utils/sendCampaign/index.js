import { wrapField } from 'utils/htmlUtils';
import { campaignType } from 'components/constants';
import getPushScheduledTriggering from 'utils/sendCampaign/triggering/push';
import getTargeting from 'utils/sendCampaign/targeting';
import getInAppCustomTriggering from 'utils/sendCampaign/triggering/inApp';
import getInIntersTriggering from 'utils/sendCampaign/triggering/inAppInters';
import { getLangScreen } from 'utils/lang';
import { DEVICE_CONTROL } from 'utils/constants';
import { OPEN_ACTION } from '../constants/campaign';

export const defaultLimit = 10;

const getTags = (type, step2) => {
  const tags = [];

  if (type === campaignType.inAppHTML) {
    const isNps = !!step2.languages[0].fields
      .find((f) => f.type === DEVICE_CONTROL.NPS_SLIDER);
    const isFeedback = !!step2.languages[0].fields
      .find((f) => f.type === DEVICE_CONTROL.FEEDBACK);
    const isPurchase = !!step2.languages[0].fields
      .find((f) => {
        if (f.type === DEVICE_CONTROL.BUTTON) {
          return (f.actions || []).filter(((a) => a.action === OPEN_ACTION.PURCHASE))
            .length >= 0;
        }

        return false;
      });

    if (isNps) {
      tags.push('nps');
    }
    if (isFeedback) {
      tags.push('feedback');
    }
    if (isPurchase) {
      // to handle statistic
      tags.push('purchase');
    }
  }

  return tags;
};

export const getStep2 = (step2, type, allProducts) => {
  switch (type) {
    case campaignType.inAppHTML: {
      const {
        htmlView,
        languages,
        background,
        backgroundColor,
        backgroundValue,
        backgroundFile,
        backgroundPosition,
        isSendMessage,
        backgroundObjectFit,
        sendEnglish,
        layout,
        pages,
        triggering,
        products,
      } = step2;
      const clearHtmlView = wrapField(htmlView, type, languages, pages);

      const translatedLanguages = languages.map((
        language,
      ) => ({
        ...language,
        htmlView: getLangScreen(clearHtmlView, type,
          language, allProducts),
      }));

      return {
        triggering: getInAppCustomTriggering(triggering),
        settings: {
          version: '2.0',
          htmlView: translatedLanguages[0].htmlView,
          languages: translatedLanguages,
          background: {
            backgroundColor,
            backgroundValue,
            backgroundFile,
            background,
            backgroundObjectFit,
            backgroundPosition,
          },
          isSendMessage,
          sendEnglish,
          layout,
          pages: pages.map((p) => ({
            ...p,
            isEditDisabled: true,
          })),
          products,
        },
      };
    }
    case campaignType.inAppDeeplink: {
      const {
        deepLink,
        triggering,
      } = step2;

      return {
        triggering: getInAppCustomTriggering(triggering),
        settings: {
          deepLink,
        },
      };
    }
    case campaignType.inAppSubScreen: {
      const {
        subscription_screen_id,
        triggering,
      } = step2;

      return {
        triggering: getInAppCustomTriggering(triggering),
        settings: {
          subscription_screen_id,
        },
      };
    }
    case campaignType.inAppRateReview: {
      return {
        triggering: getInAppCustomTriggering(step2.triggering),
      };
    }
    case campaignType.inAppHoustonRedistribute: {
      return {
        triggering: getInAppCustomTriggering(step2.triggering),
      };
    }
    case campaignType.inAppInterstitials: {
      return {
        triggering: getInIntersTriggering(step2.triggering),
        settings: {
          inters: step2.inters,
        },
      };
    }

    case campaignType.pushTriggeredCancelPaid:
    case campaignType.pushTriggeredSessionEnd:
    case campaignType.pushTriggeredCancelTrail: {
      return {
        settings: {
          messages: step2.languages,
          deepLink: step2.deepLink,
          pushConsent: step2.pushConsent,
          drawBadge: step2.drawBadge,
          fallbackOtherToEn: step2.fallbackOtherToEn,
        },
        triggering: {
          hasEventParams: [],
          isShowTriggerOnce: false,
        },
      };
    }

    case campaignType.pushScheduled: {
      return {
        settings: {
          schedule: getPushScheduledTriggering(step2.schedule),
          messages: step2.languages,
          deepLink: step2.deepLink,
          pushConsent: step2.pushConsent,
          drawBadge: step2.drawBadge,
          fallbackOtherToEn: step2.fallbackOtherToEn,
        },
        triggering: {
          hasEventParams: [],
          isShowTriggerOnce: false,
        },
      };
    }

    default:
      return {};
  }
};

export default (values, activeApplication, allProducts) => {
  const {
    step1: {
      type, name,
    },
    step2,
    step3: { filters, additionalFilters },
    preservedFields,
  } = values;
  const extraFields = [
    campaignType.pushScheduled,
    campaignType.pushTriggeredSessionEnd,
    campaignType.pushTriggeredCancelPaid,
    campaignType.pushTriggeredCancelTrail,
  ].includes(type)
    ? { limitPerDevice: step2.limitPerDevice } : {};

  return {
    application: activeApplication.id,
    name,
    type,
    tags: getTags(type, step2) || [],
    ...getStep2(step2, type, allProducts),
    targeting: {
      ...preservedFields,
      ...getTargeting(filters, values),
      ...getTargeting(additionalFilters, values, true),
      ...extraFields,
    },
  };
};
