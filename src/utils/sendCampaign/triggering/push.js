import { getFormattedDate } from 'utils/dateUtils';
import { DATE_FORMAT, TIME_FORMAT } from 'utils/constants/date';

export default (triggering) => {
  const {
    type,
    sendNow,
    daysOfWeek,
    endingDate,
    endingType,
    everyNTerm,
    daysOfMonth,
    beginningDate,
    endingAfterNOccur,
  } = triggering;
  if (!sendNow) {
    return {
      time: getFormattedDate(beginningDate, TIME_FORMAT),
      daysOfWeek,
      endingDate: getFormattedDate(endingDate, DATE_FORMAT),
      endingType,
      everyNTerm,
      daysOfMonth,
      beginningDate: getFormattedDate(beginningDate, DATE_FORMAT),
      endingAfterNOccur,
      type,
      sendNow,
    };
  }

  return {
    sendNow,
    type: 'once',
    time: getFormattedDate(beginningDate, TIME_FORMAT),
    beginningDate: getFormattedDate(beginningDate, DATE_FORMAT),
  };
};
