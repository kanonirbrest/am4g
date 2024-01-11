import React from 'react';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import FormikAutocomplete from 'components/FormControls/Autocomplete';
import FormikRadio from 'components/FormControls/Radio';
import { EQUALITY } from 'utils/constants';

const PurchaseType = ({
  values,
  name,
  onRemove,
  options,
}) => (
  <FieldContainer
    onRemove={() => onRemove(name)}
  >
    <div>
      <LabelWithAsterisk
        label="Purchase type"
        withAsterisk={false}
      />
      <FormikAutocomplete
        options={options}
        name={`${name}purposes`}
        placeholder="Add status"
        isExclude={values.purposesOperation === EQUALITY.NOT_IN}
        value={values.purposes}
        required
      />
    </div>
    <FormikRadio
      name={`${name}purposesOperation`}
      value={values.purposesOperation}
      options={[
        { label: 'include', value: EQUALITY.IN },
        { label: 'exclude', value: EQUALITY.NOT_IN },
      ]}
    />
  </FieldContainer>
);

export default PurchaseType;
