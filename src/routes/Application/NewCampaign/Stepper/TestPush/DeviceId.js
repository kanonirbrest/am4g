import React from 'react';
import {
  makeStyles,
} from '@mui/styles';

import RemoveButton from 'components/RemoveButton';
import FormikTextField from 'components/FormControls/TextField';
import Filled from 'assets/icons/Filled';
import { DEVICE_STATUS } from 'utils/constants/campaign';

const useStyles = makeStyles(() => ({
  input: {
    width: '330px',
    fontSize: '12px',
  },
  row: {
    display: 'flex',
    marginBottom: '10px',
    flexDirection: 'column',
  },
  inputContainer: {
    display: 'flex',
  },
  testLabel: {
    fontSize: '11px',
    marginBottom: '5px',
    color: '#6C7688',
  },
  textField: {
    minWidth: '400px',
    paddingRight: '30px',
  },
  icon: {
    position: 'absolute',
    right: '5px',
  },
}));

export default ({
  index, field, ids,
  onRemove,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.testLabel}>Test Device IDFV</div>
      <div className={classes.inputContainer}>
        <FormikTextField
          name={`ids[${index}]`}
          classes={{
            input: classes.textField,
          }}
          customError={field.status === DEVICE_STATUS.ERROR && field}
          icon={field.status === DEVICE_STATUS.OK
        && <Filled color="#22BB9F" className={classes.icon} />}
        />
        {ids.length > 1 && (
        <RemoveButton
          onClick={onRemove}
        />
        )}
      </div>
    </div>
  );
};
