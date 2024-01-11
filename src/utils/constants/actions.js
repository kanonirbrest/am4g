import { OPEN_ACTION } from 'utils/constants/campaign';

export const SYSTEM_EVENT_HINT = 'This a system analytics event '
    + 'that AM4G sends to 3rd party services. It has '
    + 'its own name, parameters, and values. If you\'re '
    + 'not enough to have just system event please '
    + 'add one more analytics event to a button or image.';

export const FORM_SUBMITTED_EVENT = {
  action: OPEN_ACTION.SEND_ANALYTICS,
  name: 'FormSubmitted',
  disabledName: true,
  disabledRemove: true,
  hint: SYSTEM_EVENT_HINT,
  value: [
    {
      name: 'has_text_input_filled',
      disabled: true,
      valuePlaceholder: 'true/false',
    },
  ],
};

export const NPS_RECORDED = {
  action: OPEN_ACTION.SEND_ANALYTICS,
  name: 'NPS Recorded',
  hint: SYSTEM_EVENT_HINT,
  value: [{
    name: 'score',
    disabled: true,
    valuePlaceholder: 'user\'s score',
  }],
  disabledName: true,
  disabledRemove: true,
};
