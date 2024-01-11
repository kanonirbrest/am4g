import { IN_APP_CUSTOM_TYPE } from 'utils/constants/campaignForm';
import { SHOW_END_DATE } from 'utils/constants/triggering';
import getInAppCustomTriggering from './inApp';

const triggeringShowOnce = {
  trigger: 'name1',
  isShowTriggerOnce: true,
  repeatOptions: {
    showOnceFrom: 2,
  },
  hasEventParams: [{
    name: 'paramName',
    val: 'paramValue',
  }],
  startCountEventsSince: '2022-12-05 21:21:00',
  startCountEventsSinceCampaignLaunch: true,
  dateStart: '2022-11-29 06:38:00',
  dateEnd: '2022-11-29 06:38:00',
  isShowEndDate: SHOW_END_DATE.YES,
  type: IN_APP_CUSTOM_TYPE.SHOW_ONCE,
};
const triggeringRepeat = {
  trigger: 'name1',
  isShowTriggerOnce: false,
  type: IN_APP_CUSTOM_TYPE.REPEATED,
  repeatOptions: {
    every: 1, start: 4,
  },
  limit: 3,
  isShowEndDate: SHOW_END_DATE.YES,
  hasEventParams: [{
    name: 'paramName',
    val: 'paramValue',
  }],
  startCountEventsSince: '2022-12-05 21:21:00',
  startCountEventsSinceCampaignLaunch: true,
  dateStart: '2022-11-29 06:38:00',
  dateEnd: '2022-11-29 06:38:00',
};
const triggeringCustom = {
  perPeriodCount: 5,
  perPeriodType: 'month',
  trigger: 'name1',
  isShowTriggerOnce: false,
  isShowEndDate: SHOW_END_DATE.NO,
  repeatOptions: {
    every: null, start: 4,
  },
  limit: 3,
  hasEventParams: [{
    name: 'paramName',
    val: 'paramValue',
  }],
  type: IN_APP_CUSTOM_TYPE.CUSTOM,
  custom: [12],
  startCountEventsSince: '2022-12-05 21:21:00',
  startCountEventsSinceCampaignLaunch: true,
  dateStart: '2022-11-29 06:38:00',
  dateEnd: '2022-11-29 06:38:00',
};

describe('FormData utils get triggering', () => {
  it('should return correct triggering object show once', () => {
    expect(getInAppCustomTriggering(triggeringShowOnce)).toEqual({
      hasEventCount: [
        {
          name: 'name1',
          op: 'gte',
          val: 2,
        },
      ],
      hasEventParams: [{
        name: 'paramName',
        val: 'paramValue',
      }],
      isShowEndDate: 'on the date',
      isShowTriggerOnce: true,
      startCountEventsSince: '2022-12-05 21:21:00',
      startCountEventsSinceCampaignLaunch: true,
      dateEnd: '2022-11-29 06:38:00',
      dateStart: '2022-11-29 06:38:00',
    });
  });
  it('should return correct triggering object repeat', () => {
    expect(getInAppCustomTriggering(triggeringRepeat)).toEqual({
      dateEnd: '2022-11-29 06:38:00',
      dateStart: '2022-11-29 06:38:00',
      hasEventParams: [{
        name: 'paramName',
        val: 'paramValue',
      }],
      isShowEndDate: 'on the date',
      isShowTriggerOnce: false,
      repeatOptions: {
        every: 0,
        start: 4,
      },
      limit: 3,
      perPeriodCount: undefined,
      perPeriodType: undefined,
      perSession: undefined,
      startCountEventsSince: '2022-12-05 21:21:00',
      startCountEventsSinceCampaignLaunch: true,
      timeInterval: undefined,
      trigger: 'name1',
    });
  });
  it('should return correct triggering object custom', () => {
    expect(getInAppCustomTriggering(triggeringCustom))
      .toEqual({
        dateEnd: '2022-11-29 06:38:00',
        dateStart: '2022-11-29 06:38:00',
        isShowTriggerOnce: false,
        isShowEndDate: 'never',
        perSession: undefined,
        limit: 3,
        perPeriodCount: 5,
        perPeriodType: 'month',
        hasEventCount: [
          {
            name: 'name1',
            op: 'eq',
            val: 12,
          },
        ],
        hasEventParams: [{
          name: 'paramName',
          val: 'paramValue',
        }],
        startCountEventsSince: '2022-12-05 21:21:00',
        startCountEventsSinceCampaignLaunch: true,
      });
  });
});
