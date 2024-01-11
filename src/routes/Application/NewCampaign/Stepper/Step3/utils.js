import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import Regions from 'routes/Application/NewCampaign/Stepper/Step3/Fields/Regions';
import LastUsedAppLess
  from 'routes/Application/NewCampaign/Stepper/Step3/AdditionalFields/LastUsedAppLess';
import LastUsedAppMore
  from 'routes/Application/NewCampaign/Stepper/Step3/AdditionalFields/LastUsedAppMore';
import Idfv from 'routes/Application/NewCampaign/Stepper/Step3/Fields/Idfv';
import FirstUsedAppLess
  from 'routes/Application/NewCampaign/Stepper/Step3/AdditionalFields/FirstUsedAppLess';
import FirstUsedAppMore
  from 'routes/Application/NewCampaign/Stepper/Step3/AdditionalFields/FirstUsedAppMore';
import { campaignType } from 'components/constants';
import { FILTER_TYPE } from 'utils/targetingConfig/utils';
import { additionalTargetingFilters, targetingFilters } from 'utils/targetingConfig';
import ImpressionCampaign from './AdditionalFields/ImpressionCampaign';
import SessionCount from './AdditionalFields/SessionCount';
import HasEvent from './AdditionalFields/HasEvent';
import LastDidEvent from './AdditionalFields/LastDidEvent';

import PremiumExpirationLessThan
  from './Fields/PremiumExpirationLessThan';
import PremiumExpirationMoreThan
  from './Fields/PremiumExpirationMoreThan';
import ExpirationDateAgoFrom
  from './Fields/ExpirationDateAgoFrom';
import ExpirationDateAgoTo
  from './Fields/ExpirationDateAgoTo';
import OSVersion from './Fields/OSVersion';
import UserProperty from './Fields/UserProperty';
import PurchaseType from './Fields/PurchaseType';
import UserBucket from './Fields/UserBucket';
import Nps from './Fields/Nps';
import IDFAPermissionRequest from './Fields/IDFAPermissionRequest';
import RenewCount from './Fields/RenewCount';
import LDTrackId from './Fields/LDTrackId';
import BillingRetry from './Fields/BillingRetry';
import DeviceModel from './Fields/DeviceModel';
import DeviceType from './Fields/DeviceType';
import AppVersion from './Fields/AppVersion';
import Countries from './Fields/Countries';
import Subscription from './Fields/Subscription';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100% - 30px)',
    padding: '15px',
    background: '#F8FAFD',
    border: '1px solid #D8DFE8',
    position: 'relative',
    borderBottom: 'none',
  },
  select: {
    minWidth: '500px',
  },
  fieldWrapper: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
  },
  addButton: {
    textTransform: 'capitalize',
    marginTop: '5px',
    fontSize: '12px',
  },
  extraField: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    marginTop: '15px',
  },
  textField: {
    minWidth: '400px',
  },
  hint: {
    fontSize: '10px',
    color: '#8D95A9',
    textAlign: 'start',
    marginTop: '3px',
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  startContainer: {
    textAlign: 'start',
  },
  chipExcluded: {
    background: '#E14B50 !important',
  },
  removeBtn: {
    marginLeft: '10px',
    marginTop: '18px',
  },
  fieldLabel: {
    fontWeight: 'normal',
    fontSize: '11px',
    color: '#6C7688',
    textAlign: 'start',
    marginBottom: '5px',
  },
  radioWrapper: {
    marginTop: '5px',
  },
  radioHint: {
    fontSize: '10px',
    color: '#8D95A9',
    textAlign: 'start',
    marginLeft: '30px',
    marginTop: '10px',
  },
}));

