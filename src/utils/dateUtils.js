import dayjs from 'dayjs';

import { DATE_CHART_FORMAT, TIME_FORMAT } from './constants/date';

export const getValidDate = (
  date, format = DATE_CHART_FORMAT,
) => (date && dayjs(date).isValid()
  ? dayjs(date).format(format)
  : null);

export const getCurrentTime = () => new Date().timeNow();
export const formatDate = (d, format) => getValidDate(d, format || DATE_CHART_FORMAT);
export const formatTime = (t) => getValidDate(t, TIME_FORMAT);
export const getFormattedDate = (date, format) => (
  date ? dayjs(date).format(format) : null);
export const getDateFromString = (date) => (
  date ? dayjs(date) : null);
export const getDateTimeFromString = (date, time) => (
  date ? dayjs(`${date} ${time}`) : null);
