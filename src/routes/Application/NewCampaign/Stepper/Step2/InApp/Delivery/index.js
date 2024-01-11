import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import ContentBox from 'components/ContentBox';
import CustomTabs from 'components/CustomTabs';
import TabPanel from 'components/TabPanel';
import { triggeringTabsConfig, RepeatTabsContent }
  from 'routes/Application/NewCampaign/Stepper/Step2/InApp/Custom/RepeatTabsContent';
import { inAppDeliveryTooltip, STATUS } from 'utils/constants/campaign';
import { campaignType } from 'components/constants';
import useTrigger from 'hooks/useTrigger';
import SingleTypingAutocomplete from 'components/FormControls/Autocomplete/SingleFS';
import { useQuery } from '@apollo/client';
import { getTriggerIntersectionsQuery } from 'api/queries';
import BlacklistWarning from 'components/Warnings/Blacklist';
import IntersectionWarning from 'components/Warnings/Intersection';
import Parameter from './Parameter';

const useStyles = makeStyles(() => ({
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alert: {
    textAlign: 'start',
    width: '468px',
  },
  lightLabel: {
    fontSize: '12px',
    color: '#6C7688',
    marginBottom: '5px',
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
  paramWrapper: {
    width: '240px',
  },
  equality: {
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  wrapper: {
    marginBottom: '20px',
  },
  inputContainer: {
    minWidth: '640px',
  },
  removeBtn: {
    marginTop: '12px',
  },
  autocomplete: {
    width: '500px',
  },
}));

const step = 'step2';
const triggeringName = `${step}.triggering.`;
const triggerTablePrefix = 'trigger';

export default ({
  triggers = {},
  isEdit,
  activeApplication,
}) => {
  const formik = useFormikContext();

  const classes = useStyles();
  const {
    handleScheduledTypeChange,
    triggeringValues,
    trigger,
    triggerOptions,
  } = useTrigger({ formik, triggers });
  const intersectionsResp = useQuery(getTriggerIntersectionsQuery, {
    fetchPolicy: 'no-cache',
    variables: {
      applicationId: activeApplication.id,
      filter: {
        triggering: [{
          key: 'trigger',
          value: trigger,
        }],
        statuses: [STATUS.ACTIVE],
      },
    },
    skip: !trigger,
  });
  const warningMsg = !!intersectionsResp?.data?.campaigns
    .filter((c) => c.id !== formik.values.id).length
      && (intersectionsResp?.data?.campaigns || [])
        .map((c) => `"${c.name}"`).join(', ');

  const blacklist = React.useMemo(() => (
    activeApplication.blacklistLocal
      .includes(trigger) ? trigger : null), [activeApplication.id, trigger]);

  const onTriggeringTabChange = (value) => {
    const { triggering } = formik.values.step2;
    triggering.perSession = null;
    triggering.limit = null;
    triggering.timeInterval = null;
    triggering.perPeriodCount = null;
    triggering.perPeriodType = null;
    triggering.dateStart = null;
    triggering.startCountEventsSince = null;
    triggering.startCountEventsSinceCampaignLaunch = null;
    triggering.dateEnd = null;
    triggering.type = value;
    formik.setFieldValue('step2.triggering', triggering);
    handleScheduledTypeChange(value);
  };

  return (
    <ContentBox label="DELIVERY">
      <LabelWithAsterisk
        label="Trigger"
      />
      <SingleTypingAutocomplete
        options={triggerOptions}
        placeholder="Select event"
        name="step2.triggering.trigger"
        value={formik.values.step2.triggering.trigger}
        classes={{
          control: classes.autocomplete,
        }}
        onBlurCallback={() => {
          formik.setFieldValue(`${triggeringName}hasEventParams`, [])
            .then(() => {
              formik.validateForm();
            });
        }}
        required
      />
      {!intersectionsResp.loading
      && <IntersectionWarning trigger={trigger} warningMsg={warningMsg} />}
      <BlacklistWarning
        trigger={blacklist}
      />
      {!!trigger && (
      <Parameter
        isMultiple
        triggers={triggers}
        isEdit={isEdit}
        trigger={trigger}
        name="step2.triggering"
        valuesName="hasEventParams"
      />
      )}
      <LabelWithAsterisk
        label="Repetition"
        withAsterisk={false}
        tooltipText={inAppDeliveryTooltip}
      />
      <CustomTabs
        handleChange={onTriggeringTabChange}
        tabsValue={triggeringValues.type}
        tabsConfig={triggeringTabsConfig}
        a11yPrefix={triggerTablePrefix}
        sm
      >
        { triggeringTabsConfig.map(({ tabValue }) => (
          <TabPanel
            value={triggeringValues.type}
            key={tabValue}
            tabValue={tabValue}
            a11yPrefix={triggerTablePrefix}
            classes={{
              tabsPanelWrapper: classes.tabsPanelWrapper,
            }}
          >
            <RepeatTabsContent
              tabValue={tabValue}
              step={step}
              name={triggeringName}
              values={triggeringValues}
              disableLimitPerSession={formik.values.step1.type
                            === campaignType.inAppRateReview}
            />
          </TabPanel>
        ))}
      </CustomTabs>
    </ContentBox>
  );
};
