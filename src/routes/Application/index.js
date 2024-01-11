import React, { useEffect, useState } from 'react';
import {
  Route, useParams,
  useRouteMatch,
} from 'react-router-dom';

import { ROUTES } from 'utils/constants';
import NewCampaign from 'routes/Application/NewCampaign';
import Reports from 'routes/Application/Reports';
import CampaignListPage from 'routes/Application/CampaignListPage';
import { useQuery } from '@apollo/client';
import { campaignsByApplicationIDQuery } from 'api/campaignQueries';
import Spinner from 'components/Spinner';
import { makeStyles } from '@mui/styles';
import EditCampaign from 'routes/Application/EditCmpaign';
import ServerErrorPage from 'components/ServerErrorPage';
import ErrorBoundary from 'components/ErrorBoundaries';
import { getInstanceById } from 'utils/arrayUtils';
import WentWrong from 'components/WentWrong';
import ApplicationContext from 'contexts/Application';

const useStyles = makeStyles(() => ({
  spinnerWrapper: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
}));

const Application = ({
  activeTab,
  applications,
  activeApplication,
  setActiveApplication,
}) => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const { appId } = useParams();
  const [isApplicEmpty, setIsApplicEmpty] = useState(false);

  const {
    loading,
    data,
    error,
  } = useQuery(campaignsByApplicationIDQuery, {
    skip: !activeApplication?.id,
    variables: { applicationId: appId },
  });

  useEffect(() => {
    if (!activeApplication) {
      if (appId) {
        const application = getInstanceById(
          applications, appId,
        );

        if (application) {
          setActiveApplication(application);
        } else {
          setIsApplicEmpty(true);
        }
      } else {
        setActiveApplication(applications[0]);
      }
    }
  }, [activeApplication]);
  /* TODO: move to separate component */
  if (isApplicEmpty) {
    return (
      <WentWrong
        onClick={() => {
          setIsApplicEmpty(false);
          window.location.href = `${window.location.origin}/${applications[0].id}`;
        }}
      />
    );
  }
  if (loading || !data) {
    return <div className={classes.spinnerWrapper}><Spinner /></div>;
  }

  if (error) {
    return (
      <ServerErrorPage />
    );
  }

  return (
    <>
      <ErrorBoundary>
        <ApplicationContext.Provider value={activeApplication}>
          <Route
            path={url}
            exact
          >
            <CampaignListPage
              key={activeApplication.id}
              activeTab={activeTab}
              activeApplication={activeApplication}
              setActiveApplication={setActiveApplication}
              campaignsData={data}
              applications={applications}
            />
          </Route>
          <Route
            path={url + ROUTES.newCampaign}
          >
            <NewCampaign
              activeApplication={activeApplication}
              campaignList={data}
            />
          </Route>
          <Route
            path={url + ROUTES.editCampaign}
          >
            <EditCampaign
              activeApplication={activeApplication}
              campaignList={data}
            />
          </Route>
          <Route
            path={url + ROUTES.reports}
          >
            <Reports
              activeApplication={activeApplication}
              campaignsData={data}
            />
          </Route>
        </ApplicationContext.Provider>
      </ErrorBoundary>
    </>
  );
};

export default Application;
