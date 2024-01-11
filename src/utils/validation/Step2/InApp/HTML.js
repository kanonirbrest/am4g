import * as Yup from 'yup';

import { OPEN_ACTION, ButtonActionOptions } from 'utils/constants/campaign';
import triggering from 'utils/validation/Step2/InApp/Triggering';
import { DEVICE_CONTROL } from 'utils/constants';

const withChildTextFields = [DEVICE_CONTROL.BUTTON, DEVICE_CONTROL.NPS_BUTTON, DEVICE_CONTROL.TEXT];
const requiredValues = ButtonActionOptions
  .filter((item) => item.subField)
  .map((i) => i.label);

export default Yup.object().shape({
  step2: Yup.object().shape({
    ...triggering,
    languages: Yup.array().of(
      Yup.object().shape({
        fields: Yup.array().min(1).of(
          Yup.object().shape({
            buttonList: Yup.array().when('type', {
              is: (type) => type === 'radio',
              then: Yup.array().min(1).of(Yup.object().shape({
                text: Yup.array().min(1).of(
                  Yup.object().shape({
                    title: Yup.object().shape({
                      text: Yup.string()
                        .required('Required field'),
                    }),
                    subTitle: Yup.object().shape({
                      text: Yup.string()
                        .required('Required field'),
                    }),
                    details: Yup.object().shape({
                      text: Yup.string()
                        .required('Required field'),
                    }),
                    subDetails: Yup.object().shape({
                      text: Yup.string()
                        .required('Required field'),
                    }),
                  }),
                ),
                actionValue: Yup.object().shape({
                  product: Yup.string()
                    .required('Required field'),
                }),
              })),
            }),
            text: Yup.lazy((val) => (Array.isArray(val)
              ? Yup.array().min(1)
                .when('type', {
                  is: (type) => type !== 'radio',
                  then: Yup.array().min(1).of(Yup.object().shape({
                    text: Yup.string().required(),
                  })),
                })
              : Yup.string().when('type', {
                is: (t) => withChildTextFields.includes(t),
                then: Yup.string().required('Required field'),
              }))),
            paddingVertical: Yup.number().when('type', {
              is: DEVICE_CONTROL.FEEDBACK,
              then: Yup.number()
                .typeError('must be a number')
                .min(0, 'Should be more than >= 0'),
            }),
            paddingHorizontal: Yup.number().when('type', {
              is: DEVICE_CONTROL.FEEDBACK,
              then: Yup.number()
                .typeError('must be a number')
                .min(0, 'Should be more than >= 0'),
            }),
            placeholderPaddingVertical: Yup.number().when('type', {
              is: DEVICE_CONTROL.FEEDBACK,
              then: Yup.number()
                .typeError('must be a number')
                .min(0, 'Should be more than >= 0'),
            }),
            placeholderPaddingHorizontal: Yup.number().when('type', {
              is: DEVICE_CONTROL.FEEDBACK,
              then: Yup.number()
                .typeError('must be a number')
                .min(0, 'Should be more than >= 0'),
            }),
            fontSize: Yup.number().when('type', {
              is: (v) => withChildTextFields.includes(v),
              then: Yup.number()
                .required('Required field')
                .min(1, 'Should be more than >= 1'),
            }),
            mapper: Yup.array().when('type', {
              is: DEVICE_CONTROL.NPS_SLIDER,
              then: Yup.array().min(2).of(
                Yup.object().shape({
                  score: Yup.string()
                    .required('Required field'),
                }),
              ),
            }),
            backgroundFile: Yup.object().when('type', {
              is: 'image',
              then: Yup.object().required('image is not selected'),
            }),
            backgroundValue: Yup.string().when('type', {
              is: 'image',
              then: Yup.string().required('image is not selected'),
            }),
            actions: Yup.array().of(
              Yup.object().shape({
                name: Yup
                  .string()
                  .nullable()
                  .when('action', {
                    is: 'SendAnalyticsEvent',
                    then: Yup.string()
                      .required('Required field'),
                  }),
                value: Yup.lazy((value) => {
                  if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                      return Yup.array()
                        .when(['action', 'disabledName'], {
                          is: (v, disabledName) => v === 'SendAnalyticsEvent'
                            && !disabledName,
                          then: Yup.array().of(Yup.object().shape({
                            name: Yup.string().typeError('Should be string')
                              .required('Required field'),
                            value: Yup.string().typeError('Should be string')
                              .required('Required field'),
                          })),
                        });
                    }

                    return Yup.object()
                      .when('action', {
                        is: OPEN_ACTION.PURCHASE,
                        then: Yup.object()
                          .shape({
                            product: Yup.string('should be string')
                              .required('Required field'),
                          }),
                      });
                  }

                  return Yup.mixed()
                    .nullable().when('action', {
                      is: (v) => [OPEN_ACTION.URL, OPEN_ACTION.DEEPLINK].includes(v),
                      then: Yup.string()
                        // eslint-disable-next-line
                        .matches(/.*:\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]$/i,
                          'Invalid URL/DeepLink format')
                        .required('Required field'),
                    })
                    .when('action', {
                      is: (v) => requiredValues.includes(v),
                      then: Yup.string().required('Required field'),
                    })
                    .when('action', {
                      is: (v) => [OPEN_ACTION.OPEN_PAGE, OPEN_ACTION.SUBSCRIPTION].includes(v),
                      then: Yup.string().required('Required field'),
                    })
                    .when(['action', 'disabledName'], {
                      is: (v, disabledName) => v === 'SendAnalyticsEvent'
                          && !disabledName,
                      then: Yup.array().of(Yup.object().shape({
                        name: Yup.string().typeError('Should be string')
                          .required('Required field'),
                        value: Yup.string().typeError('Should be string')
                          .required('Required field'),
                      })),
                    });
                }),
              }),
            ),
          }),
        ),
      }),
    ),
  }),
});
