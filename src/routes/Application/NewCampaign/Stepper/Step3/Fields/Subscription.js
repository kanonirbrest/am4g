import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import { subscriptionFreeOptions, subscriptionOptions }
  from 'routes/Application/NewCampaign/Stepper/Step3/constants';
import FormikAutocomplete from 'components/FormControls/Autocomplete';
import Hint from 'components/Hint';
import { BUTTON_TYPES } from 'utils/styles/common';
import { campaignType } from 'components/constants';
import AutocompleteFS from 'components/FormControls/Autocomplete/AutocompleteFS';

const Subscription = ({
  values,
  name,
  classes,
  onRemove,
  disabled = false,
}) => {
  const [isShowScreenId, setIsShowScreenId] = useState(!!values.screenId);
  const [isShowProductId, setIsShowProductId] = useState(!!values.productId);
  const { setFieldValue, values: formikValues } = useFormikContext() ?? {};

  const onRemoveProduct = () => {
    setIsShowProductId(false);
    setFieldValue(`${name}productId`, null);
  };
  const onRemoveScreen = () => {
    setIsShowScreenId(false);
    setFieldValue(`${name}screenId`, null);
  };
  const isShowSubFields = !!values.subscriptionStatus
    .filter((i) => i !== 'Free').length;
  const options = formikValues.step1.type === campaignType.inAppInterstitials
    ? subscriptionFreeOptions : subscriptionOptions;

  return (
    <FieldContainer
      onRemove={() => onRemove(name)}
      disabledRemove
    >
      <>
        <LabelWithAsterisk
          label="Subscription Status"
        />
        <FormikAutocomplete
          options={options}
          name={`${name}subscriptionStatus`}
          placeholder="Add status"
          value={values.subscriptionStatus}
          required
          disabled={disabled}
        />
        {isShowSubFields && (
        <>
          {isShowProductId && (
          <div className={classes.extraField}>
            <div>
              <div className={classes.fieldLabel}>
                Product ID
                <Hint text="Specify what Product ID converted a free user to premium" />
              </div>
              <AutocompleteFS
                options={[]}
                placeholder="Enter Product ID"
                name={`${name}productId`}
                value={values.productId || []}
              />
            </div>
            <Button
              variant={BUTTON_TYPES.TRANSPARENT}
              disableRipple
              onClick={onRemoveProduct}
              className={classes.removeBtn}
            >
              Remove product ID
            </Button>
          </div>
          )}
          {isShowScreenId && (
          <div className={classes.extraField}>
            <div>
              <div className={classes.fieldLabel}>
                Screen ID
                <Hint text="Specify what Screen ID converted a free user to premium" />
              </div>
              <AutocompleteFS
                options={[]}
                placeholder="Enter Screen ID"
                name={`${name}screenId`}
                value={values.screenId || []}
              />
            </div>
            <Button
              variant={BUTTON_TYPES.TRANSPARENT}
              disableRipple
              onClick={onRemoveScreen}
              className={classes.removeBtn}
            >
              Remove screen ID
            </Button>
          </div>
          )}
          <div>
            {!isShowProductId && (
            <Button
              color="primary"
              onClick={() => {
                setIsShowProductId(true);
                setFieldValue(`${name}productId`, '');
              }}
              classes={{ root: classes.addButton }}
            >
              + Add product ID
            </Button>
            )}
            {!isShowScreenId && (
            <Button
              color="primary"
              onClick={() => {
                setIsShowScreenId(true);
                setFieldValue(`${name}screenId`, '');
              }}
              classes={{ root: classes.addButton }}
            >
              + Add screen ID
            </Button>
            )}
          </div>
        </>
        )}
      </>
    </FieldContainer>
  );
};

export default Subscription;
