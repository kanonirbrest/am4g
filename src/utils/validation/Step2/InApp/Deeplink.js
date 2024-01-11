import * as Yup from 'yup';

import triggering from 'utils/validation/Step2/InApp/Triggering';

export default Yup.object().shape({
  step2: Yup.object().shape({
    ...triggering,
    deepLink: Yup
      .string()
    // eslint-disable-next-line
            .matches(/.*:\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]$/i,
        'Invalid deepLink format')
      .required('Required field'),
  }),
});
