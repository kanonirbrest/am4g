import * as Yup from 'yup';
import { SHOW_END_DATE } from 'utils/constants/triggering';
import { dateValidation, numberMoreThanOne, numberValidation }
  from 'utils/validation/Step2/InApp/utils';
import { DATE_TYPE_ERROR } from 'utils/validation/constant';

export default Yup.object().shape({
  step2: Yup.object().shape({
    inters: Yup.object().shape({
      type: Yup.string()
        .required('Required field'),
      spots: Yup.array().nullable().min(1, 'Should be more than >= 1')
        .of(Yup.string().required('Required field')),
    }),
    triggering: Yup.object().shape({
      limit: numberValidation,
      perSession: numberValidation,
      dateStart: Yup.date().typeError(DATE_TYPE_ERROR).nullable()
        .when('isShowEndDate', {
          is: (t) => t === SHOW_END_DATE.YES,
          then: Yup.date()
            .required('Required field').typeError(DATE_TYPE_ERROR),
        }),
      dateEnd: Yup.date().typeError(DATE_TYPE_ERROR).nullable()
        .when('isShowEndDate', {
          is: (t) => t === SHOW_END_DATE.YES,
          then: Yup.date()
            .required('Required field').typeError(DATE_TYPE_ERROR),
        }),
      perPeriodCount: numberValidation,
      perPeriodType: Yup.mixed()
        .test('is undefined',
          'Should be string',
          (value) => value === null || !!value),
      timeInterval: numberValidation,
      repeatOptions: Yup.object().shape({
        start: numberMoreThanOne,
        every: numberMoreThanOne,
      }),
      startCountEventsSince: Yup.mixed()
        .when('startCountEventsSinceCampaignLaunch', {
          is: (t) => !!t,
          then: dateValidation,
        }),
    }),
  }),
});
