import { OPEN_ACTION } from 'utils/constants/campaign';

export const buttonOpenActionProps = {
  classes: {},
  f: {
    index: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe',
    type: 'button',
    page: 1,
    pageId: '0da38169-6666-48a9-ab04-1622ed321017',
    text: [
      { text: 'Submit', offers: [], id: '1' },
    ],
    actions: [{
      action: OPEN_ACTION.OPEN_PAGE,
      value: 'uuid-dest',
    }],
  },
  index: 0,
  fields: [
    {
      index: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe',
      type: 'button',
      page: 1,
      pageId: 'uuid-dest',
      text: [
        { text: 'Submit', offers: [], id: '1' },
      ],
      actions: [{
        action: OPEN_ACTION.SUBMIT,
      }, {
        action: OPEN_ACTION.OPEN_PAGE,
        value: 'uuid-dest',
      }],
    },
  ],
  pages: [
    {
      index: 1,
      name: 'Page 1',
      uuid: '0da38169-6666-48a9-ab04-1622ed321017',
    },
    {
      index: 2,
      name: 'Page 2',
      uuid: 'uuid-dest',
    },
  ],
  itemKey: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button',
  key: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button',
};
export const buttonSubmitProps = {
  classes: {},
  f: {
    index: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe',
    type: 'button',
    page: 1,
    pageId: '0da38169-6666-48a9-ab04-1622ed321017',
    text: [
      { text: 'Submit', offers: [], id: '1' },
    ],
    actions: [{
      action: OPEN_ACTION.SUBMIT,
    }, {
      action: OPEN_ACTION.CLOSE_SCREEN,
    }],
  },
  index: 0,
  fields: [
    {
      index: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe',
      type: 'button',
      page: 1,
      text: [
        { text: 'Submit', offers: [], id: '1' },
      ],
      pageId: 'uuid-submit',
      actions: [{
        action: OPEN_ACTION.SUBMIT,
      }, {
        action: OPEN_ACTION.CLOSE_SCREEN,
      }],
    },
  ],
  pages: [
    {
      index: 1,
      name: 'Page 1',
      uuid: '0da38169-6666-48a9-ab04-1622ed321017',
    },
    {
      index: 2,
      name: 'Page 2',
      uuid: 'uuid-submit',
    },
  ],
  itemKey: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button',
  key: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button',
};
export const buttonSubmitAndOpenProps = {
  classes: {},
  f: {
    index: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe',
    type: 'button',
    page: 1,
    pageId: '0da38169-6666-48a9-ab04-1622ed321017',
    text: [
      { text: 'Submit', offers: [], id: '1' },
    ],
    actions: [{
      action: OPEN_ACTION.SUBMIT,
    }, {
      action: OPEN_ACTION.OPEN_PAGE,
      value: 'uuid-submit',
    }],
  },
  index: 0,
  fields: [
    {
      index: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe',
      type: 'button',
      page: 1,
      pageId: 'uuid-submit',
      text: [
        { text: 'Submit', offers: [], id: '1' },
      ],
      actions: [{
        action: OPEN_ACTION.OPEN_PAGE,
        value: 'uuid-submit',
      }, {
        action: OPEN_ACTION.SUBMIT,
      }],
    },
  ],
  pages: [
    {
      index: 1,
      name: 'Page 1',
      uuid: '0da38169-6666-48a9-ab04-1622ed321017',
    },
    {
      index: 2,
      name: 'Page 2',
      uuid: 'uuid-submit',
    },
  ],
  itemKey: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button',
  key: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button',
};

export const feedbackProps = {
  classes: {},
  f: {
    index: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe',
    type: 'feedback',
    page: 1,
    pageId: '0da38169-6666-48a9-ab04-1622ed321017',
    text: 'Submit',
    required: true,
  },
  index: 0,
  fields: [
    {
      index: '8b8b0c9e-c44d-424b-9414-362f2ec779d1',
      type: 'feedback',
      page: 1,
      pageId: '4d24d291-aee7-48f6-b076-8541f9fd8187',
      required: true,
    },
  ],
  pages: [
    {
      index: 1,
      name: 'Page 1',
      uuid: '0da38169-6666-48a9-ab04-1622ed321017',
    },
    {
      index: 2,
      name: 'Page 2',
      uuid: 'uuid-submit',
    },
  ],
  itemKey: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-feedback',
  key: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-feedback',
};
export const feedbackPropsPage2 = {
  classes: {},
  f: {
    index: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe',
    type: 'feedback',
    page: 2,
    pageId: 'uuid-submit',
    text: 'Submit',
    required: false,
  },
  index: 0,
  fields: [
    {
      index: '8b8b0c9e-c44d-424b-9414-362f2ec779d1',
      type: 'feedback',
      page: 2,
      pageId: 'uuid-submit',
      required: false,
    },
  ],
  pages: [
    {
      index: 1,
      name: 'Page 1',
      uuid: '0da38169-6666-48a9-ab04-1622ed321017',
    },
    {
      index: 2,
      name: 'Page 2',
      uuid: 'uuid-submit',
    },
  ],
  itemKey: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-feedback',
  key: '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-feedback',
};

export const npsPropsPage2 = {
  classes: {},
  f: {
    index: '2ea759c5-c78a-47be-835a-77ccd4727fd5',
    type: 'nps-button',
    page: 1,
    pageId: '4d24d291-aee7-48f6-b076-8541f9fd8187',
    text: 'Submit',
    actions: [{
      action: OPEN_ACTION.SUBMIT,
    }, {
      action: OPEN_ACTION.CLOSE_SCREEN,
    }],
  },
  index: 0,
  fields: [
    {
      index: '2ea759c5-c78a-47be-835a-77ccd4727fd5',
      type: 'nps-score',
      page: 1,
      pageId: '4d24d291-aee7-48f6-b076-8541f9fd8187',
    },
    {
      index: '2ea759c5-c78a-47be-835a-77ccd4727fd5',
      type: 'nps-description',
      page: 1,
      pageId: '4d24d291-aee7-48f6-b076-8541f9fd8187',
    },
    {
      index: '2ea759c5-c78a-47be-835a-77ccd4727fd5',
      type: 'nps-slider',
      label: 'NPS',
      page: 1,
      pageId: '4d24d291-aee7-48f6-b076-8541f9fd8187',
      mapper: [
        {
          score: 0,
          description: 'Awful',
          default: false,
        },
        {
          score: 1,
          description: 'Disappointed',
          default: false,
        },
        {
          score: 2,
          description: 'Neutral',
          default: true,
        },
        {
          score: 3,
          description: 'Good',
          default: false,
        },
        {
          score: 4,
          description: 'Awesome',
          default: false,
        },
      ],
      showIndex: false,
      hideScore: false,
    },
    {
      index: '2ea759c5-c78a-47be-835a-77ccd4727fd5',
      type: 'nps-button',
      page: 1,
      pageId: '4d24d291-aee7-48f6-b076-8541f9fd8187',
      text: 'Submit',
      actions: [{
        action: OPEN_ACTION.SUBMIT,
      }, {
        action: OPEN_ACTION.CLOSE_SCREEN,
      }],
    },
  ],
  pages: [
    {
      index: 1,
      name: 'Page 1',
      uuid: '4d24d291-aee7-48f6-b076-8541f9fd8187',
    },
    {
      index: 2,
      name: 'Page 2',
      uuid: 'uuid-submit',
    },
  ],
  itemKey: '2ea759c5-c78a-47be-835a-77ccd4727fd5-nps-button',
  key: '2ea759c5-c78a-47be-835a-77ccd4727fd5-nps-button',
};
