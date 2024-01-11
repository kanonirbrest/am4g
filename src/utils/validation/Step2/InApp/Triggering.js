import * as Yup from 'yup';
import dayjs from 'dayjs';

import { IN_APP_CUSTOM_TYPE } from 'utils/constants/campaignForm';
import { SHOW_END_DATE } from 'utils/constants/triggering';
import { dateValidation, numberMoreThanOne, numberValidation }
  from 'utils/validation/Step2/InApp/utils';
import { DATE_TYPE_ERROR } from 'utils/validation/constant';

export default {
  triggering: Yup.object().shape({
    trigger: Yup.string()
      .required('Required field'),
    hasEventParams: Yup.array().of(Yup.object().shape({
      name: Yup.string().typeError('Should be string')
        .required('Required field'),
      val: Yup.array()
        .when('name', {
          is: (v) => !!v,
          then: Yup.array().min(1, 'Should have at least 1 selected item.'),
        }),
    })),
    custom: Yup.array()
      .when('type', {
        is: (t) => t === IN_APP_CUSTOM_TYPE.CUSTOM,
        then: Yup.array().min(1, 'At least one option is required')
          .of(Yup.number()
            .typeError('must be a number')
            .min(1, 'Should be more than >= 1')),
      }),
    limit: Yup.mixed()
      .when('type', {
        is: (t) => [IN_APP_CUSTOM_TYPE.CUSTOM, IN_APP_CUSTOM_TYPE.REPEATED]
          .includes(t),
        then: numberValidation,
      }),
    perSession: Yup.mixed()
      .when('type', {
        is: (t) => [IN_APP_CUSTOM_TYPE.CUSTOM, IN_APP_CUSTOM_TYPE.REPEATED]
          .includes(t),
        then: numberValidation,
      }),
    dateStart: Yup.date().typeError(DATE_TYPE_ERROR).nullable()
      .when('dateEnd', {
        is: (end) => dayjs(end).isValid(),
        then: Yup.date()
          .required('Required field').typeError(DATE_TYPE_ERROR),
      }),
    dateEnd: Yup.date().typeError(DATE_TYPE_ERROR).nullable()
      .when('isShowEndDate', {
        is: (t) => t === SHOW_END_DATE.YES,
        then: Yup.date()
          .required('Required field').typeError(DATE_TYPE_ERROR),
      }),
    startCountEventsSince: Yup.mixed()
      .when('startCountEventsSinceCampaignLaunch', {
        is: (t) => !!t,
        then: dateValidation,
      }),
    perPeriodCount: Yup.mixed()
      .when('type', {
        is: (t) => [IN_APP_CUSTOM_TYPE.CUSTOM, IN_APP_CUSTOM_TYPE.REPEATED]
          .includes(t),
        then: numberValidation,
      }),
    perPeriodType: Yup.mixed()
      .when('type', {
        is: (t) => [IN_APP_CUSTOM_TYPE.CUSTOM, IN_APP_CUSTOM_TYPE.REPEATED]
          .includes(t),
        then: Yup.mixed()
          .test('existing value, or default value',
            'Should be string',
            (value) => value === null || !!value),
      }),
    timeInterval: Yup.mixed()
      .when('type', {
        is: (t) => t === IN_APP_CUSTOM_TYPE.REPEATED,
        then: numberValidation,
      }),
    repeatOptions: Yup.object()
      .when('type', {
        is: IN_APP_CUSTOM_TYPE.REPEATED,
        then: Yup.object().shape({
          start: numberMoreThanOne,
          every: numberMoreThanOne,
        }),
      })
      .when('type', {
        is: IN_APP_CUSTOM_TYPE.SHOW_ONCE,
        then: Yup.object().shape({
          showOnceFrom: numberMoreThanOne,
        }),
      }),
  }),
};
