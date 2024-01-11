import React from 'react';
import { makeStyles } from '@mui/styles';

import NewCampaignStepper from 'routes/Application/NewCampaign/Stepper';
import BreadCrumbs from 'components/BreadCrumbs';
import { useHistory } from 'react-router-dom';
import { getParsedDate } from 'routes/Application/EditCmpaign/utils';
import { useQuery } from '@apollo/client';
import { campaignByIDQuery } from 'api/campaignQueries';
import Spinner from 'components/Spinner';

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    display: 'flex',
    flex: 1,
    background: '#F1F5FA',
    flexDirection: 'column',
    zIndex: 0,
  },
  breadCrumbs: {
    padding: '20px 5px 20px 20px',
  },
  activeTitle: {
    color: theme.palette.primary.main,
    marginRight: '10px',
    marginLeft: '10px',
    textDecoration: 'none',
  },
  spinnerWrapper: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  breadCrumbsWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#3E4554',
  },
}));

const EditCampaign = ({ activeApplication, campaignList }) => {
  const classes = useStyles();
  const history = useHistory();

  const campaignId = history.location.pathname.split('/')[2];
  const {
    loading,
    data,
  } = useQuery(campaignByIDQuery, {
    skip: !activeApplication?.id,
    variables: {
      campaignId,
      appId: activeApplication?.id,
    },
    fetchPolicy: 'network-only',
  });

  if (loading || !activeApplication) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }
  const links = [
    { pathname: `/${activeApplication.id}`, label: 'Campaigns' },
    {
      label: 'Edit Campaign',
    },
  ];

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.breadCrumbsWrapper}>
        <BreadCrumbs
          links={links}
          classes={{ container: classes.breadCrumbs }}
        />
        <div>
          &quot;
          {data.campaign.name}
          &quot;
        </div>
      </div>
      <NewCampaignStepper
        activeApplication={activeApplication}
        campaignData={getParsedDate(data.campaign)}
        campaignList={campaignList}
        step={history.location.search ? history.location.search.split('=')[1]
          : null}
        isEdit
      />
    </div>
  );
};

export default EditCampaign;
