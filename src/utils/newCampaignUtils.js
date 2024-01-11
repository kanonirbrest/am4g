import React from 'react';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import Step1 from 'routes/Application/NewCampaign/Stepper/Step1';
import Step2 from 'routes/Application/NewCampaign/Stepper/Step2';
import Step3 from 'routes/Application/NewCampaign/Stepper/Step3';
import { getSchema } from 'utils/validation';
import { makeStyles } from '@mui/styles';

export const NewCampaignStepContent = ({ step, ...props }) => {
  switch (step) {
    case 0:
      return <Step1 {...props} />;
    case 1:
      return <Step2 {...props} />;
    case 2:
      return <Step3 {...props} />;
    default:
      return 'Unknown step';
  }
};

const getStepLabelColor = (activeStep, index) => {
  if (activeStep > index) {
    return '#4675C0';
  } if (activeStep < index) {
    return '#B2BED1';
  }

  return '#3E4554';
};
const stepStyles = {
  width: '40px',
  height: '40px',
  background: '#FFFFFF',
  border: '1px solid #B2BED1',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#6C7688',
};
const useStyles = makeStyles(() => ({
  stepIcon: {
    ...stepStyles,
  },
  disabledStepIcon: {
    ...stepStyles,
    background: '#4675C0',
    color: 'white',
  },
}));

export default React.memo((
  {
    steps, setActiveStep,
    setSchema, activeStep,
    type,
    validateForm,
  },
) => {
  const classes = useStyles();

  return steps.map((label, index) => {
    const disabled = activeStep < index;
    const onStepClick = () => {
      if (activeStep !== index) {
        setActiveStep(index);
        const schema = getSchema(index, type);
        setSchema(schema);
        if (activeStep > index) {
          setTimeout(() => {
            validateForm();
            // to handle transfer from 3 step to 2 after click submit
          }, 0);
        }
      }
    };

    return (
      <Step key={label}>
        <StepButton
          color="inherit"
          icon={(
            <div className={disabled ? classes.disabledStepIcon
              : classes.stepIcon}
            >
              {index + 1}
            </div>
          )}
          onClick={onStepClick}
          disabled={disabled}
        >
          <span style={{ color: getStepLabelColor(activeStep, index) }}>
            {label}
          </span>
        </StepButton>
      </Step>
    );
  });
});
