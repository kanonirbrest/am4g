import React from 'react';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FormikRadio from 'components/FormControls/Radio';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import { EQUALITY } from 'utils/constants';
import AutocompleteFS from 'components/FormControls/Autocomplete/AutocompleteFS';

const LDTrackId = ({
  fieldName: name,
  classes,
  item,
}) => (
  <div className={classes.startContainer}>
    <div>
      <LabelWithAsterisk
        label="LD Track ID"
        withAsterisk={false}
        tooltipText="LD track ID is a segment of
        Houston app cohort that will get the campaign."
      />
      <AutocompleteFS
        options={[]}
        placeholder="Enter LD Track ID"
        name={`${name}ldTrackId`}
        isExclude={item.ldTrackIdOperation === EQUALITY.NOT_IN}
        value={item.ldTrackId}
      />
    </div>
    <div className={classes.radioWrapper}>
      <FormikRadio
        name={`${name}ldTrackIdOperation`}
        value={item.ldTrackIdOperation}
        defaultValue={EQUALITY.IN}
        options={[
          {
            label: 'include these LD track IDs',
            value: EQUALITY.IN,
          },
          {
            label: 'exclude these LD track IDs',
            value: EQUALITY.NOT_IN,
          },
        ]}
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
    component={LDTrackId}
    name={`${name}ldTrackId`}
    items={values.ldTrackId}
    {...props}
  />
);
