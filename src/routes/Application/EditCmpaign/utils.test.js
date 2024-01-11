import { getInAppFormValuesForTrigger } from 'routes/Application/EditCmpaign/utils';

const MOCK_IN_APP_REPEAT = [
  {
    key: 'dateEnd',
    value: '2022-12-06 19:35:00',
  },
  {
    key: 'trigger',
    value: 'Session Start',
  },
  {
    key: 'dateStart',
    value: '2022-12-05 19:35:00',
  },
  {
    key: 'isShowEndDate',
    value: 'on the date',
  },
  {
    key: 'perPeriodType',
    value: 'week',
  },
  {
    key: 'repeatOptions',
    value: {
      every: 0,
      start: 1,
    },
  },
  {
    key: 'perPeriodCount',
    value: 12,
  },
  {
    key: 'isShowTriggerOnce',
    value: false,
  },
  {
    key: 'startCountEventsSince',
    value: '2022-12-05 21:21:00',
  },
  {
    key: 'startCountEventsSinceCampaignLaunch',
    value: true,
  },
];
const MOCK_CUSTOM_IN_APP = [
  {
    key: 'dateStart',
    value: '2022-12-06 19:34:00',
  },
  {
    key: 'hasEventCount',
    value: [
      {
        op: 'eq',
        val: '1',
        name: 'Session Start',
      },
      {
        op: 'eq',
        val: '2',
        name: 'Session Start',
      },
      {
        op: 'eq',
        val: '5',
        name: 'Session Start',
      },
    ],
  },
  {
    key: 'isShowEndDate',
    value: 'never',
  },
  {
    key: 'perPeriodType',
    value: 'week',
  },
  {
    key: 'perPeriodCount',
    value: 2,
  },
  {
    key: 'isShowTriggerOnce',
    value: false,
  },
  {
    key: 'startCountEventsSince',
    value: '2022-12-20 06:30:00',
  },
  {
    key: 'startCountEventsSinceCampaignLaunch',
    value: true,
  },
];

describe('In App Triggering test', () => {
  it('repeat triggering with limits', () => {
    expect(getInAppFormValuesForTrigger(MOCK_IN_APP_REPEAT)).toMatchObject({
      dateEnd: new Date('2022-12-06 19:35:00'),
      dateStart: new Date('2022-12-05 19:35:00'),
      isShowEndDate: 'on the date',
      perPeriodCount: 12,
      perPeriodType: 'week',
      repeatOptions: { every: 1, showOnceFrom: '', start: 1 },
      startCountEventsSince: '2022-12-05 21:21:00',
      startCountEventsSinceCampaignLaunch: true,
      trigger: 'Session Start',
      type: 'repeated',
    });
  });
  it('custom triggering with limits', () => {
    expect(getInAppFormValuesForTrigger(MOCK_CUSTOM_IN_APP)).toMatchObject({
      custom: [
        '1',
        '2',
        '5',
      ],
      dateStart: new Date('2022-12-06 19:34:00'),
      isShowEndDate: 'never',
      perPeriodCount: 2,
      perPeriodType: 'week',
      repeatOptions: {
        every: 1,
        showOnceFrom: '',
        start: 1,
      },
      startCountEventsSince: '2022-12-20 06:30:00',
      startCountEventsSinceCampaignLaunch: true,
      trigger: 'Session Start',
      type: 'custom',
    });
  });
});
