import _groupBy from 'lodash.groupby';
import dayjs from 'dayjs';

import { getValidDate } from 'utils/dateUtils';
import { DATE_CHART_FORMAT } from 'utils/constants/date';
import { renderCell, renderHeader } from 'routes/Application/Reports/Statistic/utils';

const addInitialDataToRows = (rows) => {
  if (rows.length) {
    // to start chart from 0 dot when we have 1 item
    return [
      {
        id: 'initial',
        date: getValidDate(dayjs(rows[0].date).subtract(1, 'day'), DATE_CHART_FORMAT),
        impression: 0,
      }, ...rows,
    ];
  }

  return rows;
};

const getFormattedData = (row, d) => ({
  date: getValidDate(d, DATE_CHART_FORMAT),
  impression: row.impression || 0,
});

const DeeplinkColumns = [
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
];
const columnsWithoutDate = DeeplinkColumns.map((c) => c.field)
  .filter((field) => field !== 'date');

export const getTotalDL = (rows) => {
  const total = {};
  columnsWithoutDate
    .forEach((column) => {
      total[column] = rows
        .reduce((a, b) => a + (b[column] || 0), 0);
    });

  return total;
};

export const getStatisticDL = (labels, data) => {
  const groupedValues = _groupBy(data, 'date');

  const rows = Object.keys(groupedValues)
    .map((date, id) => {
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
    columns: DeeplinkColumns,
    chartRows: addInitialDataToRows(rows),
  };
};
