export const typeOptions = [
  { label: 'once', value: 'once' },
  { label: 'every N minutes', value: 'minute' },
  { label: 'daily', value: 'day' },
  { label: 'weekly', value: 'week' },
  { label: 'monthly', value: 'month' },
];

export const daysOptions = Array
  .from(Array(32).keys())
  .filter((i) => i !== 0)
  .map((v) => ({
    label: v.toString(), value: v.toString(),
  }));

export const ENDING_TYPE_OPTIONS = {
  ON_THE_DATE: 'on_the_date',
  AFTER_N_OCCUR: 'after_n_occur',
  NEVER: 'never',
};

export const endingTypeOptions = [
  { label: 'on the date', value: ENDING_TYPE_OPTIONS.ON_THE_DATE },
  { label: 'after N occurrences', value: ENDING_TYPE_OPTIONS.AFTER_N_OCCUR },
  { label: 'never', value: ENDING_TYPE_OPTIONS.NEVER },
];

export const PUSH_SCHEDULED = {
  SEND_IMMEDIATELY: true,
  SEND_AT_TIME: false,
};

export const deliveryTabsConfig = [{
  tabValue: true,
  label: 'Send immediately',
}, {
  tabValue: false,
  label: 'Send at a designated time',
}];

export const PUSH_CAMPAIGN_TYPES = {
  MINUTE: 'minute',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  ONCE: 'once',
};
