import _groupBy from 'lodash.groupby';

import { formatDate } from 'utils/dateUtils';
import {
  renderOnlyTotal, renderHeader, renderWithSum,
  renderOnlyChilds, getVariants, multiplePercentage, division, getInitialDay,
  renderTotalPercentageAndRow, renderTotalAndConstantRows,
} from 'routes/Application/Reports/Statistic/utils';
import { formatData } from 'utils';

const addInitialDataToRows = (rows) => {
  if (rows.length) {
    // to start chart from 0 dot when we have 1 item
    return [
      {
        id: 'initial',
        date: getInitialDay(rows),
      }, ...rows,
    ];
  }

  return rows;
};

const subScreenColumns = [
  {
    field: 'date',
    headerName: 'date',
    minWidth: 200,
    flex: 1,
    sortComparator: (v1, v2) => new Date(v1).getTime() - new Date(v2).getTime(),
  },
  {
    field: 'variant',
    headerName: 'product',
    renderCell: renderOnlyChilds,
    renderHeader,
    sortable: false,
    minWidth: 280,
    flex: 1,
  },
  {
    field: 'impression',
    headerName: 'impression',
    renderHeader,
    renderCell: renderTotalAndConstantRows,
    minWidth: 150,
    flex: 1,
    sortable: false,
    tooltip: 'We assume that several products are '
        + 'displayed on the subscription screen simultaneously',
  },
  {
    field: 'clicks',
    headerName: 'clicks',
    renderHeader,
    renderCell: renderWithSum,
    minWidth: 120,
    flex: 1,
    tooltip: 'Number of clicks on the button offering the specific product,'
        + ' calculation is based on event Premium option'
        + ' selected that contains product ID.',
    sortable: false,
  },
  {
    field: 'sub_screen_ctr',
    headerName: 'CTR, %',
    renderHeader,
    renderCell: renderTotalPercentageAndRow,
    minWidth: 120,
    flex: 1,
    sortable: false,
    tooltip: 'Amount of clicks divided by amount of impressions',
  },
  {
    field: 'sub_screen_purchased',
    headerName: 'purchases',
    renderCell: renderWithSum,
    renderHeader,
    minWidth: 140,
    flex: 1,
    sortable: false,
    tooltip: 'Campaign level purchases. Provided by DWH',
  },
  {
    field: 'sub_screen_failed',
    headerName: 'purchases failed',
    renderCell: renderWithSum,
    renderHeader,
    isMultiLine: true,
    sortable: false,
    minWidth: 180,
    flex: 1,
    tooltip: 'Amount of failed purchases. Calculation based'
        + ' on Checkout Failed event when there was an '
        + "interaction with the store but user didn't continue the purchase",
  },
  {
    field: 'Premium Screen Closed',
    headerName: 'screen closed',
    renderCell: renderOnlyTotal,
    renderHeader,
    isMultiLine: true,
    sortable: false,
    minWidth: 150,
    flex: 1,
    tooltip: 'Number of times the screen was closed, '
        + 'calculation is based on event Premium screen closed.',
  },
  {
    field: 'sub_screen_cvr',
    headerName: 'cvr, %',
    renderCell: renderTotalPercentageAndRow,
    renderHeader,
    minWidth: 120,
    flex: 1,
    tooltip: 'Amount of purchases divided by amount of clicks',
    sortable: false,
  },
  {
    field: 'sub_screen_revenue_usd',
    headerName: 'projected revenue, $',
    renderCell: renderWithSum,
    renderHeader,
    sortable: false,
    minWidth: 150,
    flex: 1,
    isMultiLine: true,
    tooltip: 'How much revenue campaign will'
        + ' earn based on product purchased.'
        + ' Calculated as Purchases '
        + 'multiplied by ltv',
  },
  {
    field: 'sub_screen_ecpm_usd',
    headerName: 'ecpm, $',
    renderCell: renderTotalPercentageAndRow,
    renderHeader,
    minWidth: 120,
    flex: 1,
    tooltip: 'eCPM is how much projected revenue '
        + 'a campaign earns per 1,000 impressions'
        + ' served. Calculated as'
        + ' (Projected Revenue/Impressions)*1000',
    sortable: false,
  },
  {
    field: 'sub_screen_ltv_usd',
    headerName: 'ltv, $',
    renderCell: renderTotalPercentageAndRow,
    renderHeader,
    minWidth: 100,
    flex: 1,
    tooltip: 'LTV is an estimate of the average revenue a customer will '
        + 'generate over the time that they use a given product. '
        + 'Calculation based on 2 years historical data',
    sortable: false,
  },
  {
    field: 'sub_screen_i2p',
    headerName: 'I2P, %',
    renderCell: renderTotalPercentageAndRow,
    renderHeader,
    minWidth: 100,
    flex: 1,
    tooltip: 'Amount of purchases divided by amount of impressions',
    sortable: false,
  },
];
const formatDataSS = (row) => ({
  ...row,
  // we should divide only backend metrics that not calculated in frontend
  sub_screen_ltv_usd: row.sub_screen_ltv_usd ? row.sub_screen_ltv_usd / 100 : undefined,
  sub_screen_revenue_usd: row.sub_screen_revenue_usd
    ? row.sub_screen_revenue_usd / 100 : undefined,
  sub_screen_cvr: row.sub_screen_cvr ? row.sub_screen_cvr / 100 : undefined,
  sub_screen_ctr: row.sub_screen_ctr ? row.sub_screen_ctr / 100 : undefined,
  sub_screen_i2p: row.sub_screen_i2p ? row.sub_screen_i2p / 100 : undefined,
});
// total for date
const getTotal = (values = [], date, dataRows) => {
  const row = {
    date,
  };
  values.forEach((item) => {
    row[item.type] = item.count;
  });
  // sum by all product id-s for current day
  const clicks = dataRows.reduce((acc, cur) => acc + (cur.clicks || 0), 0);
  const sub_screen_purchased = dataRows
    .reduce((acc, cur) => acc + (cur.sub_screen_purchased || 0), 0);
  const sub_screen_failed = dataRows
    .reduce((acc, cur) => acc + (cur.sub_screen_failed || 0), 0);
  const sub_screen_revenue_usd = dataRows
    .reduce((acc, cur) => acc + (cur.sub_screen_revenue_usd || 0), 0);
  const sub_screen_ecpm_usd = dataRows
    .reduce((acc, cur) => acc + (cur.sub_screen_ecpm_usd || 0), 0);
  const sub_screen_ltv_usd = division(sub_screen_revenue_usd, sub_screen_purchased);
  const sub_screen_cvr = multiplePercentage(
    division(sub_screen_purchased, clicks),
  );
  const sub_screen_ctr = multiplePercentage(
    division(clicks, row.impression),
  );
  const sub_screen_i2p = multiplePercentage(
    division(sub_screen_purchased, row.impression),
  );

  return {
    ...row,
    clicks,
    sub_screen_purchased,
    sub_screen_failed,
    sub_screen_revenue_usd,
    sub_screen_ltv_usd,
    sub_screen_ctr,
    sub_screen_cvr,
    sub_screen_ecpm_usd,
    sub_screen_i2p,
  };
};
export const getStatisticSubScreen = (labels, data) => {
  const groupedValues = _groupBy(data, 'date');
  const variantsArr = getVariants(data);
  const total = {};
  // we push here data with variant null and with productID as well
  const chartRows = [];
  const rows = Object.keys(groupedValues).reduce((sumArr, date) => {
    const variantValues = _groupBy(groupedValues[date], 'variant');
    const isOnlyNullVar = Object.keys(variantValues)
      .filter((v) => v !== 'null').length === 0;

    const variantRows = Object.keys(variantValues)
      .map((v) => {
        const row = {
          variant: v,
          date: formatDate(date),
        };
        const items = variantValues[v];
        items.forEach((item) => {
          if (item.type.trim() === 'Premium Option Selected') {
            row.clicks = item.count;
          } else {
            row[item.type] = item.count;
          }
        });
        const nullImpression = variantValues.null?.find(
          (item) => item.type === 'impression',
        )?.count || undefined;

        chartRows.push(
          {
            ...formatDataSS({
              ...row,
              sub_screen_ecpm_usd: multiplePercentage(division(
                row.sub_screen_revenue_usd, nullImpression,
              ), 10),
              impression: nullImpression,
            }),
            sub_screen_ctr: multiplePercentage(division(
              row.clicks, nullImpression,
            )),
            sub_screen_i2p: multiplePercentage(division(
              row.sub_screen_purchased, nullImpression,
            )),
          },
        );
        if (isOnlyNullVar) {
          return formatDataSS(row);
        }

        // if not isOnlyNullVar then we should add only
        // data with product id, if we have only variant=null object
        // then we should add it to show as collapsed data (added above)
        // here we return false because we have data with product id for
        // this date
        if (v === 'null') {
          return false;
        }

        // to show in table with product id
        return {
          ...formatDataSS({
            ...row,
            sub_screen_ecpm_usd: multiplePercentage(division(
              row.sub_screen_revenue_usd, nullImpression,
            ), 10),
            impression: nullImpression,
          }),
          sub_screen_ctr: multiplePercentage(division(
            row.clicks, nullImpression,
          )),
          sub_screen_i2p: multiplePercentage(division(
            row.sub_screen_purchased, nullImpression,
          )),
        };
      });

    // for collapsed grouping rows
    total[formatDate(date)] = getTotal(variantValues.null, formatDate(date), variantRows);

    return sumArr.concat(variantRows);
  }, [])
    .filter(Boolean)
    .map((r, id) => ({ ...r, id }));

  return {
    initialSorting: {
      sorting: {
        sortModel: [
          {
            field: '__row_group_by_columns_group__',
            sort: 'desc',
          },
        ],
      },
    },
    rows,
    chartRows: addInitialDataToRows(chartRows, labels),
    columns: subScreenColumns,
    variantsArr,
    total,
    isShowProPagination: true,
  };
};

