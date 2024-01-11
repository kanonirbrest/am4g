import React from 'react';

import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import FormikRadio from 'components/FormControls/Radio';
import Hint from 'components/Hint';
import { PLATFORM } from 'utils/constants';

const iosOptions = [
  { label: 'iPhone', value: 'iPhone' },
  { label: 'iPad', value: 'iPad' },
];
const androidOptions = [
  { label: 'Phone', value: 'phone' },
  { label: 'Tablet', value: 'tablet' },
];
const DeviceType = ({
  values, name,
  onRemove, classes = {},
  platform: platformValue,
}) => (
  <FieldContainer
    onRemove={() => onRemove(name)}
  >
    <div className={classes.rowContainer}>
      <div>
        <div className={classes.fieldLabel}>
          Device Type
          <Hint text="To target both iPhone and iPad users, remove this filter" />
        </div>
        <FormikRadio
          name={`${name}deviceType`}
          value={values.deviceType}
          options={platformValue === PLATFORM.ANDROID ? androidOptions : iosOptions}
        />
      </div>
    </div>
  </FieldContainer>
);

export default DeviceType;
