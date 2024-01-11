import React from 'react';

import Step1Buttons from 'routes/Application/NewCampaign/Stepper/Buttons/Step1';
import Step2Buttons from 'routes/Application/NewCampaign/Stepper/Buttons/Step2';
import Step3Buttons from 'routes/Application/NewCampaign/Stepper/Buttons/Step3';
import useStyles from './styles';

export default ({
  activeStep,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonsWrapper}>
      {activeStep === 0 && <Step1Buttons {...props} />}
      {activeStep === 1 && <Step2Buttons {...props} />}
      {activeStep === 2 && <Step3Buttons {...props} />}
    </div>
  );
};
