import _groupBy from 'lodash.groupby';

import {
  division, multiplePercentage, getVariants, getInitialDay,
} from 'routes/Application/Reports/Statistic/utils';
import variantPushColumns
  from 'routes/Application/Reports/Statistic/Push/Columns/Variant';
import singlePushColumns
  from 'routes/Application/Reports/Statistic/Push/Columns/Single';
import { getValidDate } from 'utils/dateUtils';
import { DATE_CHART_FORMAT } from 'utils/constants/date';
import { formatData } from 'utils';

const addInitialDataToRows = (rows) => {
  if (rows.length) {
    // to start chart from 0 dot when we have 1 item
    return [
      {
        id: 'initial',
        date: getInitialDay(rows),
        push_open_count: 0,
        push_send_count: 0,
        delivered: 0,
        delivery_rate: 0,
        open_per_sent: 0,
        open_per_delivered: 0,
      }, ...rows,
    ];
  }

  return rows;
};

const getFormattedData = (row, d) => ({
  ...row,
  date: getValidDate(d, DATE_CHART_FORMAT),
  delivery_rate: multiplePercentage(division(row.push_delivered_count,
    row.push_send_count)),
  open_per_sent: multiplePercentage(division(row.push_open_count,
    row.push_send_count)),
  open_per_delivered: multiplePercentage(division(row.push_open_count,
    row.push_delivered_count)),
});

// for single mode, without variants
export const getTotalPush = (rows) => {
  const total = {};
  ['push_send_count', 'push_delivered_count', 'push_open_count']
    .forEach((column) => {
      total[column] = rows
        .reduce((a, b) => a + (b[column] || 0), 0);
    });

  const delivery_rate = multiplePercentage(division(
    total.push_delivered_count, total.push_send_count,
  ));
  const open_per_sent = multiplePercentage(division(
    total.push_open_count, total.push_send_count,
  ));
  const open_per_delivered = multiplePercentage(division(
    total.push_open_count, total.push_delivered_count,
  ));
  total.delivery_rate = delivery_rate === undefined ? '-' : formatData(delivery_rate);
  total.open_per_sent = open_per_sent === undefined ? '-' : formatData(open_per_sent);
  total.open_per_delivered = open_per_delivered === undefined
    ? '-' : formatData(open_per_delivered);

  return total;
};
const defaultValues = {};
const fields = ['delivery_rate',
  'open_per_delivered',
  'open_per_sent',
  'push_delivered_count',
  'push_open_count',
  'push_send_count'];
export const getStatisticPush = (labels, data) => {
  const groupedValues = _groupBy(data, 'date');
  const variantsArr = getVariants(data);

  const rows = Object.keys(groupedValues).reduce((sumArr, date) => {
    const variantValues = _groupBy(groupedValues[date], 'variant');
    const variantRows = Object.keys(variantValues).map((v) => {
      // if without variants show null variant
      if (v === 'null' && variantsArr.length) return false;
      const row = {
        ...defaultValues,
        variant: v,
        date,
      };
      const items = variantValues[v];
      items.forEach((item) => {
        row[item.type] = item.count || 0;
      });

      return getFormattedData(row, date);
    })
      .filter(Boolean);

    return sumArr.concat(variantRows);
  }, [])
    .map((r, id) => ({ ...r, id }));

  const groupedRows = _groupBy(rows, 'date');

  const variantData = Object.keys(groupedRows).reduce((acc, date) => {
    const value = fields.map((field) => {
      const row = {
        date,
        variant: field,
      };
      groupedRows[date].forEach((item) => {
        row[item.variant] = item[field];
      });

      return row;
    });

    return acc.concat(value);
  }, []);

  return {
    initialSorting: {
      sorting: {
        sortModel: [
          {
            field: 'date',
            sort: 'desc',
          },
        ],
      },
    },
    rows,
    columns: variantsArr.length ? variantPushColumns : singlePushColumns,
    chartRows: addInitialDataToRows(rows),
    variantsArr,
    variantChartRows: addInitialDataToRows(variantData),
  };
};
