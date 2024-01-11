import React from 'react';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import AutocompleteFS from 'components/FormControls/Autocomplete/AutocompleteFS';

/* eslint-disable-next-line max-len */
const href = 'https://www.notion.so/am4g/How-can-I-get-idfv-idfa-android-id-from-my-device-cdb8f3fedc6742ada364350fa6c58037';

const Idfv = ({
  fieldName: name,
  classes,
  item,
}) => (
  <div className={classes.startContainer}>
    <div>
      <LabelWithAsterisk
        label="Device Idfv"
        withAsterisk={false}
        tooltipText={(
          <div>
            For testing purposes. Enter your device IDFV to receive
            this campaign on your test device if all the campaign setting
            are correct.&nbsp;
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              Learn how to get IDFV
            </a>
          </div>
)}
      />
      <AutocompleteFS
        options={[]}
        placeholder="Type Device Idfv"
        name={`${name}deviceIdfv`}
        value={item.deviceIdfv}
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
    component={Idfv}
    name={`${name}deviceIdfv`}
    items={values.deviceIdfv}
    {...props}
  />
);
