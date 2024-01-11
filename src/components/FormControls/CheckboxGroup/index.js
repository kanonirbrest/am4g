import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import StatusChecked from 'assets/icons/StatusChecked';
import StatusDefault from 'assets/icons/StatusDefault';
import CAMPAIGN_TYPE_OPTIONS
  from 'routes/Application/NewCampaign/Stepper/Step1/Tabs/constant';
import { CAMPAIGN_TYPE } from 'utils/constants/campaign';
import Checkbox from '../Checkbox';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 'bold',
    fontSize: '12px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  childWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '29px',
  },
}));

export default ({
  label, field, child,
  setActivePage,
}) => {
  const {
    values, handleSubmit, setValues, setFieldValue,
  } = useFormikContext();
  const classes = useStyles();
  const childs = child.map(({ field: childField, label: l }) => (
    <Checkbox
      key={childField}
      checkedIcon={<StatusChecked />}
      icon={<StatusDefault />}
      label={l}
      field={childField}
      checked={!!values[childField]}
      onChange={(e) => {
        setActivePage(0);
        /* overhead to show only Push Trigger filter without subtypes */
        if (childField === CAMPAIGN_TYPE_OPTIONS[CAMPAIGN_TYPE.PUSH][1].value) {
          const target = {};
          CAMPAIGN_TYPE_OPTIONS[CAMPAIGN_TYPE.PUSH][1].values.forEach((f) => {
            target[f.value] = e.target.checked;
          });

          setValues({ ...values, ...target }, false);
        } else {
          setFieldValue(childField, e.target.checked);
        }
        handleSubmit();
      }}
    />
  ));
  const onChange = (event) => {
    const result = { [field]: event.target.checked };
    child.forEach(({ field: f }) => {
      result[f] = event.target.checked;
    });
    setValues({ ...values, ...result });
    handleSubmit();
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <Checkbox
          label={label}
          field={field}
          checkedIcon={<StatusChecked />}
          icon={<StatusDefault />}
          classes={{ checkBoxLabel: classes.label }}
          onChange={onChange}
        />
      </div>
      <div className={classes.childWrapper}>
        {childs}
      </div>
    </div>
  );
};
