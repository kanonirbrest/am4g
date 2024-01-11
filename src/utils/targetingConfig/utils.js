import { PLATFORM } from 'utils/constants';
import { campaignType } from 'components/constants';

const EXCLUDED_FIELD_NAMES = {
  ANDROID: 'androidExcluded',
  IOS: 'iosExcluded',
};

export const FILTER_TYPE = {
  ADDITIONAL_FILTERS: 'additionalFilters',
  FILTERS: 'filters',
};
const MULTI_FIELDS_AND_LIMIT = 5;
export const EXCLUDED_IN_APP_AND_MULTI = [
  campaignType.inAppDeeplink, campaignType.inAppHTML,
  campaignType.inAppRateReview, campaignType.inAppCustom,
  campaignType.inAppSubScreen, campaignType.inAppHoustonRedistribute,
  campaignType.inAppInterstitials,

  campaignType.pushTriggered, campaignType.pushTriggeredClosedScreen,
  campaignType.multiCustom,
];

export const getFilterByLabel = (label, config) => Object.keys(config)
  .map((f) => config[f])
  .find((filter) => filter.label === label)?.field;

export const getFiltersByPlatformAndType = (platform, type, config) => Object.keys(config)
  .filter((filter) => {
    const platformProp = platform === PLATFORM.ANDROID
      ? EXCLUDED_FIELD_NAMES.ANDROID : EXCLUDED_FIELD_NAMES.IOS;

    return !config[filter][platformProp].includes(type);
  });

export const getFilterOptions = (
  platform, type, config, values, filterType,
) => getFiltersByPlatformAndType(
  platform, type, config,
)
  .map((f) => ({
    label: config[f].label,
    value: f,
  }))
  .filter((f) => {
    if (config[f.value].isMulti) {
      return !values[f.value]
          || values[f.value].length < MULTI_FIELDS_AND_LIMIT;
    }

    return !values[filterType].includes(f.value);
  })
  .sort((a, b) => a.label.localeCompare(b.label));

export const getBlacklist = (type, activeApplication) => {
  // push campaigns
  if ([campaignType.pushScheduled, campaignType.pushTriggeredCancelTrail,
    campaignType.pushTriggeredCancelPaid,
    campaignType.pushTriggeredSessionEnd].includes(type)) {
    return [...activeApplication.blacklistLocal, ...activeApplication.blacklistRemove];
  }

  // inapp campaigns
  if (type.includes('TYPE_IN_APP')) {
    return activeApplication.blacklistLocal;
  }

  return [];
};
