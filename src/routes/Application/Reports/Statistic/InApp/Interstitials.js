import _groupBy from 'lodash.groupby';

import { getValidDate } from 'utils/dateUtils';
import { DATE_CHART_FORMAT } from 'utils/constants/date';
import {
  division, getInitialDay, multiplePercentage, renderCell, renderHeader,
}
  from 'routes/Application/Reports/Statistic/utils';
import { formatData } from 'utils';

const addInitialDataToRows = (rows) => {
  if (rows.length) {
    // to start chart from 0 dot when we have 1 item
    return [
      {
        id: 'initial',
        date: getInitialDay(rows),
        impression: 0,
        inters_revenue_usd: 0,
        inters_ecpm_usd: 0,
      }, ...rows,
    ];
  }

  return rows;
};

const getFormattedData = (row, d) => ({
  date: getValidDate(d, DATE_CHART_FORMAT),
  impression: row.impression,
  inters_revenue_usd: row.inters_revenue_usd ? row.inters_revenue_usd / 100 : undefined,
  inters_ecpm_usd: row.inters_ecpm_usd ? row.inters_ecpm_usd / 100 : undefined,
});

const interstitialColumns = [
  {
    field: 'date',
    headerName: 'date',
    flex: 1,
    sortComparator: (v1, v2) => new Date(v1).getTime() - new Date(v2).getTime(),
  },
  {
    field: 'impression',
    headerName: 'impression',
    renderHeader,
    renderCell,
    flex: 1,
    sortable: false,
  },
  {
    field: 'inters_revenue_usd',
    headerName: 'Ad Revenue, $',
    renderHeader,
    renderCell,
    flex: 1,
    sortable: false,
    tooltip: 'Ad Revenue is how much'
        + ' ad revenue an Interstitial'
        + ' campaign earns. Data provided '
        + 'by Applovin MAX mediation based on ILRD',
  },
  {
    field: 'inters_ecpm_usd',
    headerName: 'eCPM, $',
    renderHeader,
    renderCell: (cell) => {
      if (!cell.value) {
        if (!cell.row.inters_revenue_usd) {
          return '-';
        }

        return '0.00';
      }

      return cell.value;
    },
    flex: 1,
    sortable: false,
    tooltip: 'eCPM is how much ad revenue a campaign earns per 1,000'
        + ' impressions served. Calculated as (Ad Revenue/Impressions)*1000',

  },
];
const columnsWithoutDate = interstitialColumns.map((c) => c.field)
  .filter((field) => field !== 'date');
export const getTotalInterstitials = (rows) => {
  const total = {};
  columnsWithoutDate
    .forEach((column) => {
      total[column] = formatData(rows
        .reduce((a, b) => a + (b[column] || 0), 0));
    });

  total.inters_ecpm_usd = formatData(multiplePercentage(division(
    total.inters_revenue_usd, total.impression,
  ), 1000));

  return total;
};

export const getStatisticInterstitials = (labels, data) => {
  const groupedValues = _groupBy(data, 'date');

  const rows = Object.keys(groupedValues).map((date, id) => {
    const row = {};
    groupedValues[date].forEach((item) => {
      row[item.type] = item.count;
    });

    return {
      id,
      ...getFormattedData(row, date),
    };
  });

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
    columns: interstitialColumns,
    chartRows: addInitialDataToRows(rows),
  };
};
