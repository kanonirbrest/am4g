import { getFieldByKey, getCampaignType } from 'utils/campaignUtils';
import { getDateFromString, getDateTimeFromString }
  from 'utils/dateUtils';
import { campaignType } from 'components/constants';
import { IN_APP_CUSTOM_TYPE } from 'utils/constants/campaignForm';
import { DEFAULT_PUSH_LANGUAGES } from 'utils/constants/campaign';
import { additionalTargetingFilters, targetingFilters } from 'utils/targetingConfig';
import { SHOW_END_DATE } from 'utils/constants/triggering';

const defaultRepeatOptions = {
  showOnceFrom: '',
  start: 1,
  every: 1,
};

export const getInAppFormValuesForTrigger = (triggering, isShowTriggerOnce) => {
  const hasEventCount = getFieldByKey(triggering, 'hasEventCount');
  const repeatOptions = getFieldByKey(triggering, 'repeatOptions');
  const dateStart = getFieldByKey(triggering, 'dateStart');
  const dateEnd = getFieldByKey(triggering, 'dateEnd');
  const trigger = getFieldByKey(triggering, 'trigger');
  const isShowEndDate = getFieldByKey(triggering, 'isShowEndDate');
  const startCountEventsSince = getFieldByKey(triggering, 'startCountEventsSince');
  const startCountEventsSinceCampaignLaunch = getFieldByKey(
    triggering, 'startCountEventsSinceCampaignLaunch',
  );

  if (isShowTriggerOnce) {
    return {
      trigger: hasEventCount[0].name,
      repeatOptions: {
        ...defaultRepeatOptions,
        showOnceFrom: hasEventCount[0].val,
      },
      type: IN_APP_CUSTOM_TYPE.SHOW_ONCE,
      custom: [],
      dateStart: dateStart ? new Date(dateStart) : null,
      dateEnd: dateEnd ? new Date(dateEnd) : null,
      isShowEndDate: isShowEndDate || SHOW_END_DATE.NO,
      startCountEventsSince,
      startCountEventsSinceCampaignLaunch: startCountEventsSinceCampaignLaunch
        || false,
    };
  }

  const perSession = getFieldByKey(triggering, 'perSession');
  const perPeriodCount = getFieldByKey(triggering, 'perPeriodCount');
  const perPeriodType = getFieldByKey(triggering, 'perPeriodType');
  const limit = getFieldByKey(triggering, 'limit');
  const timeInterval = getFieldByKey(triggering, 'timeInterval');
  if (hasEventCount) {
    return {
      trigger: hasEventCount[0].name,
      custom: hasEventCount.map((it) => it.val),
      type: IN_APP_CUSTOM_TYPE.CUSTOM,
      perSession: perSession || null,
      perPeriodCount: perPeriodCount || null,
      perPeriodType: perPeriodType || null,
      isShowEndDate: isShowEndDate || SHOW_END_DATE.NO,
      dateStart: dateStart ? new Date(dateStart) : null,
      dateEnd: dateEnd ? new Date(dateEnd) : null,
      repeatOptions: {
        ...repeatOptions || defaultRepeatOptions,
      },
      limit: limit || null,
      startCountEventsSince,
      startCountEventsSinceCampaignLaunch: startCountEventsSinceCampaignLaunch
        || false,
    };
  }

  if (repeatOptions) {
    return {
      trigger,
      repeatOptions: {
        ...repeatOptions,
        every: repeatOptions.every + 1, // workaround BE issue
        showOnceFrom: '',
      },
      type: IN_APP_CUSTOM_TYPE.REPEATED,
      custom: [],
      perSession: perSession || null,
      perPeriodCount: perPeriodCount || null,
      perPeriodType: perPeriodType || null,
      isShowEndDate: isShowEndDate || SHOW_END_DATE.NO,
      dateStart: dateStart ? new Date(dateStart) : null,
      dateEnd: dateEnd ? new Date(dateEnd) : null,
      timeInterval: timeInterval || null,
      limit: limit || null,
      startCountEventsSince,
      startCountEventsSinceCampaignLaunch: startCountEventsSinceCampaignLaunch
        || false,
    };
  }

  return {
    trigger: hasEventCount[0].name,
    custom: hasEventCount.map((it) => it.val),
    type: IN_APP_CUSTOM_TYPE.CUSTOM,
    repeatOptions: defaultRepeatOptions,
    limit: limit || null,
  };
};
export const formatSchedule = (schedule) => ({
  ...schedule,
  endingDate: getDateFromString(schedule.endingDate),
  beginningDate: getDateTimeFromString(schedule.beginningDate, schedule.time),
});
const getStep2FormValuesFromPayload = (campaign, type) => {
  switch (type) {
    case campaignType.inAppHTML: {
      const isShowTriggerOnce = getFieldByKey(campaign.triggering, 'isShowTriggerOnce')
        || false;

      return {
        languages: getFieldByKey(campaign.settings, 'languages'),
        triggering: {
          ...getInAppFormValuesForTrigger(campaign.triggering,
            isShowTriggerOnce),
          isShowTriggerOnce,
          hasEventParams: getFieldByKey(campaign.triggering, 'hasEventParams') || [],
        },
        background: getFieldByKey(campaign.settings, 'background')?.background,
        backgroundColor: getFieldByKey(campaign.settings, 'background')?.backgroundColor,
        backgroundValue: getFieldByKey(campaign.settings, 'background')?.backgroundValue,
        backgroundFile: getFieldByKey(campaign.settings, 'background')?.backgroundFile,
        backgroundPosition:
          getFieldByKey(campaign.settings, 'background')?.backgroundPosition,
        backgroundObjectFit:
          getFieldByKey(campaign.settings, 'background')?.backgroundObjectFit,
        isSendMessage: getFieldByKey(campaign.settings, 'isSendMessage'),
        pages: getFieldByKey(campaign.settings, 'pages'),
        sendEnglish: getFieldByKey(campaign.settings, 'sendEnglish'),
        layout: getFieldByKey(campaign.settings, 'layout'),
        products: getFieldByKey(campaign.settings, 'products') || {},
      };
    }
    case campaignType.inAppDeeplink: {
      const isShowTriggerOnce = getFieldByKey(campaign.triggering, 'isShowTriggerOnce')
        || false;

      return {
        triggering: {
          ...getInAppFormValuesForTrigger(campaign.triggering,
            isShowTriggerOnce),
          isShowTriggerOnce,
          hasEventParams: getFieldByKey(campaign.triggering, 'hasEventParams') || [],
        },
        deepLink: getFieldByKey(campaign.settings, 'deepLink'),
      };
    }
    case campaignType.inAppSubScreen: {
      const isShowTriggerOnce = getFieldByKey(campaign.triggering, 'isShowTriggerOnce')
        || false;

      return {
        triggering: {
          ...getInAppFormValuesForTrigger(campaign.triggering,
            isShowTriggerOnce),
          isShowTriggerOnce,
          hasEventParams: getFieldByKey(campaign.triggering, 'hasEventParams') || [],
        },
        subscription_screen_id: getFieldByKey(
          campaign.settings, 'subscription_screen_id',
        ),
      };
    }
    case campaignType.inAppRateReview: {
      const isShowTriggerOnce = getFieldByKey(campaign.triggering, 'isShowTriggerOnce')
        || false;

      return {
        triggering: {
          ...getInAppFormValuesForTrigger(campaign.triggering,
            isShowTriggerOnce),
          isShowTriggerOnce,
          hasEventParams: getFieldByKey(campaign.triggering, 'hasEventParams') || [],
        },
      };
    }
    case campaignType.inAppHoustonRedistribute: {
      const isShowTriggerOnce = getFieldByKey(campaign.triggering, 'isShowTriggerOnce')
        || false;

      return {
        triggering: {
          ...getInAppFormValuesForTrigger(campaign.triggering,
            isShowTriggerOnce),
          isShowTriggerOnce,
          hasEventParams: getFieldByKey(campaign.triggering, 'hasEventParams') || [],
        },
      };
    }
    case campaignType.inAppInterstitials: {
      const repeatOptions = getFieldByKey(
        campaign.triggering, 'repeatOptions',
      ) || {};
      const dateStart = getFieldByKey(campaign.triggering, 'dateStart');
      const dateEnd = getFieldByKey(campaign.triggering, 'dateEnd');

      return {
        triggering: {
          // || null because of + fields validation
          perSession: getFieldByKey(
            campaign.triggering, 'perSession',
          ) || null,
          limit: getFieldByKey(
            campaign.triggering, 'limit',
          ) || null,
          timeInterval: getFieldByKey(
            campaign.triggering, 'timeInterval',
          ) || null,
          perPeriodCount: getFieldByKey(
            campaign.triggering, 'perPeriodCount',
          ) || null,
          startCountEventsSince: getFieldByKey(
            campaign.triggering, 'startCountEventsSince',
          ) || null,
          startCountEventsSinceCampaignLaunch: getFieldByKey(
            campaign.triggering, 'startCountEventsSinceCampaignLaunch',
          ) || false,
          perPeriodType: getFieldByKey(
            campaign.triggering, 'perPeriodType',
          ) || null,
          isShowEndDate: getFieldByKey(
            campaign.triggering, 'isShowEndDate',
          ) || SHOW_END_DATE.NO,
          dateStart: dateStart ? new Date(dateStart) : null,
          dateEnd: dateEnd ? new Date(dateEnd) : null,
          repeatOptions: {
            start: undefined,
            ...repeatOptions,
            every: (repeatOptions.every || repeatOptions.every === 0)
              ? repeatOptions.every + 1 : '', // workaround BE issue,
          },
        },
        inters: getFieldByKey(
          campaign.settings, 'inters',
        ),
      };
    }
    case campaignType.pushScheduled: {
      const deepLink = getFieldByKey(campaign.settings, 'deepLink');

      return {
        schedule: formatSchedule(getFieldByKey(campaign.settings, 'schedule')),
        drawBadge: getFieldByKey(campaign.settings, 'drawBadge'),
        deepLink,
        openAction: deepLink ? 'deeplink' : 'open_app',
        targeting: getFieldByKey(campaign.settings, 'targeting'),
        triggering: getFieldByKey(campaign.settings, 'triggering'),
        pushConsent: getFieldByKey(campaign.settings, 'pushConsent'),
        fallbackOtherToEn: getFieldByKey(campaign.settings, 'fallbackOtherToEn'),
        limitPerDevice: getFieldByKey(campaign.settings, 'targeting')
          .limitPerDevice,
        languages: getFieldByKey(campaign.settings, 'messages')
          || DEFAULT_PUSH_LANGUAGES,
      };
    }
    case campaignType.pushTriggeredSessionEnd:
    case campaignType.pushTriggeredCancelTrail:
    case campaignType.pushTriggeredCancelPaid: {
      const deepLink = getFieldByKey(campaign.settings, 'deepLink');

      return {
        drawBadge: getFieldByKey(campaign.settings, 'drawBadge'),
        deepLink,
        openAction: deepLink ? 'deeplink' : 'open_app',
        targeting: getFieldByKey(campaign.settings, 'targeting'),
        triggering: getFieldByKey(campaign.settings, 'triggering'),
        pushConsent: getFieldByKey(campaign.settings, 'pushConsent'),
        fallbackOtherToEn: getFieldByKey(campaign.settings, 'fallbackOtherToEn'),
        limitPerDevice: getFieldByKey(campaign.settings, 'targeting')
          .limitPerDevice,
        languages: getFieldByKey(campaign.settings, 'messages')
          || DEFAULT_PUSH_LANGUAGES,
      };
    }

    default:
      return {};
  }
};

