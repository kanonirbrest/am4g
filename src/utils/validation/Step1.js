import * as Yup from 'yup';

export default Yup.object().shape({
  step1: Yup.object().shape({
    name: Yup.string('Required field')
      .required('Required field'),
  }),
});
