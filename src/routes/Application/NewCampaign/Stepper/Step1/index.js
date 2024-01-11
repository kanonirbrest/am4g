import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import { getStep2InitialValues, NEW_CAMP_CONTROLS } from 'utils/constants/campaignForm';
import CustomTabs from 'components/CustomTabs';
import FormikTextField from 'components/FormControls/TextField';
import TabPanel from 'components/TabPanel';
import { getTabContentByType, tabsConfig }
  from 'routes/Application/NewCampaign/Stepper/Step1/utils';
import { getSubTypeInitialValue } from 'utils/campaignUtils';

const useStyles = makeStyles(() => ({
  box: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.4)',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    width: '640px',
    display: 'flex',
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    marginBottom: '20px',
  },
  tabsPanelWrapper: {
    padding: '24px 0',
  },
}));
const step = 'step1';
const getName = (label) => (`${step}.${label}`);
const tablePrefix = 'campaign-type';

export default ({
  setTab, tab, isEdit,
}) => {
  const formik = useFormikContext() ?? {};
  const classes = useStyles();
  const { type } = formik.values[step];
  const handleChange = (e) => {
    formik.setFieldValue(
      getName(NEW_CAMP_CONTROLS.TYPE), e.target.value,
    );
    formik.setFieldValue(
      'step2',
      getStep2InitialValues(e.target.value),
    );
  };
  const onTabChange = (newValue) => {
    if (isEdit) return;

    setTab(newValue);
    formik.setFieldValue(
      getName(NEW_CAMP_CONTROLS.TYPE),
      getSubTypeInitialValue(newValue),
    );
    formik.setFieldValue(
      'step2',
      getStep2InitialValues(getSubTypeInitialValue(newValue)),
    );
  };

  return (
    <div>
      <div className={classes.box}>
        <FormikTextField
          label="Name"
          placeholder="Enter campaign name"
          name={getName(NEW_CAMP_CONTROLS.NAME)}
          classes={{
            root: classes.name,
            control: classes.input,
          }}
        />
        <LabelWithAsterisk
          label="Tabs"
        />
        <CustomTabs
          handleChange={onTabChange}
          tabsValue={tab}
          tabsConfig={tabsConfig}
          disabled={isEdit}
          a11yPrefix={tablePrefix}
        >
          {tabsConfig.map(({ tabValue, tabValues }) => (
            <TabPanel
              value={tab}
              key={tabValue}
              tabValues={tabValues}
              tabValue={tabValue}
              classes={{ tabsPanelWrapper: classes.tabsPanelWrapper }}
              a11yPrefix={tablePrefix}
            >
              {getTabContentByType(type, {
                handleChange,
                value: type,
                isEdit,
              })}
            </TabPanel>
          ))}
        </CustomTabs>
      </div>
    </div>
  );
};
