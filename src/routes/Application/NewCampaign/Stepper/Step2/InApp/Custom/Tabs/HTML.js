import React from 'react';

import CustomTabs from 'components/CustomTabs';
import { NEW_CAMP_CONTROLS } from 'utils/constants/campaignForm';
import TabPanel from 'components/TabPanel';
import { makeStyles } from '@mui/styles';
import LabelWithAsterisk from 'components/LabelWithAsterisk';
import { useFormikContext } from 'formik';
import { BackgroundTabsContent } from './BackgroundTabsContent';

export const BACKGROUND_TYPE = {
  IMAGE: 'image',
  COLOR: 'color',
};
export const backgroundTabsConfig = [{
  tabValue: BACKGROUND_TYPE.COLOR,
  label: 'Color',
}, {
  tabValue: BACKGROUND_TYPE.IMAGE,
  label: 'Image',
}];
const useStyles = makeStyles(() => ({
  tabsPanelWrapper: {
    marginBottom: '30px',
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
  },
  pickerWrapper: {
    marginTop: '10px',
    width: '150px',
  },
}));

const tablePrefix = 'html';
export default ({ step }) => {
  const classes = useStyles();
  const formik = useFormikContext();

  const handleBackgroundTypeChange = (newValue) => {
    formik.setFieldValue(`${step}.${NEW_CAMP_CONTROLS.BACKGROUND}`, newValue);
  };

  return (
    <div>
      <LabelWithAsterisk label="Background" withAsterisk={false} />
      <CustomTabs
        handleChange={handleBackgroundTypeChange}
        tabsValue={formik.values[step][NEW_CAMP_CONTROLS.BACKGROUND]}
        tabsConfig={backgroundTabsConfig}
        a11yPrefix={tablePrefix}
        sm
      >
        {backgroundTabsConfig.map(({ tabValue }) => (
          <TabPanel
            value={formik.values[step][NEW_CAMP_CONTROLS.BACKGROUND]}
            key={tabValue}
            tabValue={tabValue}
            classes={{ tabsPanelWrapper: classes.tabsPanelWrapper }}
            a11yPrefix={tablePrefix}
          >
            <BackgroundTabsContent
              campaignId={formik.values.id}
              tabValue={tabValue}
              backgroundColor={formik.values.step2.backgroundColor}
              backgroundValue={formik.values.step2.backgroundValue}
              backgroundFile={formik.values.step2.backgroundFile}
              backgroundObjectFit={formik.values.step2.backgroundObjectFit}
              onFitChange={(e) => {
                formik.setFieldValue('step2.backgroundObjectFit', e.target.value);
              }}
              onChange={(value) => {
                formik.setFieldValue('step2.backgroundColor', value);
              }}
              onRemove={() => {
                formik.setFieldValue('step2.backgroundValue', null);
                formik.setFieldValue('step2.backgroundFile', null);
              }}
              onAttach={(src, file) => {
                formik.setFieldValue('step2.backgroundValue', src);
                formik.setFieldValue('step2.backgroundFile', file);
              }}
              onChangePosition={(position) => {
                formik.setFieldValue('step2.backgroundPosition', position);
              }}
              position={formik.values.step2?.backgroundPosition}
              classes={classes}
            />
          </TabPanel>
        ))}
      </CustomTabs>
    </div>
  );
};
