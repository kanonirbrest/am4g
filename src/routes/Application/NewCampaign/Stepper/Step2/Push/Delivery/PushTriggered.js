import React from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import ContentBox from 'components/ContentBox';
import FormikTabRadio from 'components/FormControls/FormikTabRadio';
import { campaignType } from 'components/constants';

const options = [
  {
    label: 'Session End',
    value: campaignType.pushTriggeredSessionEnd,
  },
  {
    label: 'Trial Cancelled',
    value: campaignType.pushTriggeredCancelTrail,
  },
  {
    label: 'Paid Cancelled',
    value: campaignType.pushTriggeredCancelPaid,
  },
];
export default function PushTriggered() {
  const {
    setFieldValue, touched, errors, values,
  } = useFormikContext();

  const onChange = (v) => {
    if (v === campaignType.pushTriggeredCancelPaid) {
      setFieldValue(
        'step3.subscriptionStatus.subscriptionStatus', ['Cancelled Paid'],
      );
    } else if (v === campaignType.pushTriggeredCancelTrail) {
      setFieldValue(
        'step3.subscriptionStatus.subscriptionStatus', ['Cancelled Trial'],
      );
    }

    setFieldValue('step1.type', v);
  };

  return (
    <ContentBox label="DELIVERY">
      <LabelWithAsterisk
        label="Select trigger"
        withAsterisk={false}
        tooltipText="Send push notification at the moment when the selected event occurs."
      />
      <FormikTabRadio
        options={options}
        value={values.step1.type}
        onChange={onChange}
        bpHeight="auto"
        error={_get(touched, 'step2.trigger')
          && _get(errors, 'step2.trigger')}
      />
    </ContentBox>
  );
}
