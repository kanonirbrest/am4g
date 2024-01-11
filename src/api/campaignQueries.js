import { gql } from '@apollo/client';

import { CORE_CAMPAIGN_FIELDS } from 'api/fragments';

export const campaignsByApplicationIDQuery = gql`
  ${CORE_CAMPAIGN_FIELDS}
  query Campaigns($applicationId: UUID!) {
      campaigns(applicationId: $applicationId) {
        ...CoreCampaignFields
        tags
        statistics { 
          tendencies { 
            type
            current
            previous
            tendency
            ext
          } 
        }
      }
    }
`;

export const campaignByIDQuery = gql`
  ${CORE_CAMPAIGN_FIELDS}
  query Campaigns($campaignId: UUID, $appId: UUID) {
    campaign(campaignId: $campaignId, applicationId: $appId) {
    ...CoreCampaignFields
    targeting {
      key
      value
    }
    triggering {
      key
      value
    }
    settings {
      key
      value
    }
  }
}
`;

export const campaignSettingsByIDQuery = gql`
  query Campaigns($campaignId: UUID, $appId: UUID) {
    campaign(campaignId: $campaignId, applicationId: $appId) {
    settings {
      key
      value
    }
  }
}
`;

export const createCampaignMutation = gql`
  ${CORE_CAMPAIGN_FIELDS}
  mutation createCampaign($campaignInput: CreateCampaignInput!) {
    createCampaign(campaignInput: $campaignInput) {
        ...CoreCampaignFields
        settings {
            key,
            value
        },
    }
}
`;

export const updateCampaignMutation = gql`
  ${CORE_CAMPAIGN_FIELDS}
  mutation updateCampaign($campaignInput: UpdateCampaignInput!) {
     updateCampaign(campaignInput: $campaignInput) {
        ...CoreCampaignFields
        settings {
            key,
            value
        },
    }
}
`;

export const stopCampaignMutation = gql`
  mutation stopCampaign($id: UUID!) {
      stopCampaign(id: $id) {
        id
        status
      }
}
`;

export const archiveCampaignMutation = gql`
  mutation archiveCampaign($id: UUID!) {
      archiveCampaign(id: $id) {
        id
        status
      }
}
`;

export const startCampaignMutation = gql`
  mutation stopCampaign($id: UUID!) {
      startCampaign(id: $id) {
        id
        status
      }
}
`;

export const cloneCampaignMutation = gql`
  mutation cloneCampaign($id: UUID!) {
      cloneCampaign(id: $id) {
        id
      }
}
`;

export const draftCampaignMutation = gql`
  mutation stopCampaign($id: UUID!) {
      draftCampaign(id: $id) {
        id
        status
      }
}
`;
