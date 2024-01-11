import { WithTheme } from 'utils/testUtils';
import Reports from 'routes/Application/Reports/index';
import React from 'react';
import { render, screen } from '@testing-library/react';
import mockData from './mockData';

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');

  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});
jest.mock('@apollo/client', () => ({
  __esModule: true,
  useQuery: (query, variables) => {
    if (!variables.skip) {
      return ({ data: mockData.HtmlCampaignDataAndStats, loading: false });
    }

    return ({ data: null, loading: false });
  },
  gql: (v) => v.toString(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => null,
  useHistory: () => ({
    location: {
      pathname:
          'localhost:3000/a98b0c27-588e-46c4-80cf-61a4f9abae49/'
          + 'b3f52ea0-55d0-4d26-89a2-b25e9eb32a80/reports',
    },
  }),
}));

const activeApplication = {
  id: 'a98b0c27-588e-46c4-80cf-61a4f9abae49',
  bundleId: 'com.apalon.platforms.sample',
  platform: 'android',
  projectId: 'apalon-test-986cd',
  name: 'Android Platforms Sample',
  image: null,
  icon: null,
};
const campaignsData = {
  campaigns: [
    {
      targeting: [
        {
          key: 'subscriptionStatus',
          value: [
            'Free',
            'Trial',
            'Paid',
            'Expired Trial',
            'Expired Paid',
            'Cancelled Paid',
            'Cancelled Trial',
          ],
        },
      ],
      triggering: [
        {
          key: 'trigger',
          value: 'html',
        },
        {
          key: 'repeatOptions',
          value: {
            every: 3,
            start: 1,
          },
        },
        {
          key: 'isShowTriggerOnce',
          value: false,
        },
      ],
      created: '2022-05-25T07:22:19.000Z',
      updated: '2022-05-25T07:48:34.000Z',
      id: 'b3f52ea0-55d0-4d26-89a2-b25e9eb32a80',
      name: 'Sprint 5 HTML',
      type: 'TYPE_IN_APP_HTML',
      status: 'STATUS_ACTIVE',
    },
  ],
};
const props = {
  activeApplication, campaignsData,
};
const Wrapper = () => (
  <WithTheme>
    <Reports {...props} />
  </WithTheme>
);

describe('Step3 targeting', () => {
  it('should render', async () => {
    const result = render(
      <Wrapper />,
    );

    expect(screen.getByText(/VOLUME/i)).toBeInTheDocument();
    expect(screen.queryByText(/PERFORMANCE/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/impression/i).length).toBe(2);
    expect(screen.queryByText(/Close Clicks/i)).not.toBeInTheDocument();
    expect(screen.getByText('date')).toBeInTheDocument();
    expect(screen.queryByText(/deeplink.jpeg clicks/i)).not.toBeInTheDocument();

    const legendItems = screen.getAllByTestId('legend-item');
    expect(legendItems.length).toBe(1);

    const someElement = result.container.querySelectorAll('.recharts-line');
    expect([...someElement].length).toBe(1);
    expect([...someElement].length).toBe(1);
  });
});
