import React from 'react';

import Delivery from '../Delivery';

export default ({
  triggers = {},
  isEdit,
  activeApplication,
}) => (
  <Delivery
    triggers={triggers}
    isEdit={isEdit}
    activeApplication={activeApplication}
  />
);
