import React from 'react';
import { makeStyles } from '@mui/styles';

import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import FormikTextField from 'components/FormControls/TextField';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  label: {
    marginRight: '15px',
    fontSize: '14px',
  },
  endLabel: {
    marginLeft: '15px',
    fontSize: '14px',
  },
  textField: {
    width: '220px',
  },
}));

const ExpirationDateAgoTo = ({
  name,
  onRemove,
}) => {
  const classes = useStyles();

  return (
    <FieldContainer
      onRemove={() => onRemove(name)}
    >
      <div className={classes.wrapper}>
        <div className={classes.label}>
          Premium expired less than
        </div>
        <FormikTextField
          name={`${name}expirationDateAgoTo`}
          withDebounce
          placeholder="Enter number"
          classes={{
            root: classes.textField,
          }}
        />
        <div className={classes.endLabel}>
          days ago
        </div>
      </div>
    </FieldContainer>
  );
};

export default ExpirationDateAgoTo;
