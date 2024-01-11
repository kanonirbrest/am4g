import { weekDays }
  from 'routes/Application/NewCampaign/Stepper/Step2/Push/WeekDays';
import { PUSH_CAMPAIGN_TYPES }
  from 'routes/Application/NewCampaign/Stepper/Step2/Push/constants';

// eslint-disable-next-line import/prefer-default-export
export const getSavedProps = (value, values) => {
  if (value === PUSH_CAMPAIGN_TYPES.MINUTE) {
    return {
      type: values.type,
      sendNow: !!values.sendNow,
      beginningDate: values.beginningDate,
      endingType: values.endingType || null,
      endingAfterNOccur: values.endingAfterNOccur || null,
      endingDate: values.endingDate || null,
      everyNTerm: 1,
      daysOfWeek: [],
      daysOfMonth: [],
    };
  }
  if (value === PUSH_CAMPAIGN_TYPES.DAY) {
    return {
      type: values.type,
      sendNow: !!values.sendNow,
      beginningDate: values.beginningDate,
      endingType: values.endingType,
      endingAfterNOccur: values.endingAfterNOccur,
      endingDate: values.endingDate,
      everyNTerm: values.everyNTerm,
      daysOfWeek: [],
      daysOfMonth: [],
    };
  }
  if (value === PUSH_CAMPAIGN_TYPES.WEEK) {
    return {
      type: values.type,
      sendNow: !!values.sendNow,
      beginningDate: values.beginningDate,
      endingType: values.endingType,
      endingAfterNOccur: values.endingAfterNOccur,
      endingDate: values.endingDate,
      everyNTerm: values.everyNTerm,
      daysOfWeek: weekDays,
      daysOfMonth: [],
    };
  }
  if (value === PUSH_CAMPAIGN_TYPES.MONTH) {
    return {
      type: values.type,
      sendNow: !!values.sendNow,
      beginningDate: values.beginningDate,
      endingType: values.endingType,
      endingAfterNOccur: values.endingAfterNOccur,
      endingDate: values.endingDate,
      everyNTerm: values.everyNTerm,
      daysOfWeek: [],
      daysOfMonth: [],
    };
  }
  if (value === PUSH_CAMPAIGN_TYPES.ONCE) {
    return {
      type: values.type,
      sendNow: !!values.sendNow,
      beginningDate: values.beginningDate,
      endingType: null,
      endingAfterNOccur: null,
      endingDate: null,
      daysOfWeek: [],
      daysOfMonth: [],
      everyNTerm: 1,
    };
  }

  return {};
};
