import React from 'react';

import { IN_APP_CUSTOM_TYPE } from 'utils/constants/campaignForm';
import Custom from './Custom';
import ShowOnce from './ShowOnce';
import Repeated from './Repeated';

export const triggeringTabsConfig = [{
  tabValue: IN_APP_CUSTOM_TYPE.REPEATED,
  label: 'Repeated',
}, {
  tabValue: IN_APP_CUSTOM_TYPE.SHOW_ONCE,
  label: 'Show once',
}, {
  tabValue: IN_APP_CUSTOM_TYPE.CUSTOM,
  label: 'Custom',
}];

export const RepeatTabsContent = ({
  tabValue,
  ...props
}) => {
  switch (tabValue) {
    case IN_APP_CUSTOM_TYPE.REPEATED:

      return (
        <Repeated {...props} />
      );
    case IN_APP_CUSTOM_TYPE.SHOW_ONCE:

      return (
        <ShowOnce {...props} />
      );
    case IN_APP_CUSTOM_TYPE.CUSTOM:

      return (
        <Custom {...props} />
      );

    default:
      return null;
  }
};
