import { campaignType } from 'components/constants';
import mockCampaignFormData from 'utils/campaign.mock';
import getCampaignPayload from './index';

describe('getCampaignPayload method', () => {
  it('should return correct targeting object', () => {
    const targeting = {
      targeting: {
        limitPerDevice: undefined,
        subscriptionStatus: [
          'Expired Paid',
          'Paid',
          'Free',
        ],
      },
    };
    const triggering = {
      triggering: {
        hasEventParams: [],
        isShowTriggerOnce: false,
      },
      type: campaignType.pushScheduled,
    };
    const settings = {
      settings: {
        schedule: {
          beginningDate: '2022-02-10',
          sendNow: true,
          time: '05:29:55',
          type: 'once',
        },
      },
    };

    expect(getCampaignPayload(mockCampaignFormData, { id: 'test' }))
      .toMatchObject({ application: 'test' });
    expect(getCampaignPayload(mockCampaignFormData, { id: 'test' }))
      .toMatchObject(targeting);
    expect(getCampaignPayload(mockCampaignFormData, { id: 'test' }))
      .toMatchObject(triggering);
    expect(getCampaignPayload(mockCampaignFormData, { id: 'test' }))
      .toMatchObject(settings);
  });
});