export const GetFilterView = ({
  filter, values, name,
  onRemove, countries, devices,
  filters, purposes,
  regions,
  userProp,
  platform,
  campaignList,
  andIndex,
}) => {
  const classes = useStyles();
  const formik = useFormikContext();

  const props = {
    classes,
    values,
    name,
    onRemove,
    filters,
    filter,
    field: FILTER_TYPE.FILTERS,
    platform,
    andIndex,
  };

  switch (filter) {
    case targetingFilters.subscriptionStatus.field: {
      const disabled = [campaignType.pushTriggeredCancelPaid,
        campaignType.pushTriggeredCancelTrail]
        .includes(formik.values.step1.type);

      return (
        <Subscription
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
          disabled={disabled}
        />
      );
    }

    case targetingFilters.country.field: {
      return (
        <Countries
          {...props}
          options={countries}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.region.field: {
      return (
        <Regions
          {...props}
          options={regions}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.expirationDateTo.field: {
      return (
        <PremiumExpirationLessThan
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.expirationDateAgoFrom.field: {
      return (
        <ExpirationDateAgoFrom
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.expirationDateAgoTo.field: {
      return (
        <ExpirationDateAgoTo
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.expirationDateFrom.field: {
      return (
        <PremiumExpirationMoreThan
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.appVersion.field:

      return (
        <AppVersion
          {...props}
        />
      );

    case targetingFilters.osVersion.field:

      return (
        <OSVersion
          {...props}
        />
      );

    case targetingFilters.deviceType.field: {
      return (
        <DeviceType
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.deviceModel.field:

      return (
        <DeviceModel
          {...props}
          options={devices}
        />
      );

    case targetingFilters.ldTrackId.field:

      return (
        <LDTrackId
          {...props}
          options={[]}
        />
      );

    case targetingFilters.deviceIdfv.field:

      return (
        <Idfv
          {...props}
          options={[]}
        />
      );

    case targetingFilters.billingRetry.field:

      return (
        <BillingRetry
          {...props}
        />
      );

    case targetingFilters.renewCount.field:

      return (
        <RenewCount
          {...props}
        />
      );

    case targetingFilters.purchaseType.field: {
      return (
        <PurchaseType
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
          options={purposes}
        />
      );
    }
    case targetingFilters.nps.field: {
      return (
        <Nps
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
          campaignList={campaignList}
        />
      );
    }

    case targetingFilters.userBucket.field: {
      return (
        <UserBucket
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.IDFAPermissionRequest.field: {
      return (
        <IDFAPermissionRequest
          {...props}
          name={`${name}${filter}.`}
          values={values[filter]}
        />
      );
    }

    case targetingFilters.userProperty.field:

      return (
        <UserProperty
          {...props}
          userProp={userProp}
        />
      );

    default:
      return null;
  }
};

export const GetAdditionalFilterView = ({
  filter, values,
  name,
  onRemove,
  filters,
  events,
  campaignList,
  isEdit,
  activeApplication,
  andIndex,
}) => {
  const classes = useStyles();
  const props = {
    classes,
    values,
    name,
    onRemove,
    filters,
    filter,
    field: FILTER_TYPE.ADDITIONAL_FILTERS,
    activeApplication,
    andIndex,
  };
  switch (filter) {
    case additionalTargetingFilters.sessionCount.field:

      return <SessionCount {...props} />;

    case additionalTargetingFilters.hasEvent.field:

      return (
        <HasEvent
          {...props}
          events={events}
          isEdit={isEdit}
        />
      );

    case additionalTargetingFilters.impressionCampaign.field:

      return (
        <ImpressionCampaign
          {...props}
          campaignList={campaignList}
        />
      );

    case additionalTargetingFilters.afterEvent.field:

      return <LastDidEvent {...props} events={events} />;

    case additionalTargetingFilters.sinceFirstVisitMore.field:

      return <FirstUsedAppMore {...props} />;

    case additionalTargetingFilters.sinceFirstVisitLess.field:

      return <FirstUsedAppLess {...props} />;

    case additionalTargetingFilters.sinceLastVisitMore.field:

      return <LastUsedAppMore {...props} />;

    case additionalTargetingFilters.sinceLastVisitLess.field:

      return <LastUsedAppLess {...props} />;

    default:
      return null;
  }
};
