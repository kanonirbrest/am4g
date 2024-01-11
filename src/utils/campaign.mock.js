import { campaignType } from 'components/constants';
import { SHOW_END_DATE } from 'utils/constants/triggering';

export default {
  type: 'PUSH',
  id: 'dfb0a9c4-9bab-4ddf-bbbe-e4712c4d1b6f',
  status: 'STATUS_STOPPED',
  step1: {
    name: 'push renew count test [AM4G-1324, AM4G-1327]',
    type: campaignType.pushScheduled,
  },
  step2: {
    schedule: {
      time: '05:29:55',
      type: 'once',
      sendNow: true,
      daysOfWeek: [],
      endingDate: null,
      endingType: SHOW_END_DATE.NO,
      everyNTerm: 1,
      daysOfMonth: [],
      beginningDate: '2022-02-10T05:29:55',
      endingAfterNOccur: null,
    },
    drawBadge: true,
    openAction: 'open_app',
    targeting: {
      deviceIdfv: [
        'CD9DE9A5-164F-40FC-82A4-D40EC67846F0',
        'B131037F-B5FC-4A55-9DD0-B37742D477C4',
      ],
      renewCount: '0',
      subscriptionStatus: [
        'Expired Paid',
        'Paid',
        'Free',
      ],
    },
    triggering: {
      isShowTriggerOnce: false,
    },
    fallbackOtherToEn: true,
    languages: [
      {
        locale: 'en',
        title: 'push targeting 2',
        message: 'test',
        isBigPicture: false,
        name: 'English',
        subtitle: 'Sub Title',
      },
    ],
  },
  step3: {
    additionalFilters: [],
    filters: [
      'subscriptionStatus',
    ],
    subscriptionStatus: {
      subscriptionStatus: [
        'Expired Paid',
        'Paid',
        'Free',
      ],
    },
  },
  preservedFields: {},
};
