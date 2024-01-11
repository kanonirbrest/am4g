import React from 'react';

import FormikRadio from 'components/FormControls/Radio';
import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';

export default ({
  values,
  name,
  classes = {},
  onRemove,
}) => (
  <FieldContainer
    onRemove={() => onRemove(name)}
  >
    <div className={classes.startContainer}>
      <LabelWithAsterisk
        label="IDFA permission request"
        withAsterisk={false}
        tooltipText="iOS only. Starting with iOS 14, all apps need to receive
      permission from users in order to use the Identifier for
      Advertisers, the IDFA."
      />
      <FormikRadio
        name={`${name}trackAuthStatus`}
        value={values.trackAuthStatus}
        defaultValue="not_determined"
        options={[
          { label: 'Never received', value: 'not_determined' },
          { label: 'Allowed', value: 'authorized' },
          { label: 'Denied', value: 'denied' },
        ]}
      />
    </div>
  </FieldContainer>
);
