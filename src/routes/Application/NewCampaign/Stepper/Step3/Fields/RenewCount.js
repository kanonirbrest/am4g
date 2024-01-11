import React from 'react';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FormikTextField from 'components/FormControls/TextField';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';

const RenewCount = ({
  fieldName: name,
  classes,
}) => (
  <div>
    <LabelWithAsterisk
      label="Subscription renewal"
      withAsterisk={false}
      tooltipText="Subscription renewal indicates how many
      times a user’s renewed subscription.
      “Subscription renewal 1” is the second subscription,
      or the first renewal of the subscription."
    />
    <FormikTextField
      withDebounce
      name={`${name}renewCount`}
      classes={{
        root: classes.textField,
      }}
      placeholder="Enter renewal number"
    />
  </div>
);

export default ({
  name,
  values,
  ...props
}) => (
  <WithOrField
    component={RenewCount}
    name={`${name}renewCount`}
    items={values.renewCount}
    {...props}
  />
);
