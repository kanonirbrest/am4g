import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikSelect from 'components/FormControls/Select';
import FormikCheckbox from 'components/FormControls/Checkbox';
import FormikTextField from 'components/FormControls/TextField';
import Info from 'assets/icons/Info';

const useStyles = makeStyles(() => ({
  select: {
    minWidth: '160px',
  },
  formControl: {
    marginRight: '15px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  panelLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px',
    color: '#6C7688',
    minWidth: '260px',
    paddingRight: '10px',
  },
  infoIcon: {
    marginRight: '10px',
  },
  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
  },
}));

export default ({
  page, setPage, pageOptions,
  isShowPageFilter,
}) => {
  const classes = useStyles();
  const { values, setFieldValue, handleSubmit } = useFormikContext();

  return (
    <div className={classes.filtersWrapper}>
      <div className={classes.panelLabel}>
        <Info className={classes.infoIcon} />
        CAMPAIGN DETAILS
      </div>
      <form
        onSubmit={handleSubmit}
        className={classes.form}
      >
        {isShowPageFilter && (
        <FormikSelect
          options={pageOptions}
          name="pages"
          value={page}
          onChange={(e) => {
            setPage(e.target.value);
          }}
          classes={{
            select: classes.select,
            control: classes.formControl,
          }}
          placeholder="Select Page"
        />
        )}
        <FormikSelect
          options={[]}
          name="country"
          value={values.country}
          onChange={(e) => {
            setFieldValue('country', e.target.value);
          }}
          classes={{
            select: classes.select,
            control: classes.formControl,
          }}
          placeholder="Any Country"
          disabled
        />
        <FormikSelect
          options={[]}
          name="version"
          value={values.version}
          classes={{
            select: classes.select,
            control: classes.formControl,
          }}
          onChange={(e) => {
            setFieldValue('version', e.target.value);
          }}
          placeholder="Any App version"
          disabled
        />
        <FormikCheckbox
          label="Compare to"
          name="compareTo"
          value={values.compareTo}
          disabled
        />
        <FormikTextField
          type="datetime-local"
          name="startDate"
          disabled
        />
        <FormikTextField
          type="datetime-local"
          name="endDate"
          disabled
        />
      </form>
    </div>
  );
};
