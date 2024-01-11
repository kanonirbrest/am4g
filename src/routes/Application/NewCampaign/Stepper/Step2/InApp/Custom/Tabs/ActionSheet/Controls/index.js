import React from 'react';

import Action from './Action';

// eslint-disable-next-line import/prefer-default-export
export const getComponentByType = (type, props) => {
  switch (type) {
    case 'action':

      return <Action {...props} />;

    case 'cancel':

      return <Action {...props} isCancel />;

    default:
      return null;
  }
};
