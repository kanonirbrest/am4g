import * as React from 'react';
import { makeStyles } from '@mui/styles';
import FormikColorPicker from 'components/FormControls/FormikColorPicker';
import FormikTextField from 'components/FormControls/TextField';
import FormikCheckbox from 'components/FormControls/Checkbox';

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    marginBottom: '10px',
  },
  label: {
    fontSize: '11px',
    color: '#6C7688',
    textAlign: 'start',
    marginBottom: '5px',
  },
  checkBoxLabel: {
    color: '#3E4554',
    fontSize: '12px',
  },
}));

export default ({ name, values }) => {
  const classes = useStyles();

  return (
    <div className={classes.preview}>
      <div className={classes.row}>
        <FormikColorPicker
          label="Icon color"
          value={values.iconColor}
          name={`${name}iconColor`}
        />
        <FormikColorPicker
          label="Background color"
          value={values.backgroundColor}
          name={`${name}backgroundColor`}
        />
      </div>
      <div className={classes.row}>
        <FormikColorPicker
          label="Border color"
          value={values.borderColor}
          name={`${name}borderColor`}
        />
        <div className={classes.field}>
          <div className={classes.label}>
            Border thickness
          </div>
          <FormikTextField
            name={`${name}borderThickness`}
            classes={{
              control: classes.textField,
              root: classes.input,
            }}
            placeholder="Enter value"
            type="number"
            inputProps={{ min: 0 }}
            withDebounce
          />
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.field}>
          <FormikCheckbox
            label="Show buttons shadow"
            name={`${name}showShadow`}
            checked={values.showShadow}
            value={values.showShadow}
            classes={{
              checkBoxLabel: classes.checkBoxLabel,
            }}
          />
        </div>
      </div>

    </div>
  );
};
