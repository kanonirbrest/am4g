import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { STATUS } from 'utils/constants/campaign';

const COLORS = {
  NEGATIVE: '#d32f2f',
  POSITIVE: '#2e7d32',
  NEUTRAL: '#ff9800',
};
const CRITICAL_PERCENTAGE = 3;
export const getColor = (val) => {
  if (val >= CRITICAL_PERCENTAGE) return COLORS.POSITIVE;
  if (val <= -CRITICAL_PERCENTAGE) return COLORS.NEGATIVE;

  return COLORS.NEUTRAL;
};
export const getIcon = (val) => {
  if (val > 0) return <ArrowUpwardIcon fontSize="16px" color={getColor(val)} />;
  if (val < 0) return <ArrowDownwardIcon fontSize="16px" color={getColor(val)} />;

  return '';
};

export const getBackgroundByStatus = (status) => (
  status === STATUS.ARCHIVED ? '#F8FAFD' : '#fff');

export const getTendenciesList = (tendencies) => {
  const result = {};
  tendencies.forEach((d) => {
    if (!result[d.type]) {
      result[d.type] = {};
    }

    result[d.type][d.ext] = d.count;
  });

  return result;
};

export const LABEL_MAP = {
  impression: 'Imp',
  /* push */
  push_open_count: 'Opened',
  open_per_delivered: 'Open per dlvrd',
  /* sub screen */
  sub_screen_cvr: 'CVR',
  sub_screen_ecpm_usd: 'eCPM',
  sub_screen_ltv_usd: 'LTV',
  sub_screen_ctr: 'CTR',
  /* Interstitials */
  inters_revenue_usd: 'Ad Rev',
  inters_ecpm_usd: 'eCPM',
};

export const EXTENSION_MAP = {
  abs: '',
  $: '$',
  '%': '%',
};

export const getExt = (val) => (EXTENSION_MAP[val] || '');
