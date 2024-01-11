import React from 'react';
import { makeStyles } from '@mui/styles';

import NewCampaignStepper from 'routes/Application/NewCampaign/Stepper';
import BreadCrumbs from 'components/BreadCrumbs';

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    display: 'flex',
    flex: 1,
    background: '#F1F5FA',
    flexDirection: 'column',
    zIndex: 0,
  },
  breadCrumbs: {
    padding: '20px',
  },
  activeTitle: {
    color: theme.palette.primary.main,
    marginRight: '10px',
    marginLeft: '10px',
    textDecoration: 'none',
  },
}));

const NewCampaign = ({ activeApplication, campaignList }) => {
  const classes = useStyles();
  if (!activeApplication) return null;
  const links = [
    { pathname: `/${activeApplication.id}`, label: 'Campaigns' },
    {
      label: 'New Campaign',
    },
  ];

  return (
    <div className={classes.pageWrapper}>
      <BreadCrumbs
        links={links}
        classes={{ container: classes.breadCrumbs }}
      />
      <NewCampaignStepper
        activeApplication={activeApplication}
        campaignList={campaignList}
      />
    </div>
  );
};

export default NewCampaign;
