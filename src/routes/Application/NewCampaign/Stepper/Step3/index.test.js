import { Formik } from 'formik';
import { WithTheme } from 'utils/testUtils';
import Step3 from 'routes/Application/NewCampaign/Stepper/Step3';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { campaignType } from 'components/constants';
import campaignList from './mock.data';

jest.mock('@apollo/client', () => ({
  __esModule: true,
  useQuery: (d) => {
    let data;
    if (d.includes('device_models')) {
      data = {
        device_models: [
          {
            key: 'i386',
            value: 'iPhone Simulator (i386)',
          },
        ],
      };
    }
    if (d.includes('countries')) {
      data = {
        countries: [{
          key: 'AF',
          value: 'Afghanistan',
        }],
      };
    }
    if (d.includes('regions')) {
      data = {
        regions: [{
          key: '',
          value: 'No Region',
        }],
      };
    }
    if (d.includes('trigger_events')) {
      data = {
        trigger_events: [
          {
            __typename: 'TriggerEvent',
            name: 'Session Properties',
            type: 'custom',
            id: 'bb4079c2-59d1-40b9-93a0-f751006ea604',
            parameters: [
              {
                __typename: 'TriggerEventParameter',
                name: 'param1 (Session Properties)',
                id: '370f14ef-fb58-11eb-bda9-0242ac130003',
              },
              {
                __typename: 'TriggerEventParameter',
                name: 'param2 (Session Properties)',
                id: '0eb6eedc-bd47-11eb-9e58-0242ac130003',
              },
            ],
          },
        ],
      };
    }
    if (d.includes('purposes')) {
      data = {
        purposes: [
          {
            __typename: 'Purpose',
            name: 'debug_purpose',
          },
        ],
      };
    }
    if (d.includes('user_properties')) {
      data = {
        user_properties: [
          {
            id: '8606e8ea-4207-4b7e-b778-11ae8ea63e3a',
            name: 'Adjust_Attribution',
            values: [],
          },
        ],
      };
    }

    return ({ data, loading: false });
  },
  gql: (v) => v.toString(),
}));

const activeApplication = {
  bundleId: 'y.s.test.app',
  id: 'f5d11ae1-8817-4ac3-bf65-7260dd9e7636',
  image: null,
  name: 'Test application',
  platform: 'android',
  projectId: 'apalon-test-986cd',
};

const props = {
  activeApplication,
  isEdit: false,
  campaignList,
};
const Wrapper = ({ type }) => (
  <WithTheme>
    <Formik
      initialValues={{
        step3: {
          filters: [],
          additionalFilters: [],
        },
        step1: { type },
      }}
      onSubmit={() => {}}
    >
      <Step3 {...props} type={type} />
    </Formik>
  </WithTheme>
);

describe('Step3 targeting', () => {
  it('should render', async () => {
    render(
      <Wrapper type={campaignType.pushScheduled} />,
    );

    await waitFor(
      () => expect(screen.getAllByText(/filtered by/i).length).toBe(2),
    );
  });
});
