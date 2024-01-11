import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import ContentBox from 'components/ContentBox';
import CustomTabs from 'components/CustomTabs';
import TabPanel from 'components/TabPanel';
import { deliveryTabsConfig } from '../constants';
import DeliveryTabsContent from '../DeliveryTabsContent';

const step = 'step2';
const useStyles = makeStyles(() => ({
  name: {
    width: '640px',
    display: 'flex',
    marginBottom: '15px',
  },
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: '12px',
    color: '#3E4554',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginRight: '30px',
  },
  formControl: {
    width: '640px',
    alignItems: 'normal',
    textAlign: 'start',
    marginBottom: '15px',
  },
  tabsPanelWrapper: {
    padding: '10px 0',
  },
  checkbox: {
    marginTop: '20px',
    color: '#3E4554;',
  },
  wrapper: {
    marginBottom: '20px',
  },
  tabPanel: {
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.3)',
    border: '1px solid #D8DFE8',
    marginTop: '-1px',
    borderRadius: '8px',
    borderTopLeftRadius: '0',
  },
  tabsPanelLanguagesWrapper: {
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    height: '48px',
    width: '48px',
    borderRadius: '8px',
  },
  messageImg: {
    height: '20px !important',
    width: 'auto !important',
    marginRight: '6px',
    borderRadius: '4px',
  },
  messageContainer: {
    marginTop: '40px',
  },
  openAction: {
    marginTop: '20px',
    color: '#6C7688',
    fontSize: '11px',
    textAlign: 'start',
  },
  openActionLabel: {
    color: '#6C7688',
    marginBottom: '5px',
  },
}));

const prefix = 'delivery';
export default function PushScheduled() {
  const classes = useStyles();
  const { values: formikValues, setFieldValue } = useFormikContext();

  const values = formikValues[step];
  const handleTabChange = (newValue) => {
    setFieldValue('step2.schedule.sendNow', newValue);
  };

  return (
    <ContentBox label="DELIVERY">
      <LabelWithAsterisk
        label="Schedule type"
        withAsterisk={false}
      />
      <CustomTabs
        handleChange={handleTabChange}
        tabsValue={values.schedule.sendNow}
        tabsConfig={deliveryTabsConfig}
        a11yPrefix={prefix}
        sm
      >
        { deliveryTabsConfig.map(({ tabValue }) => (
          <TabPanel
            value={values.schedule.sendNow}
            key={tabValue}
            tabValue={tabValue}
            a11yPrefix={prefix}
            classes={{
              tabsPanelWrapper: classes.tabsPanelWrapper,
            }}
          >
            <DeliveryTabsContent
              tabValue={tabValue}
              step={step}
              values={formikValues.schedule}
            />
          </TabPanel>
        ))}
      </CustomTabs>
    </ContentBox>
  );
}
