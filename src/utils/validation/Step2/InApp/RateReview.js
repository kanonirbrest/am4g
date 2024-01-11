import * as Yup from 'yup';

import triggering from 'utils/validation/Step2/InApp/Triggering';

export default Yup.object().shape({
  step2: Yup.object().shape(triggering),
});
