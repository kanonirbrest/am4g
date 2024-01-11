import React, { useRef, useState, useLayoutEffect } from 'react';
import Button from '@mui/material/Button';

import CSV from 'assets/icons/CSV';
import Spinner from 'components/Spinner';
import StyledTabs from 'components/StyledTabs';
import TabPanel from 'components/TabPanel';
import ChartTabsContent from 'routes/Application/Reports/ChartTabsContent';
import useStyles from 'routes/Application/Reports/styles';
import Table from 'routes/Application/Reports/Table';
import { BUTTON_TYPES } from 'utils/styles/common';
import { getStatisticByType, getTabsByType } from 'routes/Application/Reports/utils';
import { getHTMLNameMapper } from 'routes/Application/Reports/Statistic/InApp/Html';
import { campaignType } from 'components/constants';
import { getSSNameMapper } from 'routes/Application/Reports/Statistic/InApp/SubScreen';
import SidePanel from './SidePanel';
import { CAMPAIGN_TYPES_ALLOWED_CSV } from './constants';

export default ({
  data, loading, campaign, tab, setTab,
  settingsData, pageId, purchaseData,
}) => {
  const classes = useStyles();
  const [chartWidth, setChartWidth] = useState(0);
  const chartRef = useRef(false);

  useLayoutEffect(() => {
    // to add initial offset depending on chart width
    // in case if we have 2 or 3 dots
    setChartWidth(chartRef.current?.clientWidth);
  }, [loading, chartRef.current?.clientWidth]);

  if (!data?.statistics || loading) {
    return <div className={classes.spinnerWrapper}><Spinner /></div>;
  }
  const statistic = getStatisticByType(campaign.type, data.statistics?.labels, pageId);
  const purchaseStatistic = getStatisticByType(campaignType.inAppSubScreen, purchaseData?.statistics?.labels);

  const tabs = getTabsByType(campaign.type, data.statistics, pageId);
  let nameMapper = settingsData ? getHTMLNameMapper(settingsData) : null;
  if (campaign.type === campaignType.inAppSubScreen) {
    nameMapper = getSSNameMapper(data.statistics?.labels);
  }
  const disabled = !CAMPAIGN_TYPES_ALLOWED_CSV.includes(campaign.type);
  const baseUrl = String(process.env.REACT_APP_API_END_POINT).split('/admin')[0];
  const downloadUrl = `${baseUrl}/admin/file/download/statistic/${campaign.id}`;
  const token = localStorage.getItem('token');
  const downloadFile = (fileUrl, postfix = '') => {
    fetch(fileUrl, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const filename = campaign.name.replace(/ /g, '_');
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${filename}${postfix}.csv`,
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
  const handleDownload = () => {
    downloadFile(downloadUrl);
    const isPurchase = campaign.tags.includes('purchase');
    if (isPurchase) {
      const filterParam = new URLSearchParams({ filter: 'money' }).toString();
      downloadFile(`${downloadUrl}?${filterParam}`, '_money');
    }
  };

  return (
    <>
      <SidePanel
        campaign={campaign}
        particulars={data.statistics.particulars}
      />

      <div className={classes.content}>
        <StyledTabs
          setTab={setTab}
          tab={tab}
          tabs={tabs}
          showTabs={tabs.length}
        />
        {tabs.map((l, index) => (
          <TabPanel
            key={l}
            value={tab}
            tabValue={index}
            classes={{ tabPanel: classes.tabPanel }}
          >
            <div
              className={classes.chartWrapper}
              ref={chartRef}
            >
              <ChartTabsContent
                statistics={data.statistics}
                statistic={statistic}
                type={campaign.type}
                tabValue={l}
                chartWidth={chartWidth}
                nameMapper={nameMapper}
                pageId={pageId}
              />
            </div>
          </TabPanel>
        ))}
        <div className={classes.exportWrapper}>
          <Button
            variant={BUTTON_TYPES.BLUE}
            color="primary"
            size="medium"
            text="button"
            startIcon={<CSV color="#fff" />}
            onClick={() => {
              handleDownload();
            }}
            disabled={disabled}
          >
            Export to .csv
          </Button>
        </div>
        <div className={classes.table}>
          <Table
            data={data}
            type={campaign.type}
            statistic={statistic}
            nameMapper={nameMapper}
            pageId={pageId}
          />
          {purchaseData && (
          <Table
            data={purchaseData}
            type={campaignType.inAppSubScreen}
            statistic={purchaseStatistic}
            nameMapper={nameMapper}
            pageId={pageId}
            isPurchase
          />
          )}
        </div>
      </div>
    </>
  );
};
