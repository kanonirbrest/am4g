import React from 'react';
import { makeStyles } from '@mui/styles';

import FormikSelect from 'components/FormControls/Select';

const useStyles = makeStyles(() => ({
  label: {
    color: '#6C7688',
    display: 'block',
    fontSize: '11px',
    textAlign: 'start',
    marginBottom: '5px',
    marginTop: '5px',
  },
}));

export default ({
  name,
  actionProps,
  onChange,
  actionIndex,
  pageOptions,
  value,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.label}>Success Page</div>
      <FormikSelect
        value={value?.successPage || ''}
        name={`${name}.successPage`}
        options={pageOptions}
        onChange={(e) => onChange(e, actionIndex, 'successPage')}
        placeholder="Select success page/action"
        {...actionProps}
      />
      <div className={classes.label}>Error Page</div>
      <FormikSelect
        value={value?.errorPage || ''}
        name={`${name}.errorPage`}
        options={pageOptions}
        onChange={(e) => onChange(e, actionIndex, 'errorPage')}
        placeholder="Select error page/action"
        {...actionProps}
      />
    </>
  );
};
