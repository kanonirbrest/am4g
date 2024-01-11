import { IN_APP_CUSTOM_TYPE, NEW_CAMP_CONTROLS } from 'utils/constants/campaignForm';

const step = 'step2';
const triggeringName = `${step}.triggering.`;

const useTrigger = ({ formik, triggers }) => {
  const triggeringValues = formik.values[step].triggering;

  const handleScheduledTypeChange = (newValue) => {
    const isShowTriggerOnceValue = newValue === IN_APP_CUSTOM_TYPE.SHOW_ONCE;
    formik.setFieldValue(`${triggeringName}isShowTriggerOnce`, isShowTriggerOnceValue);
    formik.setFieldValue(`${triggeringName}type`, newValue);
  };
  const triggerOptions = triggers.trigger_events.map(({ name: triggerName }) => ({
    label: triggerName,
    value: triggerName,
  }));
  const trigger = triggeringValues[NEW_CAMP_CONTROLS.TRIGGER];

  return {
    handleScheduledTypeChange,
    triggeringValues: formik.values[step].triggering,
    trigger,
    triggerOptions,
  };
};

export default useTrigger;
