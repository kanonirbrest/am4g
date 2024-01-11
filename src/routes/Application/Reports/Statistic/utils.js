import React from 'react';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import { getFieldByKey } from 'utils/campaignUtils';
import { formatDate, getValidDate } from 'utils/dateUtils';
import { DATE_CHART_FORMAT, DATE_FORMAT } from 'utils/constants/date';
import _groupBy from 'lodash.groupby';
import _get from 'lodash.get';
import { formatData } from 'utils';
import dayjs from 'dayjs';

export const isAllUndefined = (cell, field) => cell.rowNode.children
  .every((childIndex) => _get(
    cell, `colDef.fullData.rows[${childIndex}].${field}`,
  ) === undefined);
export const multiplePercentage = (val, count = 100) => (val === undefined
  ? undefined : val * count);
export const division = (a, b) => {
  if (b === undefined || a === undefined) {
    return undefined;
  }

  if (!a || !b) {
    return 0;
  }

  return a / b;
};
export const renderCell = (cell) => {
  if (cell.value === undefined) {
    return '-';
  }

  return cell.value;
};
export const renderCellFormatted = (cell) => {
  if (cell.value === undefined) {
    return '-';
  }

  return formatData(cell.value);
};
export const renderHeader = ({ colDef }) => (
  <div
    title={colDef.title || colDef.headerName}
    style={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
    }}
  >
    <div
      title={colDef.title}
      style={colDef.isMultiLine ? {
        wordBreak: 'initial',
        flexWrap: 'wrap',
        whiteSpace: 'normal',
        lineHeight: '20px',
      } : {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {colDef.headerName}
      {colDef.postfix && colDef.postfix}
    </div>
    <LabelWithAsterisk
      label=""
      withAsterisk={false}
      tooltipText={colDef.tooltip}
      wrapperStyles={{
        marginBottom: 0,
      }}
    />
  </div>
);
export const wrapBold = (v) => <div className="bold">{v}</div>;

const pushFields = {
  delivery_rate: ['push_delivered_count', 'push_send_count'],
  open_per_delivered: ['push_open_count', 'push_send_count'],
  open_per_sent: ['push_open_count', 'push_delivered_count'],
};
// render only total day value
export const renderOnlyTotal = (cell) => {
  if (cell.rowNode.children) {
    const sum = cell.colDef.total[cell.rowNode.groupingKey][cell.colDef.field];
    if (sum === undefined) return '-';

    return sum;
  }

  return '-';
};
// render total day value from data.total (when collapsed)
// and render row value if don't have childs form cell
export const renderTotalAndConstantRows = (cell) => {
  if (cell.rowNode.children) {
    const sum = cell.colDef.total[cell.rowNode.groupingKey][cell.colDef.field];
    if (sum === undefined) return '-';

    return sum;
  }

  return cell.value;
};

export const renderOnlyTotalPercentage = (cell) => {
  if (cell.rowNode.groupingKey === 'total') {
    return '-';
  }

  if (cell.rowNode.children) {
    const sum = cell.colDef.total[cell.rowNode.groupingKey][cell.colDef.field];
    if (sum === undefined) return '-';

    return formatData(sum);
  }

  return '-';
};
export const renderTotalPercentageAndRow = (cell) => {
  if (cell.rowNode.groupingKey === 'total') {
    return '-';
  }

  if (cell.rowNode.children) {
    const sum = cell.colDef.total[cell.rowNode.groupingKey][cell.colDef.field];
    if (sum === undefined) return '-';

    return formatData(sum);
  }

  return formatData(cell.value);
};

export const renderWithSum = (cell) => {
  if (cell.rowNode.children) {
    if (isAllUndefined(cell, cell
      .colDef.field)) return '-';

    return formatData(cell.rowNode.children
      .reduce((acc, val) => acc
            + (+_get(cell, `colDef.fullData.rows[${val}].${cell
              .colDef.field}`, 0)), 0));
  }

  if (cell.value === undefined) {
    return '-';
  }

  return formatData(cell.value);
};
export const renderOnlyChilds = (cell) => {
  if (cell.rowNode.children) return null;

  return cell.value;
};
export const renderAudience = (cell) => {
  if (!cell.rowNode.children) {
    return '';
  }
  const { rows } = cell.colDef.fullData;
  const total = rows
    .reduce((sum, val) => sum + (+val.push_send_count || 0), 0);

  const variantSum = cell.rowNode.children
    .reduce((acc, val) => acc
          + (+rows[val].push_send_count || 0), 0);

  return formatData(multiplePercentage(division(variantSum, total)));
};
export const renderValueAndTotalRelation = (cell) => {
  if (cell.rowNode.children) {
    // check if all items is '-''
    const [dividend, divisor] = pushFields[cell.colDef.field];

    if (isAllUndefined(cell, dividend)
        || isAllUndefined(cell, divisor)) return '-';
    const { rows } = cell.colDef.fullData;

    const sumDividend = cell.rowNode.children
      .reduce((acc, val) => acc
            + (+(rows[val][dividend]) || 0), 0);
    const sumDivisor = cell.rowNode.children
      .reduce((acc, val) => acc
            + (+(rows[val][divisor]) || 0), 0);
    const result = multiplePercentage(division(sumDividend, sumDivisor));

    return formatData(result);
  }

  if (cell.value === undefined) {
    return '-';
  }

  return formatData(cell.value);
};
export const renderDate = (cell) => formatDate(cell.value, DATE_FORMAT);

export const getFieldsEngOrFirstLang = (data) => {
  const languages = getFieldByKey(data.campaign.settings, 'languages');

  return languages.find((l) => l.locale === 'en') || languages[0];
};

// set withNull = true if we want show null as productId
export const getVariants = (data, groupProp = 'variant') => Object
  .keys(_groupBy(data, groupProp))
  .filter((item) => item !== 'null')
  .filter((v) => !!v);

export const getInitialDay = (rows) => getValidDate(dayjs(rows[0].date)
  .subtract(1, 'day'), DATE_CHART_FORMAT);
