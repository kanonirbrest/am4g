import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const CORE_CAMPAIGN_FIELDS = gql`
  fragment CoreCampaignFields on Campaign {
    created
    updated
    id
    name
    type
    status
    author
  }
`;
