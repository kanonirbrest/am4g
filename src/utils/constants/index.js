export const ROUTES = {
  root: '/',
  login: '/login',
  application: '/:appId',
  newCampaign: '/new-campaign',
  reports: '/:campaignId/reports',
  editCampaign: '/:campaignId/edit',
};

export const ENTER_KEY_CODE = 13;
export const EQUALITY = {
  IN: 'in',
  NOT_IN: 'notIn',
};

export const equalityOptions = [
  { label: '< less than', value: 'lt' },
  { label: '<= less or equal', value: 'lte' },
  { label: '= equally', value: 'eq' },
  { label: '> greater than', value: 'gt' },
  { label: '>= greater or equal', value: 'gte' },
];

export const PLATFORM = {
  ANDROID: 'android',
  IOS: 'ios',
};

export const UNASSIGNED_LABEL = ' Unassigned';
export const DEVICE_CONTROL = {
  NPS_SLIDER: 'nps-slider',
  TITLE: 'title',
  TEXT: 'text',
  BUTTON: 'button',
  IMAGE: 'image',
  NPS_BUTTON: 'nps-button',
  NPS_SCORE: 'nps-score',
  NPS_DESCRIPTION: 'nps-description',
  FEEDBACK: 'feedback',
  RADIO: 'radio',
};

export const DEFAULT_PUSH_LANGUAGE_CONTENT = () => ({
  content: {
    body: null,
    image: null,
    isBigPicture: false,
    title: null,
    subtitle: null,
  },
});

export const COLUMNS_PER_PAGE = 16;

export const BUTTON_TYPE = {
  SUBMIT: 'submit',
  BUTTON: 'button',
};

export const MULTIPLE_WIDGETS = [DEVICE_CONTROL.TEXT, DEVICE_CONTROL.BUTTON];

export const OFFER_TYPE = {
  INTRO: 'introductory',
  PROMO: 'promotional',
};
