import getTargeting from './index';

const targetingData1 = {
  step3: {
    filters: [
      'Subscription Status',
      'App Version',
      'Billing Retry',
      'LD Track ID',
      'Country',
      'Region',
      'Purchase type',
      'Os Version',
      'Premium Expiration Date',
      'Renew Count',
      'User Property',
    ],
    additionalFilters: [
      'Session Count',
      'First used the app less than',
      'First used the app more than',
      'Impression Campaign ID',
      'Last Did Event',
    ],
    subscriptionStatus: {
      subscriptionStatus: [
        'Cancelled Trial',
      ],
      productId: '',
      screenId: '',
    },
    appVersion: [
      {
        op: 'lt',
        val: '12',
      },
    ],
    billingRetry: [
      {},
    ],
    ldTrackId: [
      {
        ldTrackId: [
          '1',
          '2',
          '3',
        ],
        ldTrackIdOperation: 'in',
      },
    ],
    country: {
      countryOperation: 'in',
      country: [
        'AR',
        'BG',
        'BR',
      ],
    },
    purchaseType: {
      purposes: [
        'debug_purpose',
        'other',
      ],
      purposesOperation: 'in',
    },
    osVersion: [
      {
        op: 'gt',
        val: '23',
      },
    ],
    premiumExpirationDate: [
      {
        quantity: '33',
        type: 'lt',
      },
    ],
    renewCount: [
      {
        renewCount: '43',
      },
    ],
    userProperty: [
      {
        name: 'build_version',
        val: 'iPhone XS Max',
      },
    ],
    sessionCount: [
      {
        op: 'gt',
        val: '7',
      },
    ],
    sinceFirstVisitMore: [
      {
        type: 'days',
        val: '8',
      },
    ],
    sinceFirstVisitLess: [
      {
        type: 'days',
        val: '9',
      },
    ],
    impressionCampaign: [
      {
        was: true,
        ids: ['68910cd8-4fa2-4fa1-a88d-ecdcd7895915'],
      },
    ],
    afterEvent: [
      {
        name: 'Start From Icon',
        type: 'hours',
        op: 'lt',
        val: '11',
      },
    ],
  },
};
const additionalFilterResult = {
  afterEvent: {
    name: 'Start From Icon',
    op: 'lt',
    type: 'hours',
    val: '11',
  },
  impressionCampaign: [{
    ids: ['68910cd8-4fa2-4fa1-a88d-ecdcd7895915'],
    was: true,
  }],
  sessionCount: {
    op: 'gt',
    val: '7',
  },
  sinceFirstVisitMore: {
    type: 'days',
    val: '8',
  },
  sinceFirstVisitLess: {
    type: 'days',
    val: '9',
  },
};
const filterResult = {
  appVersion: {
    op: 'lt',
    val: '12',
  },
  country: [
    'AR',
    'BG',
    'BR',
  ],
  countryOperation: 'in',
  ldTrackId: [
    '1',
    '2',
    '3',
  ],
  ldTrackIdOperation: 'in',
  osVersion: {
    op: 'gt',
    val: '23',
  },
  productId: '',
  purposes: [
    'debug_purpose',
    'other',
  ],
  purposesOperation: 'in',
  renewCount: '43',
  screenId: '',
  subscriptionStatus: [
    'Cancelled Trial',
  ],
  userProperty: [
    {
      name: 'build_version',
      val: 'iPhone XS Max',
    },
  ],
};
const filters = [
  'subscriptionStatus',
  'appVersion',
  'billingRetry',
  'ldTrackId',
  'country',
  'region',
  'purchaseType',
  'osVersion',
  'expirationDateFrom',
  'renewCount',
  'userProperty',
];
const additionalFilters = [
  'sessionCount',
  'sinceFirstVisitLess',
  'sinceFirstVisitMore',
  'impressionCampaign',
  'afterEvent',
];

describe('FormData utils get targeting', () => {
  it('should return correct targeting object', () => {
    expect(getTargeting(filters, targetingData1))
      .toEqual(filterResult);
  });
  it('should return correct additional targeting object', () => {
    expect(getTargeting(additionalFilters, targetingData1, true))
      .toEqual(additionalFilterResult);
  });
});
