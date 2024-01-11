export default [
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Cancelled Paid',
        ],
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'trigger',
        value: 'Session Start',
      },
      {
        __typename: 'KeyValue',
        key: 'repeatOptions',
        value: {
          every: 0,
          start: 1,
        },
      },
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2022-02-09T07:50:14.000Z',
    updated: '2022-02-09T07:59:34.000Z',
    id: '1640006d-ec68-4c3e-b9a2-dda65415fc90',
    name: 'inapp custom draft2',
    type: 'TYPE_IN_APP_HTML',
    status: 'STATUS_DRAFT',
  },
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Cancelled Trial',
        ],
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2021-12-01T11:31:01.000Z',
    updated: '2022-03-14T12:51:33.000Z',
    id: '9e48a7ef-b3f0-423a-80fa-24f47111c49a',
    name: 'push test langs',
    type: 'TYPE_PUSH_SCHEDULED',
    status: 'STATUS_ACTIVE',
  },
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'limitPerDevice',
        value: 1,
      },
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Cancelled Paid',
        ],
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2022-03-11T14:17:08.000Z',
    updated: '2022-03-11T15:34:25.000Z',
    id: '5a214ae4-80ab-4d7e-abdb-2e347fe4b921',
    name: 'push',
    type: 'TYPE_PUSH_TRIGGERED_SESSION_END',
    status: 'STATUS_ACTIVE',
  },
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Free',
        ],
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'limit',
        value: 12,
      },
      {
        __typename: 'KeyValue',
        key: 'trigger',
        value: 'Session Properties',
      },
      {
        __typename: 'KeyValue',
        key: 'repeatOptions',
        value: {
          every: 1,
          limit: 12,
          start: 1,
        },
      },
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2022-02-03T09:52:26.000Z',
    updated: '2022-04-12T08:23:18.000Z',
    id: 'c7086fbf-cdd1-4fed-9281-def98be93005',
    name: 'deeplink',
    type: 'TYPE_IN_APP_DEEP_LINK',
    status: 'STATUS_ACTIVE',
  },
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'region',
        value: [
          '',
          'US.CA',
        ],
      },
      {
        __typename: 'KeyValue',
        key: 'purposesOperation',
        value: 'in',
      },
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Free',
        ],
      },
      {
        __typename: 'KeyValue',
        key: 'impressionCampaign',
        value: true,
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'hasEventCount',
        value: [
          {
            op: 'eq',
            val: '2',
            name: 'Session Start',
          },
        ],
      },
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2021-11-09T09:41:46.000Z',
    updated: '2022-01-16T16:08:19.000Z',
    id: '141984ba-ca2d-4207-9117-a2a5f54e15fb',
    name: 'camp with regions',
    type: 'TYPE_IN_APP_CUSTOM',
    status: 'STATUS_ACTIVE',
  },
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'sinceLastVisitLess',
        value: {
          val: '22',
          type: 'hours',
        },
      },
      {
        __typename: 'KeyValue',
        key: 'sinceLastVisitMore',
        value: {
          val: '11',
          type: 'hours',
        },
      },
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Cancelled Trial',
        ],
      },
      {
        __typename: 'KeyValue',
        key: 'sinceFirstVisitLess',
        value: {
          val: '44',
          type: 'hours',
        },
      },
      {
        __typename: 'KeyValue',
        key: 'sinceFirstVisitMore',
        value: {
          val: '33',
          type: 'hours',
        },
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'limit',
        value: 99,
      },
      {
        __typename: 'KeyValue',
        key: 'trigger',
        value: 'Session Properties',
      },
      {
        __typename: 'KeyValue',
        key: 'hasEventCount',
        value: [
          {
            op: 'eq',
            val: 1,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 2,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 3,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 4,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 5,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 6,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 7,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 8,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 9,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 10,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 11,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 12,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 13,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 14,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 15,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 16,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 17,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 18,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 19,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 20,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 21,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 22,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 23,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 24,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 25,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 26,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 27,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 28,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 29,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 30,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 31,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 32,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 33,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 34,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 35,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 36,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 37,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 38,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 39,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 40,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 41,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 42,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 43,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 44,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 45,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 46,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 47,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 48,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 49,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 50,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 51,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 52,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 53,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 54,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 55,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 56,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 57,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 58,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 59,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 60,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 61,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 62,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 63,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 64,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 65,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 66,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 67,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 68,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 69,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 70,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 71,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 72,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 73,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 74,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 75,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 76,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 77,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 78,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 79,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 80,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 81,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 82,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 83,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 84,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 85,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 86,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 87,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 88,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 89,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 90,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 91,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 92,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 93,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 94,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 95,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 96,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 97,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 98,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 99,
            name: 'Session Properties',
          },
        ],
      },
      {
        __typename: 'KeyValue',
        key: 'repeatOptions',
        value: {
          every: 1,
          limit: 99,
          start: 1,
        },
      },
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2021-12-14T13:22:23.000Z',
    updated: '2022-04-12T08:23:18.000Z',
    id: 'd8a86127-768c-4338-9bf4-2c878b7b9ffa',
    name: 'in App test new admin',
    type: 'TYPE_IN_APP_HTML',
    status: 'STATUS_ACTIVE',
  },
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Cancelled Paid',
        ],
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'trigger',
        value: 'Session Start',
      },
      {
        __typename: 'KeyValue',
        key: 'repeatOptions',
        value: {
          every: 1,
          start: 1,
        },
      },
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2022-03-11T14:48:17.000Z',
    updated: '2022-03-11T14:48:19.000Z',
    id: 'a1dd83ef-2048-49f2-8730-59863f46de40',
    name: 'inapp check',
    type: 'TYPE_IN_APP_HTML',
    status: 'STATUS_ACTIVE',
  },
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Cancelled Paid',
        ],
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'trigger',
        value: 'Session Start',
      },
      {
        __typename: 'KeyValue',
        key: 'repeatOptions',
        value: {
          every: 1,
          start: 1,
        },
      },
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2022-02-03T10:55:50.000Z',
    updated: '2022-02-03T10:55:51.000Z',
    id: 'f20513b1-7900-4ba3-b0f6-6349b6bc340b',
    name: 'deeplink',
    type: 'TYPE_IN_APP_DEEP_LINK',
    status: 'STATUS_ACTIVE',
  },
  {
    __typename: 'Campaign',
    targeting: [
      {
        __typename: 'KeyValue',
        key: 'country',
        value: {
          0: 'AO.CCU',
          2: 'AE.',
        },
      },
      {
        __typename: 'KeyValue',
        key: 'countryOperation',
        value: 'in',
      },
      {
        __typename: 'KeyValue',
        key: 'subscriptionStatus',
        value: [
          'Cancelled Trial',
        ],
      },
    ],
    triggering: [
      {
        __typename: 'KeyValue',
        key: 'limit',
        value: 99,
      },
      {
        __typename: 'KeyValue',
        key: 'trigger',
        value: 'Session Properties',
      },
      {
        __typename: 'KeyValue',
        key: 'hasEventCount',
        value: [
          {
            op: 'eq',
            val: 1,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 2,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 3,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 4,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 5,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 6,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 7,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 8,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 9,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 10,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 11,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 12,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 13,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 14,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 15,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 16,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 17,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 18,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 19,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 20,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 21,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 22,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 23,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 24,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 25,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 26,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 27,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 28,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 29,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 30,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 31,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 32,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 33,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 34,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 35,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 36,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 37,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 38,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 39,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 40,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 41,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 42,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 43,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 44,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 45,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 46,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 47,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 48,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 49,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 50,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 51,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 52,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 53,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 54,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 55,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 56,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 57,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 58,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 59,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 60,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 61,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 62,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 63,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 64,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 65,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 66,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 67,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 68,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 69,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 70,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 71,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 72,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 73,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 74,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 75,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 76,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 77,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 78,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 79,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 80,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 81,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 82,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 83,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 84,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 85,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 86,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 87,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 88,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 89,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 90,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 91,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 92,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 93,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 94,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 95,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 96,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 97,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 98,
            name: 'Session Properties',
          },
          {
            op: 'eq',
            val: 99,
            name: 'Session Properties',
          },
        ],
      },
      {
        __typename: 'KeyValue',
        key: 'repeatOptions',
        value: {
          every: 1,
          limit: 99,
          start: 1,
        },
      },
      {
        __typename: 'KeyValue',
        key: 'isShowTriggerOnce',
        value: false,
      },
    ],
    created: '2021-11-09T09:48:40.000Z',
    updated: '2022-04-12T08:23:18.000Z',
    id: 'dd389366-431d-4b96-aaf5-6905cc516358',
    name: 'with regions',
    type: 'TYPE_IN_APP_HTML',
    status: 'STATUS_ACTIVE',
  },
];
