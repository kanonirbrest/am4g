import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikCheckbox from 'components/FormControls/Checkbox';
import FormikTextField from 'components/FormControls/TextField';

export const OPEN_ACTION_TYPE = {
  DEEPLINK: 'deeplink',
  OPEN_APP: 'open_app',
};
export const openActionTabsConfig = [{
  tabValue: OPEN_ACTION_TYPE.OPEN_APP,
  label: 'Open App',
}, {
  tabValue: OPEN_ACTION_TYPE.DEEPLINK,
  label: 'Deeplink',
}];

const useStyles = makeStyles(() => ({
  tabPanelWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  deeplink: {
    flexGrow: 1,
    marginBottom: '15px',
  },
  inputContainer: {
    flexGrow: 1,
  },
  deeplinkLabel: {
    fontSize: '11px',
    textAlign: 'start',
    marginBottom: '5px',
    color: '#6C7688',
  },
}));
const name = 'step2.';

const CommonCheckboxes = ({ values }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <FormikCheckbox
        name={`${name}drawBadge`}
        label="Draw push badge on app icon"
        checked={values.drawBadge}
        onChange={(e) => {
          setFieldValue(`${name}drawBadge`, e.target.checked);
        }}
      />
      <FormikCheckbox
        name={`${name}pushConsent`}
        label="Send to users only who gave consent to receive marketing push"
        checked={values.pushConsent}
        onChange={(e) => {
          setFieldValue(`${name}pushConsent`, e.target.checked);
        }}
      />
    </>
  );
};

export const OpenActionTabsContent = ({
  tabValue,
  values,
}) => {
  const classes = useStyles();

  switch (tabValue) {
    case OPEN_ACTION_TYPE.DEEPLINK:

      return (
        <div className={classes.tabPanelWrapper}>
          <div className={classes.deeplink}>
            <div className={classes.deeplinkLabel}>
              Deeplink
            </div>
            <FormikTextField
              value={values.deepLink}
              name={`${name}deepLink`}
              withDebounce
              classes={{
                control: classes.inputContainer,
                root: classes.inputContainer,
              }}
              placeholder="Enter deeplink"
            />
          </div>
          <CommonCheckboxes values={values} />
        </div>
      );
    case OPEN_ACTION_TYPE.OPEN_APP:

      return (
        <div className={classes.tabPanelWrapper}>
          <CommonCheckboxes values={values} />
        </div>
      );

    default:
      return null;
  }
};