export const getSSNameMapper = (labels) => {
  const mapper = {};
  labels.forEach((l) => {
    if (l.includes('Premium Option') && l !== 'Premium Option Closed') {
      mapper[l] = l.trim().split(' ').pop();
    } else {
      mapper[l] = l;
    }
  });

  return { null: 'All', mapper };
};

// whole total
export const getTotalSubScreen = (rows) => {
  const total = {};
  subScreenColumns.map((c) => (c.field))
    .filter((key) => !['date', 'variant'].includes(key))
    .forEach((column) => {
      const isAllUndefined = rows
        .every((row) => row[column] === undefined);

      total[column] = isAllUndefined ? '-' : formatData(rows
      // calculate only base on day-total values
        .filter(({ variant }) => !variant)
        .reduce((a, b) => a + (b[column] || 0), 0));
    });
  total.sub_screen_i2p = formatData(multiplePercentage(division(
    total.sub_screen_purchased, total.impression,
  )));
  total.sub_screen_ctr = formatData(multiplePercentage(division(
    total.clicks, total.impression,
  )));
  total.sub_screen_cvr = formatData(multiplePercentage(division(
    total.sub_screen_purchased, total.clicks,
  )));
  total.sub_screen_ltv_usd = formatData(division(
    total.sub_screen_revenue_usd, total.sub_screen_purchased,
  ));
  const ecpm = division(
    total.sub_screen_revenue_usd, total.impression,
  );
  total.sub_screen_ecpm_usd = formatData(ecpm !== undefined ? ecpm * 1000 : undefined);

  // order fields
  // and one metric variant
  return { variant: '', ...total };
};
