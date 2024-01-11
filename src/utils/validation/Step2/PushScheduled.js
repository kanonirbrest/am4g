import * as Yup from 'yup';
import Push from 'utils/validation/Step2/Push';
import { DATE_TYPE_ERROR } from 'utils/validation/constant';

export default Yup.object().shape({
  step2: Yup.object().shape({
    schedule: Yup.object().shape({
      beginningDate: Yup.date('must be a `date`').nullable()
        .default(null).when(['sendNow', 'type'], {
          is: (sendNow, type) => !sendNow
                        && ['once', 'minute', 'day', 'week', 'month'].includes(type),
          then: Yup.date('must be a `date`')
            .typeError(DATE_TYPE_ERROR).required('Required field'),
        }),
      endingDate: Yup.date('must be a `date`')
        .min(Yup.ref('beginningDate'), 'date should be greater than beginning Date')
        .nullable()
        .when(['sendNow', 'type', 'endingType'], {
          is: (sendNow, type, endingType) => !sendNow
                        && ['minute', 'day', 'week', 'month']
                          .includes(type) && endingType === 'on_the_date',
          then: Yup.date('must be a `date`')
            .typeError(DATE_TYPE_ERROR).required('Required field')
            .min(Yup.ref('beginningDate'), 'date should be greater than beginning Date'),
        }),
      endingAfterNOccur: Yup.number().nullable().when(['sendNow', 'type', 'endingType'], {
        is: (sendNow, type, endingType) => !sendNow
                    && ['minute', 'day', 'week', 'month']
                      .includes(type) && endingType === 'after_n_occur',
        then: Yup.number()
          .typeError('must be a number').required('Required field')
          .min(1, 'Should be more than >= 1'),
      }),
      everyNTerm: Yup.number().nullable()
        .when(['sendNow', 'type'], {
          is: (sendNow, type) => !sendNow
                    && ['day', 'week', 'month'].includes(type),
          then: Yup.number()
            .typeError('must be a number').required('Required field')
            .min(1, 'Should be more than >= 1'),
        })
        .when(['sendNow', 'type'], {
          is: (sendNow, type) => !sendNow
                  && ['minute'].includes(type),
          then: Yup.number()
            .typeError('must be a number').required('Required field')
            .min(15, 'Should be more than >= 15'),
        }),
      daysOfWeek: Yup.array().nullable()
        .when(['sendNow', 'type'], {
          is: (sendNow, type) => !sendNow
                        && type === 'week',
          then: Yup.array().min(1, 'At least one option is required'),
        }),
      daysOfMonth: Yup.array().nullable()
        .when(['sendNow', 'type'], {
          is: (sendNow, type) => !sendNow
                        && type === 'month',
          then: Yup.array().min(1, 'At least one option is required'),
        }),
    }),
    ...Push,
  }),
});
