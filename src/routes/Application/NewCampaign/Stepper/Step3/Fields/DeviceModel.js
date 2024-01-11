import React from 'react';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FormikAutocomplete from 'components/FormControls/Autocomplete';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';

const DeviceModel = ({
  fieldName: name,
  options,
  classes = {},
  item,
}) => (
  <div className={classes.startContainer}>
    <div>
      <LabelWithAsterisk
        label="Device Model"
        withAsterisk={false}
      />
      <FormikAutocomplete
        options={options}
        placeholder="Add device model"
        name={`${name}deviceModel`}
        value={item.deviceModel}
      />
    </div>
  </div>
);

export default ({
  name,
  values,
  ...props
}) => (
  <WithOrField
    component={DeviceModel}
    name={`${name}deviceModel`}
    items={values.deviceModel}
    {...props}
  />
);
