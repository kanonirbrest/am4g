import { campaignType } from 'components/constants';

export const fillEmptyChartRowFields = (rows, fields = []) => rows.map((row) => {
  fields.forEach((key) => {
    if (!row[key]) {
      // eslint-disable-next-line no-param-reassign
      row[key] = 0;
    }
  });

  return row;
});
export const getChartRows = (
  {
    variantList, chartRows, variant, type, total,
  },
) => {
  // data for single table
  if (!variantList.length
      || campaignType.inAppHTML === type) {
    return chartRows;
  }

  if (variant === 'null') {
    return Object.keys(total).map((key) => total[key]);
  }

  // filter by selected variant/productId
  return chartRows
    .filter(
      (item) => item.variant === variant || item.id === 'initial',
    );
};

// data for push reversed chart
export const getChartRowsPushVariants = (
  { variant, variantChartRows },
) => variantChartRows.filter(
  (item) => item.variant === variant || item.id === 'initial',
);
export const getLineKeys = (lines) => lines.map((l) => l.dataKey);
