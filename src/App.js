import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import { ROUTES } from 'utils/constants';
import ErrorBoundary from 'components/ErrorBoundaries';
import { WithTheme } from 'utils/testUtils';
import Login from './routes/Login';
import MainRoute from './routes';

import './App.scss';

const App = () => (
  <WithTheme>
    <ErrorBoundary isFull>
      <div className="App">
        <link href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" rel="stylesheet" />
        <link href="https://am.platforms.team/static/html/fonts/fonts.css" rel="stylesheet" />
        <Router>
          <Switch>
            <Route path={ROUTES.login}>
              <Login />
            </Route>
            <Route path={ROUTES.root}>
              <MainRoute />
            </Route>
          </Switch>
        </Router>
      </div>
    </ErrorBoundary>
  </WithTheme>
);

export default App;
