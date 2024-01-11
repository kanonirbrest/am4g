import * as Yup from 'yup';
import Push from 'utils/validation/Step2/Push';

export default Yup.object().shape({
  step2: Yup.object().shape({
    ...Push,
    limitPerDevice: Yup.number().nullable()
      .typeError('must be a number')
      .min(1, 'Should be more than >= 1')
      .required('Required field'),
  }),
});
