import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
} from '@apollo/client';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import './index.css';
import App from 'App';
import authClient from 'utils/authUtils';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ApolloProvider client={authClient}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
const updateWidth = () => {
  const viewport = document.querySelector('meta[name=viewport]');
  if (window.orientation === 90 || window.orientation === -90) {
    viewport.setAttribute(
      'content', 'width=1401, initial-scale=0.34, maximum-scale=1.0, user-scalable=1',
    );
  } else {
    viewport.setAttribute(
      'content', 'width=640, initial-scale=0.47, maximum-scale=1.0, user-scalable=1',
    );
  }
};
window.addEventListener('resize', updateWidth, true);
updateWidth();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
