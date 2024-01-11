import { additionalTargetingFilters, targetingFilters }
  from 'utils/targetingConfig/index';
import { PLATFORM } from 'utils/constants';
import { campaignType } from 'components/constants';
import { getFilterByLabel, getFiltersByPlatformAndType } from './utils';

describe('targeting config Utils', () => {
  it('should return correct field by label', () => {
    const { label, field } = Object.keys(targetingFilters)[0];
    expect(getFilterByLabel(label, targetingFilters))
      .toEqual(field);
  });
  it('should return correct array of filters for inAppHTML Android', () => {
    expect(getFiltersByPlatformAndType(
      PLATFORM.ANDROID, campaignType.inAppHTML, targetingFilters,
    ))
      .toEqual([
        'appVersion',
        'billingRetry',
        'nps',
        'country',
        'deviceType',
        'renewCount',
        'purchaseType',
        'userBucket',
        'ldTrackId',
        'deviceIdfv',
        'osVersion',
        'region',
        'userProperty',
        'subscriptionStatus',
      ]);
  });
  it('should return correct array of filters for inAppHTML IOS', () => {
    expect(getFiltersByPlatformAndType(
      PLATFORM.IOS, campaignType.inAppHTML, targetingFilters,
    ))
      .toEqual([
        'appVersion',
        'billingRetry',
        'nps',
        'country',
        'deviceModel',
        'deviceType',
        'renewCount',
        'IDFAPermissionRequest',
        'purchaseType',
        'userBucket',
        'ldTrackId',
        'deviceIdfv',
        'osVersion',
        'region',
        'userProperty',
        'subscriptionStatus',
      ]);
  });
  it('should return correct array of filters pushTriggeredCancelPaid IOS', () => {
    expect(getFiltersByPlatformAndType(
      PLATFORM.IOS, campaignType.pushTriggeredCancelPaid, targetingFilters,
    ))
      .toEqual([
        'appVersion',
        'billingRetry',
        'nps',
        'country',
        'deviceModel',
        'deviceType',
        'renewCount',
        'expirationDateFrom',
        'expirationDateTo',
        'expirationDateAgoTo',
        'expirationDateAgoFrom',
        'IDFAPermissionRequest',
        'purchaseType',
        'userBucket',
        'ldTrackId',
        'deviceIdfv',
        'osVersion',
        'region',
        'userProperty',
        'subscriptionStatus',
      ]);
  });
  it('should return correct array of additional filters pushTriggeredCancelPaid IOS',
    () => {
      expect(getFiltersByPlatformAndType(
        PLATFORM.IOS, campaignType.pushTriggeredCancelPaid, additionalTargetingFilters,
      ))
        .toEqual([
          'afterEvent',
          'hasEvent',
          'sessionCount',
          'sinceFirstVisitLess',
          'sinceFirstVisitMore',
          'sinceLastVisitLess',
          'sinceLastVisitMore',
          'impressionCampaign',
        ]);
    });
  it('should return correct array of additional filters inAppHTML IOS', () => {
    expect(getFiltersByPlatformAndType(
      PLATFORM.IOS, campaignType.inAppHTML, additionalTargetingFilters,
    ))
      .toEqual([
        'afterEvent',
        'hasEvent',
        'sessionCount',
        'sinceFirstVisitLess',
        'sinceFirstVisitMore',
        'impressionCampaign',
      ]);
  });
});
