import { getTotal, getTabsByType, getStatisticByType }
  from 'routes/Application/Reports/utils';
import { getHTMLNameMapper } from 'routes/Application/Reports/Statistic/InApp/Html';
import { campaignType } from 'components/constants';
import mockData, { PushProps, RRProps, HTMLProps } from './mockData';

describe('Statistic Utils', () => {
  it('should calculate Push Scheduled total', () => {
    expect(getTotal(PushProps.type)(PushProps.rows)).toEqual({
      push_delivered_count: 3,
      delivery_rate: 6.98,
      open_per_delivered: 66.67,
      open_per_sent: 4.65,
      push_open_count: 2,
      push_send_count: 43,
    });
  });
  it('should calculate InApp Html total', () => {
    expect(getTotal(HTMLProps.type)(HTMLProps.rows, HTMLProps.labels))
      .toEqual({
        '2-button': 16,
        '2-button_conversion': 27.59,
        '3-image': 10,
        '3-image_conversion': 17.24,
        '4e4e443b-ec34-4d5a-a822-394c7e2eaa02-button': 1,
        '4e4e443b-ec34-4d5a-a822-394c7e2eaa02-button_conversion': 1.72,
        close: 1,
        close_conversion: 1.72,
        'f4dd9ce2-30e0-4930-a86a-f5c66b714511-image': 1,
        'f4dd9ce2-30e0-4930-a86a-f5c66b714511-image_conversion': 1.72,
        html_text_input_submit: 7,
        page_shown: 0,
      });
  });
  it('should calculate RateReview total', () => {
    expect(getTotal(RRProps.type)(RRProps.rows, RRProps.labels))
      .toEqual({ impression: 11 });
  });
  it('should return RateReview tabs', () => {
    expect(getTabsByType(RRProps.type, RRProps.rows))
      .toEqual(['VOLUME']);
  });
  it('should return InAppHtml tabs', () => {
    expect(getTabsByType(HTMLProps.type, HTMLProps.rows))
      .toEqual(['VOLUME', 'PERFORMANCE']);
  });
  it('should return Push tabs', () => {
    expect(getTabsByType(PushProps.type, PushProps.rows))
      .toEqual(['VOLUME', 'PERFORMANCE']);
  });
  it('should return correct HtML name mapper', () => {
    expect(getHTMLNameMapper(mockData.HtmlCampaignDataAndStats))
      .toEqual({
        '7cfa325c-f047-4557-b6b8-b6b2889c00f4-image': 'deeplink.jpeg',
        '803b5d32-ee34-44e5-94af-66c3c24e5c1b-button': 'Submit',
        close: 'Close',
        html_text_input_submit: 'Feedback submitted',
        type: 'HTML',
      });
  });
  it('should return Html statistic', () => {
    const { getStatistic } = getStatisticByType(
      'TYPE_IN_APP_HTML', mockData.HtmlCampaignDataAndStats.statistics?.labels,
    );
    const stats = getStatistic(mockData.HtmlCampaignDataAndStats.statistics.labels,
      mockData.HtmlCampaignDataAndStats.statistics.data, 'TYPE_IN_APP_HTML', '',
      getHTMLNameMapper(mockData.HtmlCampaignDataAndStats));

    expect(stats.chartRows.length)
      .toBe(3);
    expect(stats.columns.length)
      .toBe(6);
    expect(stats.rows.length)
      .toBe(2);
    expect(stats.rows[0]['7cfa325c-f047-4557-b6b8-b6b2889c00f4-image'])
      .not.toBeNull();
    expect(stats.rows[0]['7cfa325c-f047-4557-b6b8-b6b2889c00f4-image_conversion'])
      .not.toBeNull();
  });
  it('should return Sub Screen statistic', () => {
    const { getStatistic } = getStatisticByType(
      campaignType.inAppSubScreen,
      mockData.SubScreenCampaignDataAndStats.statistics?.labels,
    );
    const stats = getStatistic(mockData.SubScreenCampaignDataAndStats.statistics.labels,
      mockData.SubScreenCampaignDataAndStats.statistics.data);
    expect(stats.chartRows.length)
      .toBe(5);
    expect(stats.columns.length)
      .toBe(13);
    expect(stats.rows.length)
      .toBe(3);

    expect(stats.rows[0].sub_screen_ctr)
      .toBe(1.3761467889908259);
    expect(stats.rows[1].sub_screen_ctr)
      .toBe(7.37221494102228);
    expect(stats.rows[2].sub_screen_ctr)
      .toBe(1.2123197903014418);

    expect(stats.rows[0].impression)
      .toBe(3052);
    expect(stats.rows[1].impression)
      .toBe(3052);
    expect(stats.rows[2].impression)
      .toBe(3052);

    expect(stats.rows[0].sub_screen_i2p)
      .toBe(0.0327653997378768);
    expect(stats.rows[1].sub_screen_i2p)
      .toBe(0.36041939711664484);
    expect(stats.rows[2].sub_screen_i2p)
      .toBe(0.7208387942332897);

    expect(stats.rows[0].sub_screen_cvr)
      .toBe(1.11);
    expect(stats.rows[1].sub_screen_cvr)
      .toBe(2.22);
    expect(stats.rows[2].sub_screen_cvr)
      .toBe(3.33);

    expect(stats.rows[0].sub_screen_ltv_usd)
      .toBe(1);
    expect(stats.rows[1].sub_screen_ltv_usd)
      .toBe(2);
    expect(stats.rows[2].sub_screen_ltv_usd)
      .toBe(3);

    expect(stats.rows[0].sub_screen_ecpm_usd)
      .toBe(3.640235910878113);
    expect(stats.rows[1].sub_screen_ecpm_usd)
      .toBe(7.280471821756226);
    expect(stats.rows[2].sub_screen_ecpm_usd)
      .toBe(10.920707732634337);

    // daily total
    expect(stats.total['Jul 15, 2022']).toEqual({
      date: 'Jul 15, 2022',
      sub_screen_ecpm_usd: 21.841415465268675, // sum of rows
      sub_screen_i2p: 1.1140235910878113, // sub_screen_purchased : impressions
      sub_screen_ctr: 9.960681520314548, // click : impressions * 100
      impression: 3052,
      trigger: 3156,
      'Premium Screen Closed': 2695,
      clicks: 304,
      sub_screen_purchased: 34,
      sub_screen_failed: 207,
      sub_screen_revenue_usd: 66.66,
      sub_screen_ltv_usd: 1.9605882352941175, // revenue : purchases
      sub_screen_cvr: 11.18421052631579, // sub_screen_purchased : clicks * 100
    });
  });
});
