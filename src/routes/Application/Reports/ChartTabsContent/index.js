import React, { useState } from 'react';

import Chart from 'routes/Application/Reports/ChartTabsContent/Chart';
import {
  CHART_TAB_VALUE, variantColors,
} from 'routes/Application/Reports/ChartTabsContent/constants';
import { getVariants } from 'routes/Application/Reports/Statistic/utils';
import { STATISTIC_HEADER_NAMES } from 'routes/Application/Reports/constants';
import {
  fillEmptyChartRowFields, getChartRows, getChartRowsPushVariants, getLineKeys,
}
  from 'routes/Application/Reports/ChartTabsContent/utils';
import { campaignType } from 'components/constants';

const pushPerformanceFields = ['delivery_rate',
  'open_per_delivered',
  'open_per_sent'];
const pushFields = [
  ...pushPerformanceFields,
  'push_delivered_count',
  'push_open_count',
  'push_send_count'];
const getVariantsByType = (statistics, tabValue, type) => {
  if (tabValue === CHART_TAB_VALUE.VARIANTS) {
    return pushFields;
  } if (type === campaignType.inAppHTML) {
    return [];
  } if (type === campaignType.inAppSubScreen) {
    return ['null', ...getVariants(statistics?.data, 'variant')];
  }

  return getVariants(statistics?.data);
};
export default ({
  tabValue, chartWidth, statistics, statistic, nameMapper,
  type, pageId,
}) => {
  // for variants tab we use data fields as variants
  const variantList = getVariantsByType(statistics, tabValue, type);
  const {
    chartRows,
    variantChartRows,
    total,
  } = statistic.getStatistic(
    statistics?.labels, statistics?.data || [],
    null,
    '',
    nameMapper,
    pageId,
  );
  const [variant, setVariant] = useState(variantList[0]);
  const rows = getChartRows(
    {
      variantList, chartRows, variant, type, total,
    },
  );

  switch (tabValue) {
    case CHART_TAB_VALUE.PRODUCT_VOLUME:
    case CHART_TAB_VALUE.VOLUME:

      return (
        <Chart
          rows={fillEmptyChartRowFields(rows, getLineKeys(statistic.lines.volumeLines))}
          lines={statistic.lines.volumeLines}
          chartWidth={chartWidth}
          variant={variant}
          setVariant={setVariant}
          variantsArr={variantList}
          nameMapper={nameMapper}
        />
      );
    case CHART_TAB_VALUE.PRODUCT_PERFORMANCE:
    case CHART_TAB_VALUE.PERFORMANCE:

      return (
        <Chart
          rows={fillEmptyChartRowFields(rows, getLineKeys(
            statistic.lines.performanceLines,
          ))}
          lines={statistic.lines.performanceLines}
          yTickFormatter={(val) => `${val}%`}
          chartWidth={chartWidth}
          variant={variant}
          setVariant={setVariant}
          variantsArr={variantList}
          nameMapper={nameMapper}
          isPerformanceField
        />
      );
    case CHART_TAB_VALUE.VARIANTS: {
      const lines = getVariants(statistics.data).map((v, ind) => ({
        name: v,
        dataKey: v,
        color: variantColors[ind],
      }));
      const isPerformanceField = pushPerformanceFields.includes(variant);

      return (
        <Chart
          rows={fillEmptyChartRowFields(
            getChartRowsPushVariants({ variant, variantChartRows }),
            getLineKeys(lines),
          )}
          lines={lines}
          chartWidth={chartWidth}
          variant={variant}
          setVariant={setVariant}
          variantsArr={pushFields}
          nameMapper={STATISTIC_HEADER_NAMES}
          yTickFormatter={isPerformanceField && ((val) => `${val}%`)}
          isPerformanceField={isPerformanceField}
        />
      );
    }
    case CHART_TAB_VALUE.FINANCE: {
      return (
        <Chart
          rows={fillEmptyChartRowFields(rows, getLineKeys(statistic.lines.financeLines))}
          lines={statistic.lines.financeLines}
          chartWidth={chartWidth}
          variant={variant}
          yTickFormatter={(val) => `${val}$`}
          setVariant={setVariant}
          variantsArr={variantList}
          nameMapper={nameMapper}
          isFinanceField
        />
      );
    }
    case CHART_TAB_VALUE.SCREEN_VOLUME: {
      return (
        <Chart
          rows={fillEmptyChartRowFields(chartRows,
            getLineKeys(statistic.lines.screenVolumeLines))
            .filter((r) => r.variant === 'null')}
          lines={statistic.lines.screenVolumeLines}
          chartWidth={chartWidth}
          variantsArr={[]}
          nameMapper={nameMapper}
        />
      );
    }
    case CHART_TAB_VALUE.SCREEN_PERFORMANCE: {
      return (
        <Chart
          rows={fillEmptyChartRowFields(rows,
            getLineKeys(statistic.lines.screenPerformanceLines))}
          lines={statistic.lines.screenPerformanceLines}
          chartWidth={chartWidth}
          variant={variant}
          setVariant={setVariant}
          yTickFormatter={((val) => `${val}%`)}
          variantsArr={variantList}
          nameMapper={nameMapper}
          isPerformanceField
        />
      );
    }
    default:
      return null;
  }
};
