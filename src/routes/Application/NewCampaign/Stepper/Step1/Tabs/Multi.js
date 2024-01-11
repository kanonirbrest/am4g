import React from 'react';

import ReplaceableSelect from 'components/ReplaceableSelect';
import RadioGroup from 'routes/Application/NewCampaign/Stepper/Step1/Tabs/RadioGroup';
import { campaignType } from 'components/constants';
import CAMPAIGN_TYPE_OPTIONS
  from 'routes/Application/NewCampaign/Stepper/Step1/Tabs/constant';
import { CAMPAIGN_TYPE } from 'utils/constants/campaign';

const config = {
  sourceType: 'PUSH',
  targetType: 'IN_APP',
};
export default ({
  type, handleChange, value, isEdit,
}) => {
  const items = CAMPAIGN_TYPE_OPTIONS[CAMPAIGN_TYPE.MULTI];

  return (
    <>
      <RadioGroup
        items={items}
        handleChange={handleChange}
        value={value}
        disabled={isEdit}
      />
      <ReplaceableSelect
        config={config}
        type={type}
        disabled={value !== campaignType.multiCustom}
      />
    </>
  );
};
