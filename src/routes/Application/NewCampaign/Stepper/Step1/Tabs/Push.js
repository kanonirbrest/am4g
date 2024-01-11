import React from 'react';

import RadioGroup from 'routes/Application/NewCampaign/Stepper/Step1/Tabs/RadioGroup';
import CAMPAIGN_TYPE_OPTIONS
  from 'routes/Application/NewCampaign/Stepper/Step1/Tabs/constant';
import { CAMPAIGN_TYPE } from 'utils/constants/campaign';

export default ({ handleChange, value, isEdit }) => {
  const items = CAMPAIGN_TYPE_OPTIONS[CAMPAIGN_TYPE.PUSH];

  return (
    <RadioGroup
      items={items}
      handleChange={handleChange}
      value={value}
      disabled={isEdit}
    />
  );
};
