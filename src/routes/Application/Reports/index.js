import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Edit from 'assets/icons/Edit';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Formik, useFormikContext } from 'formik';

import BreadCrumbs from 'components/BreadCrumbs';
import { statisticsByCampaignIDQuery } from 'api/queries';
import {
  GENERAL_STATS_TAB,
  initialFilters,
} from 'routes/Application/Reports/constants';
import { STATUS, SUPPORTED_CAMPAIGNS } from 'utils/constants/campaign';
import useStyles from 'routes/Application/Reports/styles';
import { BUTTON_TYPES } from 'utils/styles/common';
import { campaignSettingsByIDQuery } from 'api/campaignQueries';
import { campaignType } from 'components/constants';
import { getFieldByKey } from 'utils/campaignUtils';
import { copyObject } from 'utils';
import Filters from './Filters';
import Wrapper from './Wrapper';

const defaultPage = { label: 'General Campaign Stats', value: GENERAL_STATS_TAB };
export default (props) => (
  <Formik
    initialValues={initialFilters}
    onSubmit={() => {
    }}
  >
    <Comp {...props} />
  </Formik>
);
const Comp = ({ activeApplication, campaignsData }) => {
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormikContext();
  const campaignId = history.location.pathname.split('/')[2];
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(GENERAL_STATS_TAB);
  const [pageOptions, setPageOptions] = useState([
    defaultPage]);
  const campaign = campaignsData
    .campaigns.find((comp) => comp.id === campaignId);
  const {
    loading: loadingPurchase,
    data: purchaseData,
  } = useQuery(statisticsByCampaignIDQuery, {
    skip: !campaign?.tags?.includes('purchase'),
    variables: {
      campaignId,
      from: formik.values.startDate,
      to: formik.values.endDate,
      filter: 'money',
    },
    fetchPolicy: 'network-only',
  });
  const {
    loading,
    data,
  } = useQuery(statisticsByCampaignIDQuery, {
    variables: {
      campaignId,
      from: formik.values.startDate,
      to: formik.values.endDate,
    },
    fetchPolicy: 'network-only',
  });
  const {
    loading: loadingSettings,
    data: settingsData,
  } = useQuery(campaignSettingsByIDQuery, {
    skip: campaign.type !== campaignType.inAppHTML,
    variables: {
      campaignId,
      appId: activeApplication?.id,
    },
    fetchPolicy: 'network-only',
    onCompleted: (settings) => {
      const pagesArr = getFieldByKey(settings.campaign
        .settings, 'pages').map((o) => ({
        label: o.name,
        value: o.uuid,
      }));

      setPageOptions([defaultPage, ...pagesArr]);
    },
  });

  const links = [
    { pathname: `/${activeApplication.id}`, label: 'Campaigns' },
    { label: campaign.name },
  ];
  const isAllowEdit = SUPPORTED_CAMPAIGNS
    .includes(campaign.type) && campaign.status !== STATUS.ARCHIVED;
  let modifiedData;
  if (data && campaign.type === campaignType.inAppHTML) {
    modifiedData = {};
    modifiedData = copyObject(data);
    modifiedData.statistics.data = data.statistics?.data
      .filter((d) => d.type === 'impression'
            || d.pageId === page);

    const ls = ['date', ...new Set(modifiedData.statistics.data
      .map((d) => (d.type)).flat())];
    modifiedData.statistics.labels = ls;
  }

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.header}>
        <BreadCrumbs links={links} />
        {isAllowEdit && (
          <Button
            size="medium"
            text="button"
            startIcon={<Edit color="#fff" />}
            onClick={() => { history.replace('edit'); }}
            variant={BUTTON_TYPES.BLUE}
          >
            Edit Campaign
          </Button>
        )}
      </div>
      <Filters
        page={page}
        setPage={setPage}
        pageOptions={pageOptions}
        isShowPageFilter={campaign.type === campaignType.inAppHTML}
      />
      <main className={classes.main}>
        <Wrapper
          tab={tab}
          setTab={setTab}
          data={modifiedData || data}
          loading={loading || loadingSettings || loadingPurchase}
          campaign={campaign}
          settingsData={settingsData}
          pageId={page}
          purchaseData={purchaseData}
        />
      </main>
    </div>
  );
};
