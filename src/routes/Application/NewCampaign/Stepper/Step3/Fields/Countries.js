import React from 'react';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import FormikAutocomplete from 'components/FormControls/Autocomplete';
import FormikRadio from 'components/FormControls/Radio';
import { EQUALITY } from 'utils/constants';

const OPTIONS = [
  { label: 'include these countries', value: EQUALITY.IN },
  { label: 'exclude these countries', value: EQUALITY.NOT_IN },
];
export default ({
  values, name,
  onRemove,
  options,
}) => (
  <FieldContainer
    onRemove={() => onRemove(name)}
  >
    <div>
      <LabelWithAsterisk
        label="Country"
        withAsterisk={false}
      />
      <FormikAutocomplete
        options={options}
        placeholder="Country"
        name={`${name}country`}
        isExclude={values.countryOperation === EQUALITY.NOT_IN}
        value={values.country}
      />
    </div>
    <div>
      <FormikRadio
        name={`${name}countryOperation`}
        value={values.countryOperation}
        defaultValue="in"
        options={OPTIONS}
      />
    </div>
  </FieldContainer>
);
