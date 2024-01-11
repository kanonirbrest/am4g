import React, { useEffect, useState } from 'react';
import {
  Route, Switch,
  useHistory,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import jwt from 'jsonwebtoken';
import Stack from '@mui/material/Stack';

import Footer from 'components/Footer';
import { ROUTES } from 'utils/constants';
import TopAppBar from 'components/Header/TopAppBar';
import BottomAppBar from 'components/Header/BottomAppBar';
import { applicationsQuery } from 'api/queries';
import Spinner from 'components/Spinner';
import Application from 'routes/Application';
import ServerErrorPage from 'components/ServerErrorPage';
import { HEADER_TABS } from 'components/Header/BottomAppBar/HeaderTabs';
import ProductAlert from 'contexts/ProductAlert';
import SnackBar from '../components/SnackBar';

const STACK_CONFIG = { width: '100%', position: 'absolute', zIndex: 10000 };

const MainRoute = () => {
  const [activeHeaderTab, setActiveHeaderTab] = useState(HEADER_TABS.CAMPAIGNS);
  const [user, setUser] = useState(null);
  const [isProductUpdated, setIsProductUpdated] = useState(false);
  const [activeApplication, setActiveApplication] = useState(0);
  const { push, location: { pathname } } = useHistory();
  const {
    loading,
    error,
    data: { applications } = {},
  } = useQuery(applicationsQuery);
  if (error && error.networkError?.statusCode === 401) {
    localStorage.removeItem('token');
    window.location.href = `${window.location.origin}/login`;
  }
  useEffect(() => {
    if (applications?.length
        && !activeApplication
        && (pathname === '/'
        || pathname === '')) {
      setActiveApplication(applications[0]);
      push(`${ROUTES.root}${
        applications[0].id
      }`);
    }
  }, [pathname, activeApplication, applications]);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const { exp, iat, ...userValue } = jwt.decode(localStorage.getItem('token'));
      setUser(userValue);
    } else {
      window.location.href = `${window.location.origin}/login`;
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ServerErrorPage />
    );
  }
  const onClose = () => {
    setIsProductUpdated(false);
  };
  const sortedApplications = (applications).map((a) => ({
    ...a,
    icon: null,
  })).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <ProductAlert.Provider
        value={{
          isProductUpdated,
          setIsProductUpdated,
        }}
      >
        <Stack spacing={2} sx={STACK_CONFIG}>
          <SnackBar
            onClose={onClose}
            open={isProductUpdated}
            text="Product successfully updated"
            anchor={{ vertical: 'top', horizontal: 'right' }}
          />
        </Stack>
        <TopAppBar
          activeApplication={activeApplication}
          user={user}
        />
        <BottomAppBar
          activeTab={activeHeaderTab}
          setActiveTab={setActiveHeaderTab}
          activeApplication={activeApplication}
          setActiveApplication={setActiveApplication}
          applicationList={sortedApplications}
        />
        <Switch>
          <Route
            path={ROUTES.application}
          >
            <Application
              activeTab={activeHeaderTab}
              activeApplication={activeApplication}
              setActiveApplication={setActiveApplication}
              applications={sortedApplications}
            />
          </Route>
        </Switch>
        <Footer />
      </ProductAlert.Provider>
    </>
  );
};

export default MainRoute;
