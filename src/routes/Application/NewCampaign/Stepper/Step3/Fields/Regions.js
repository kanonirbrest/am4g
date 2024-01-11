import React from 'react';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import FormikAutocomplete from 'components/FormControls/Autocomplete';

const Regions = ({
  values, name,
  onRemove,
  options,
}) => (
  <FieldContainer
    onRemove={() => onRemove(name)}
  >
    <div>
      <LabelWithAsterisk
        label="Region"
        withAsterisk={false}
      />
      <FormikAutocomplete
        options={options}
        placeholder="Region"
        name={`${name}region`}
        value={values.region}
      />
    </div>
  </FieldContainer>
);

export default Regions;