const getFilterName = (config, key) => Object.keys(config)
  .map((f) => config[f])
  .find((filter) => filter.subFields.includes(key)
    || filter.field === key)?.field;

export const getParsedDate = (campaign) => {
  const step3 = {
    additionalFilters: [],
    filters: [],
  };
  const preservedFields = {};
  const step3InlineKeys = {};

  campaign.targeting.forEach(({ key, value }) => {
    const extraFilterName = getFilterName(additionalTargetingFilters, key);
    const filterName = getFilterName(targetingFilters, key);

    if (filterName) {
      const filter = targetingFilters[filterName];

      if (!step3.filters.includes(filterName)) {
        step3.filters.push(filterName);
      }

      filter.parseDate(step3, value, key);
    }
    if (extraFilterName) {
      const additionalFilter = additionalTargetingFilters[extraFilterName];

      if (!step3.additionalFilters.includes(extraFilterName)) {
        step3.additionalFilters.push(extraFilterName);
      }
      additionalFilter.parseDate(step3, value, key);
    }
    // TODO: Backend restriction
    if (!filterName && !extraFilterName) {
      preservedFields[key] = value;
    }
  });

  return {
    type: getCampaignType(campaign.type),
    id: campaign.id,
    status: campaign.status,
    step1: {
      name: campaign.name,
      type: campaign.type,
    },
    step2: getStep2FormValuesFromPayload(campaign, campaign.type),
    step3: {
      ...step3,
      ...step3InlineKeys,
    },
    preservedFields,
  };
};
