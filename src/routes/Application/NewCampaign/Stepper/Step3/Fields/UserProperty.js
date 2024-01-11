import React from 'react';
import { useFormikContext } from 'formik';
import { makeStyles } from '@mui/styles';

import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import FormikSelect from 'components/FormControls/Select';
import FormikAutocomplete from 'components/FormControls/Autocomplete/Single';

const useStyles = makeStyles(() => ({
  select: {
    minWidth: '240px',
  },
  selectControl: {
    marginRight: '15px',
  },
  autocompleteControl: {
    marginRight: '15px',
    width: '190px',
  },
  startLabel: {
    marginRight: '15px',
    fontSize: '14px',
    textAlign: 'start',
  },
  label: {
    marginLeft: '15px',
    marginRight: '15px',
    fontSize: '14px',
    textAlign: 'start',
  },
  equality: {
    marginRight: '15px',
  },
}));

const UserProperty = ({
  fieldName,
  userProp,
  item,
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const userPropOptions = userProp.map(({ name: propName }) => ({
    label: propName,
    value: propName,
  }));
  const valueOptions = userProp
    .find((v) => v.name === item.name)?.values
    .map(({ value }) => ({
      label: value,
      value,
    }));

  return (
    <>
      <div className={classes.startLabel}>
        User property
      </div>
      <FormikAutocomplete
        options={userPropOptions}
        placeholder="Select"
        multiple={false}
        name={`${fieldName}name`}
        value={item.name}
        classes={{
          control: classes.autocompleteControl,
        }}
        onSelectOption={(e) => {
          setFieldValue(`${fieldName}name`, e);
        }}
        required
      />
      {item.name && (
        <>
          <div className={classes.equality}>
            =
          </div>
          <FormikSelect
            name={`${fieldName}val`}
            placeholder="Select"
            value={item.val}
            options={valueOptions}
            classes={{
              control: classes.selectControl,
              select: classes.select,
            }}
          />
        </>
      )}
    </>
  );
};

export default ({
  name,
  values,
  ...props
}) => (
  <WithOrField
    component={UserProperty}
    name={`${name}userProperty`}
    items={values.userProperty}
    {...props}
  />
);
