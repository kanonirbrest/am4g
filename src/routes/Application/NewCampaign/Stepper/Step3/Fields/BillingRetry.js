import React from 'react';

import FormikRadio from 'components/FormControls/Radio';
import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import Hint from 'components/Hint';

const OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const BillingRetry = ({
  fieldName: name,
  classes = {},
  item,
}) => (
  <>
    <div className={classes.rowContainer}>
      <div>
        <div className={classes.fieldLabel}>
          Billing Retry
          <Hint text="If target segment both values you must remove this filter" />
        </div>
        <FormikRadio
          name={`${name}billingRetry`}
          defaultValue="yes"
          value={item.billingRetry}
          options={OPTIONS}
        />
      </div>
    </div>
  </>
);

export default ({
  name,
  values,
  ...props
}) => (
  <WithOrField
    component={BillingRetry}
    name={`${name}billingRetry`}
    items={values.billingRetry}
    {...props}
  />
);
