import { campaignType } from 'components/constants';

import { getStatisticPush, getTotalPush }
  from 'routes/Application/Reports/Statistic/Push';
import {
  getStatisticSubScreen, getTotalSubScreen,
}
  from 'routes/Application/Reports/Statistic/InApp/SubScreen';
import { getStatisticDL, getTotalDL }
  from 'routes/Application/Reports/Statistic/InApp/Deeplink';
import { getTotalInterstitials, getStatisticInterstitials }
  from 'routes/Application/Reports/Statistic/InApp/Interstitials';
import { getStatisticHtml, getTotalHtml, HTMLPostfix }
  from 'routes/Application/Reports/Statistic/InApp/Html';
import {
  GENERAL_STATS_TAB,
  statisticMultiTabs,
  statisticTabs,
} from 'routes/Application/Reports/constants';
import {
  CHART_TAB_VALUE, performanceLines, variantColors, volumeLines,
}
  from 'routes/Application/Reports/ChartTabsContent/constants';
import { getStatisticRateReview, getTotalRateReview }
  from 'routes/Application/Reports/Statistic/InApp/RateReview';
import { getVariants } from 'routes/Application/Reports/Statistic/utils';

export const getStatisticByType = (type, labels, pageId) => {
  switch (type) {
    case campaignType.pushScheduled:
    case campaignType.pushTriggeredCancelPaid:
    case campaignType.pushTriggeredCancelTrail:
    case campaignType.pushTriggeredSessionEnd:
      return {
        getStatistic: getStatisticPush,
        lines: {
          volumeLines,
          performanceLines,
        },
        groupingColumns: ['variant'],
      };
    case campaignType.inAppSubScreen: {
      return {
        getStatistic: getStatisticSubScreen,
        groupingColumns: ['date'],
        lines: {
          volumeLines: [{
            name: 'Clicks',
            dataKey: 'clicks',
            color: variantColors[1],
          }, {
            name: 'Purchases',
            dataKey: 'sub_screen_purchased',
            color: variantColors[2],
          }, {
            name: 'Purchases Failed',
            dataKey: 'sub_screen_failed',
            color: variantColors[3],
          }],
          performanceLines: [
            {
              name: 'CVR',
              dataKey: 'sub_screen_cvr',
              color: variantColors[1],
            },
          ],
          financeLines: [
            {
              name: 'LTV',
              dataKey: 'sub_screen_ltv_usd',
              color: variantColors[1],
            },
            {
              name: 'Projected Revenue',
              dataKey: 'sub_screen_revenue_usd',
              color: variantColors[3],
            },
            {
              name: 'eCPM',
              dataKey: 'sub_screen_ecpm_usd',
              color: variantColors[4],
            },
          ],
          screenVolumeLines: [{
            name: 'Impression',
            dataKey: 'impression',
            color: variantColors[1],
          }, {
            name: 'Screen Closed',
            dataKey: 'Premium Screen Closed',
            color: variantColors[2],
          }],
          screenPerformanceLines: [{
            name: 'CTR',
            dataKey: 'sub_screen_ctr',
            color: variantColors[3],
          }, {
            name: 'I2P',
            dataKey: 'sub_screen_i2p',
            color: variantColors[4],
          }],
        },
      };
    }
    case campaignType.inAppRateReview:
      return {
        getStatistic: getStatisticRateReview,
        lines: {
          volumeLines: [{
            name: 'impression',
            dataKey: 'impression',
            color: '#22BB9F',
          }],
          performanceLines: [],
        },
      };
    case campaignType.inAppDeeplink:
      return {
        getStatistic: getStatisticDL,
        lines: {
          volumeLines: [{
            name: 'impression',
            dataKey: 'impression',
            color: '#22BB9F',
          }],
          performanceLines: [],
        },
      };
    case campaignType.inAppInterstitials:
      return {
        getStatistic: getStatisticInterstitials,
        lines: {
          volumeLines: [{
            name: 'Impression',
            dataKey: 'impression',
            color: variantColors[1],
          }],
          financeLines: [{
            name: 'Ad Revenue',
            dataKey: 'inters_revenue_usd',
            color: variantColors[3],
          }, {
            name: 'eCPM',
            dataKey: 'inters_ecpm_usd',
            color: variantColors[5],
          }],
        },
      };
    case campaignType.inAppHTML: {
      const htmlLabels = [(pageId === GENERAL_STATS_TAB ? 'impression'
        : 'page_shown'), ...labels
        .filter((key) => key.includes('button')
            || key.includes('image')
            || key === 'close')];
      const performanceLabels = labels
        .filter((key) => key.includes('button')
            || key.includes('image')
            || key === 'close')
        .map((key) => `${key}${HTMLPostfix}`);

      return {
        getStatistic: getStatisticHtml,
        lines: {
          volumeLines: htmlLabels.map((v, i) => ({
            color: variantColors[i],
            name: v,
            dataKey: v,
          })),
          performanceLines: performanceLabels.map((v, i) => ({
            color: variantColors[i],
            name: v,
            dataKey: v,
          })),
        },
      };
    }

    default:
      return {
        lines: {
          volumeLines: [],
          performanceLines: [],
        },
        getStatistic: () => ({
          chartRows: [],
          rows: [],
          columns: [],
        }),
      };
  }
};

export const getTabsByType = (type, statistics = {}, page) => {
  switch (type) {
    case campaignType.pushScheduled:
    case campaignType.pushTriggeredCancelTrail:
    case campaignType.pushTriggeredCancelPaid:
    case campaignType.pushTriggeredSessionEnd: {
      return getVariants(statistics.data).length ? statisticMultiTabs : statisticTabs;
    }
    case campaignType.inAppRateReview:
    case campaignType.inAppDeeplink:
      return [
        CHART_TAB_VALUE.VOLUME,
      ];
    case campaignType.inAppInterstitials:
      return [
        CHART_TAB_VALUE.VOLUME,
        CHART_TAB_VALUE.FINANCE,
      ];
    case campaignType.inAppSubScreen:
      return [
        CHART_TAB_VALUE.SCREEN_VOLUME, CHART_TAB_VALUE.SCREEN_PERFORMANCE,
        CHART_TAB_VALUE.PRODUCT_VOLUME, CHART_TAB_VALUE.PRODUCT_PERFORMANCE,
        CHART_TAB_VALUE.FINANCE,
      ];
    case campaignType.inAppHTML:
      if (page === 'general') {
        return [
          CHART_TAB_VALUE.VOLUME,
        ];
      }

      return statisticTabs;

    default:
      return statisticTabs;
  }
};

export const getTotal = (type) => {
  switch (type) {
    case campaignType.pushScheduled:
    case campaignType.pushTriggeredCancelPaid:
    case campaignType.pushTriggeredCancelTrail:
    case campaignType.pushTriggeredSessionEnd:
      return getTotalPush;
    case campaignType.inAppSubScreen:
      return getTotalSubScreen;
    case campaignType.inAppRateReview:
      return getTotalRateReview;
    case campaignType.inAppHTML:
      return getTotalHtml;
    case campaignType.inAppDeeplink:
      return getTotalDL;
    case campaignType.inAppInterstitials:
      return getTotalInterstitials;
    default:
      return () => ({});
  }
};
