import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const getTokenFromUrl = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const token = urlParams.get('token');
  if (token) {
    localStorage.setItem('token', token);
  }

  return localStorage.getItem('token');
};
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getTokenFromUrl();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_END_POINT,
});

const authClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: 'am4g-admin',
  version: '1.0',
});
export default authClient;
