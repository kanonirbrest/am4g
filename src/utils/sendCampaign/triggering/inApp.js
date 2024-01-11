import dayjs from 'dayjs';

import { IN_APP_CUSTOM_TYPE } from 'utils/constants/campaignForm';
import { DATETIME_FORMAT } from 'utils/constants/date';

export const getEndDate = (end, start, format = DATETIME_FORMAT) => {
  if (!end || !start) return undefined;
  const dateEnd = new Date(end);
  const dateStart = new Date(start);

  const date = new Date(dateEnd.getFullYear(),
    dateEnd.getMonth(), dateEnd.getDate(), dateStart.getHours(),
    dateStart.getMinutes(), 0);

  return dayjs(date).format(format);
};
export const getDateWithNullSeconds = (start, format = DATETIME_FORMAT) => {
  if (!start) return undefined;

  const dateStart = new Date(start);

  dateStart.setSeconds(0);

  return dayjs(dateStart).format(format);
};

export default (triggering) => {
  const {
    trigger,
    isShowTriggerOnce,
    type,
    custom,
    perSession,
    perPeriodCount,
    isShowEndDate,
    dateStart,
    dateEnd,
    perPeriodType,
    timeInterval,
    repeatOptions: {
      every, start, showOnceFrom,
    },
    limit,
    hasEventParams,
    startCountEventsSince,
    startCountEventsSinceCampaignLaunch,
  } = triggering;
  let items;

  if (type === IN_APP_CUSTOM_TYPE.SHOW_ONCE) {
    items = [{ val: showOnceFrom, name: trigger, op: 'gte' }];
  } else if (type === IN_APP_CUSTOM_TYPE.CUSTOM) {
    items = custom.map((e) => ({ val: e, name: trigger, op: 'eq' }));
  } else if (!every || !start) {
    return {
      isShowTriggerOnce,
      hasEventParams: [],
    };
  }

  return {
    isShowTriggerOnce,
    hasEventParams,
    dateStart: getDateWithNullSeconds(dateStart),
    dateEnd: getEndDate(dateEnd, dateStart),
    startCountEventsSince: getDateWithNullSeconds(startCountEventsSince),
    startCountEventsSinceCampaignLaunch,
    isShowEndDate,
    ...(type !== IN_APP_CUSTOM_TYPE.REPEATED && {
      hasEventCount: items,
    }),
    ...([IN_APP_CUSTOM_TYPE.REPEATED, IN_APP_CUSTOM_TYPE.CUSTOM]
      .includes(type) && {
      perSession,
      perPeriodCount,
      perPeriodType,
      limit,
    }),
    ...(type === IN_APP_CUSTOM_TYPE.REPEATED && {
      trigger,
      repeatOptions: {
        every: every - 1, // workaround BE issue
        start,
      },
      timeInterval,
    }),
  };
};
