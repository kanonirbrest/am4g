import { DATE_FORMAT } from 'utils/constants/date';
import { CHART_TAB_VALUE } from 'routes/Application/Reports/ChartTabsContent/constants';
import { formatDate } from 'utils/dateUtils';
import { campaignType } from 'components/constants';

export const initialFilters = {
  country: '',
  version: '',
  compareTo: false,
  startDate: '2017-05-24T10:30',
  endDate: formatDate(new Date(), DATE_FORMAT),
};

export const statisticTabs = [
  CHART_TAB_VALUE.VOLUME, CHART_TAB_VALUE.PERFORMANCE,
];
export const statisticMultiTabs = [
  CHART_TAB_VALUE.VOLUME, CHART_TAB_VALUE.PERFORMANCE, CHART_TAB_VALUE.VARIANTS,
];

export const STATISTIC_HEADER_NAMES = {
  date: 'Date',
  push_send_count: 'Sent',
  push_open_count: 'Opened',
  delivery_rate: 'Delivery Rate',
  open_per_delivered: 'Open Per Delivered',
  open_per_sent: 'Open Per Sent',
  push_delivered_count: 'Delivered',
  impression: 'Delivery',
};
export const GENERAL_STATS_TAB = 'general';
export const CAMPAIGN_TYPES_ALLOWED_CSV = [campaignType.inAppHTML];
