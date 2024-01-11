import React from 'react';
import { WithTheme } from 'utils/testUtils';
import { render, screen } from '@testing-library/react';
import NewCampaignStepper from 'routes/Application/NewCampaign/Stepper/index';
import {
  BrowserRouter as Router, Route, Switch, useHistory,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ROUTES } from 'utils/constants';

jest.mock('lodash.debounce', () => (fn) => fn);
jest.mock('@apollo/client', () => ({
  __esModule: true,
  gql: () => '',
  useMutation: () => ([
    jest.fn(),
    {
      data: {},
      loading: false,
    },
  ]),
  useQuery: () => ({
    data: {
      application: {
        products: [],
      },
    },
    loading: false,
  }),
}));

const Wrapper = (props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/test');
  };

  return (
    <WithTheme>
      <button type="button" onClick={handleClick}>
        Change location
      </button>
      <NewCampaignStepper {...props} />
    </WithTheme>
  );
};
const props = {
  activeApplication: {
    id: '89aa05a9-1ed4-401b-973d-0e21dff0cd82',
    bundleId: 'com.sprint5.test2',
    platform: 'android',
    projectId: 'test',
    name: 'SPRINT 5',
    image: null,
  },
  campaignList: {
    campaigns: [],
  },
  isEdit: false,
};
describe('Stepper', () => {
  it('should call confirm if form is dirty and we try to leave location', async () => {
    const confirmMock = jest.spyOn(window, 'confirm').mockImplementation();

    render(
      <Router>
        <Switch>
          <Route path={ROUTES.login} />
          <Route path={ROUTES.root}>
            <Wrapper {...props} />
          </Route>
        </Switch>
      </Router>,
    );
    const nameInp = screen.getByPlaceholderText('Enter campaign name');
    await userEvent.type(nameInp, 'test name');
    const button = await screen.findByText('Change location');
    await userEvent.click(button);

    expect(confirmMock).toHaveBeenCalledTimes(1);
  });

  it('should not call confirm if form is dirty and we'
      + ' try to leave location and form not dirty',
  async () => {
    const confirmMock = jest.spyOn(window, 'confirm').mockImplementation();

    render(
      <Router>
        <Switch>
          <Route path={ROUTES.login} />
          <Route path={ROUTES.root}>
            <Wrapper {...props} />
          </Route>
        </Switch>
      </Router>,
    );
    const button = await screen.findByText('Change location');
    await userEvent.click(button);

    expect(confirmMock).not.toHaveBeenCalled();
  });
});
