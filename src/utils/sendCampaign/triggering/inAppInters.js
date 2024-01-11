import { getEndDate, getDateWithNullSeconds } from 'utils/sendCampaign/triggering/inApp';

export default (triggering) => {
  const {
    dateStart,
    dateEnd,
    repeatOptions: {
      every,
    },
    startCountEventsSince,
  } = triggering;

  return {
    ...triggering,
    startCountEventsSince: getDateWithNullSeconds(startCountEventsSince),
    dateStart: getDateWithNullSeconds(dateStart),
    dateEnd: getEndDate(dateEnd, dateStart),
    repeatOptions: {
      ...triggering.repeatOptions,
      every: every ? every - 1 : null, // workaround BE issue
    },
  };
};
