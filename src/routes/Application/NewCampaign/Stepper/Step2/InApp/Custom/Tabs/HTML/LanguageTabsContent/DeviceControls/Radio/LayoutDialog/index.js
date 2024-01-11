import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFormikContext } from 'formik';

import FormikCheckbox from 'components/FormControls/Checkbox';
import FormikSelect from 'components/FormControls/Select';
import {
  ICON_SIZE_OPTIONS,
  ICON_TYPE_OPTIONS,
  RADIO_HEIGHT_TYPE_OPTIONS,
  TEMPLATE_OPTIONS,
} from 'utils/constants/campaignForm';
import FormikTextField from 'components/FormControls/TextField';
import Button from '@mui/material/Button';
import { BUTTON_TYPES } from 'utils/styles/common';
import Save from 'assets/icons/Save';
import CardView from './CardView';

const useStyles = makeStyles(() => ({
  dialog: {
    margin: 0,
    minWidth: '75vw',
    background: '#F8FAFD',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: 'white',
    padding: '30px',
    borderTop: '1px solid #D8DFE8',
  },
  modalContainer: {
    overflow: 'auto',
    flexGrow: 1,
  },
  close: {
    position: 'absolute',
    right: '17px',
    top: '12px',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '10px',
  },
  title: {
    margin: 0,
    padding: '17px 20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#3E4554',
  },
  label: {
    fontSize: '11px',
    fontWeight: 400,
    color: '#6C7688',
    marginBottom: '2px',
  },
  corner: {
    width: '360px',
  },
  container: {
    display: 'flex',
  },
  row: {
    display: 'flex',
    marginBottom: '10px',
  },
  input: {
    width: '80px',
  },
  block: {
    marginRight: '10px',
  },
  select: {
    minWidth: '70px',
  },
  cards: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  card: {

  },
  footer: {
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid #D8DFE8',
  },
  checkBox: {
    alignSelf: 'end',
  },
  checkBoxLabel: {
    color: '#3E4554',
    fontSize: '12px',
  },
}));

export default ({
  open,
  setOpen,
  name, values,
  fieldIndex,
}) => {
  const classes = useStyles();
  const { values: formikValues, setFieldValue } = useFormikContext();
  const handleClose = () => {
    const { languages } = formikValues.step2;
    setFieldValue('step2.languages', languages.map((l) => ({
      ...l,
      fields:
        l.fields.map((f, fInd) => {
          if (fieldIndex === fInd) {
            return {
              ...f,
              ...values,
              buttonList: f.buttonList,
            };
          }

          return f;
        }),
    })));
    setOpen(false);
  };

  return (
    <Dialog
      open={open !== false}
      onClose={handleClose}
      aria-labelledby="layout-dialog"
      aria-describedby="layout-dialog"
      classes={{ paper: classes.dialog }}
    >
      <IconButton
        className={classes.close}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle classes={{
        root: classes.title,
      }}
      >
        Layout Preferences
      </DialogTitle>
      <div className={classes.modalBody}>
        <div>
          <div className={classes.row}>
            <div className={classes.block}>
              <div className={classes.label}>Radio Card Template</div>
              <FormikSelect
                options={TEMPLATE_OPTIONS}
                disabled
                name={`${name}template`}
                classes={{
                  select: classes.select,
                }}
              />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.block}>
              <div className={classes.label}>Radio card height</div>
              <FormikSelect
                options={RADIO_HEIGHT_TYPE_OPTIONS}
                name={`${name}radioHeight`}
                classes={{
                  select: classes.select,
                }}
              />
            </div>
            <div className={classes.block}>
              <div className={classes.label}>Height value</div>
              <FormikTextField
                name={`${name}height`}
                placeholder="Enter value"
                type="number"
                inputProps={{ min: 0 }}
                classes={{
                  root: classes.input,
                }}
                withDebounce
              />
            </div>
            <div className={classes.block}>
              <div className={classes.label}>Corner radius</div>
              <FormikTextField
                name={`${name}cornerRadius`}
                placeholder="Enter value"
                type="number"
                inputProps={{ min: 0 }}
                classes={{
                  root: classes.input,
                }}
                withDebounce
              />
            </div>
            <div className={classes.block}>
              <div className={classes.label}>Cards spacing</div>
              <FormikTextField
                name={`${name}cardsSpacing`}
                placeholder="Enter value"
                type="number"
                inputProps={{ min: 0 }}
                classes={{
                  root: classes.input,
                }}
                withDebounce
              />
            </div>
            <div className={classes.block}>
              <div className={classes.label}>Icon Size</div>
              <FormikSelect
                options={ICON_SIZE_OPTIONS}
                name={`${name}iconSize`}
                classes={{
                  select: classes.select,
                }}
              />
            </div>
            <div className={classes.block}>
              <div className={classes.label}>Icon Type</div>
              <FormikSelect
                options={ICON_TYPE_OPTIONS}
                name={`${name}iconType`}
                disabled
                classes={{
                  select: classes.select,
                }}
              />
            </div>
            <FormikCheckbox
              key="showIcon"
              name={`${name}showIcon`}
              label="Show Icon"
              checked={values.showIcon}
              classes={{
                control: classes.checkBox,
                checkBoxLabel: classes.checkBoxLabel,
              }}
            />
          </div>
        </div>
        <div className={classes.cards}>
          <CardView
            label="Default Radio Card View"
            name={name}
            values={values}
            itemValues={values}
          />
          <CardView
            label="Selected Radio Card View"
            name={name}
            values={values}
            itemValues={values.selected}
            isSelected
          />
        </div>
      </div>
      <footer className={classes.footer}>
        <Button
          variant={BUTTON_TYPES.BLUE}
          color="primary"
          onClick={handleClose}
        >
          <Save className={classes.icon} />
          Save all changes
        </Button>
      </footer>
    </Dialog>
  );
};
