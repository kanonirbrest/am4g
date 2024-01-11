import { gql } from '@apollo/client';

export const applicationByIdQuery = gql`
query Application($id: UUID!) {
  application(id: $id) {
        name
        products {
          title,
          productId,
          localizedPrice,
          period,
          currency,
          periodCountSubs,
          periodLengthSubs,
          price,
          type,
          offers {
             offerId
             identifier
             duration
             periodCountOffer
             periodLengthOffer
             numberOfPeriods
             type
             paymentMethod
             price
             localizedPrice
          } 
        }
      }
    }
`;

export const applicationsQuery = gql`
  query applicationsQuery {
      applications {
        id,
        bundleId,
        platform,
        projectId,
        name,
        image,
        blacklistLocal,
        blacklistRemove
      }
    }
`;

export const statisticsByCampaignIDQuery = gql`
  query Campaigns($campaignId: UUID, $from: DateTime, $to : DateTime, $filter: String) {
      statistics(campaignId: $campaignId, from: $from, to: $to, filter: $filter) {
        labels,
        data {
          date,
          type,
          count,
          variant,
          pageId 
        }
        particulars {
          type,
          count,
          ext
        }
      }
    }
`;

export const triggerEventsByApplicationIDQuery = gql`
  query trigger_events($applicationId: UUID!) {
      trigger_events(applicationId: $applicationId) {
        name,
        type,   
        id,
        parameters {      
          name,      
          id,  
        }    
      }
    }
`;

export const triggerEventParameterValues = gql`
  query event_parameter_values($eventParameterId: UUID!) {
        event_parameter_values(eventParameterId: $eventParameterId) {
            value
        }
    }
`;

export const getLanguagesQuery = gql`
  query {
      audiences {
        id,
        title,
        locale
      }
    }
`;

export const getCountriesQuery = gql`
  query countries($filter: String) {
      countries(filter: $filter) {
        key,
        value
      }
    }
`;

export const getDevicesQuery = gql`
  query($filter: String) {
    device_models(filter: $filter) {
        key,
        value
    }
  }
`;

export const getUserPropertyQuery = gql`
query user_properties($applicationId: UUID!) {
  user_properties(applicationId: $applicationId) {
    id
    name
    values {
      value
    }
  }
}`;

export const getPurposesQuery = gql`
query purposes($applicationId: UUID!) {
  purposes(applicationId: $applicationId) {
    name
  }
}`;

export const getTriggerIntersectionsQuery = gql`
query ($applicationId: UUID!, $filter: CampaignFilterInput){
  campaigns(applicationId: $applicationId, filter: $filter) {
    id,
    type,
    name
  }
}`;

export const getRegionsQuery = gql`
query regions($filter: String) {
  regions(filter: $filter) {
    key
    value
  }
}`;

export const checkTargetingDeviceMutation = gql`
  mutation checkTargetingDevice($input: CheckTargetingDeviceInput!) {
    checkTargetingDevice(input: $input) {
        devices {
          idfv
          result
          messages
        }
    }
}
`;

export const sendTestPushMutation = gql`
  mutation sendTestPush($input: SendTestPushInput!) {
    sendTestPush(input: $input) {
        devices {
          idfv
          result
          messages
          payload
        }
    }
}
`;

export const predictAudienceMutation = gql`
  mutation checkTargetingDevice($input: PredictAudienceInput!) {
    predictAudience(input: $input) {
      predictValue
      rank
      percent
      sql
      total
    }
}
`;
