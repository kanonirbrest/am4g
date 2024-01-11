import * as Yup from 'yup';
import { stringValidation } from 'utils/validation/Step2/InApp/utils';

export default Yup.object().shape({
  step3: Yup.object().shape({
    subscriptionStatus: Yup.object().shape({
      subscriptionStatus: Yup.array().min(1, 'Should have at least 1 selected item.'),
      screenId: stringValidation,
      productId: stringValidation,
    }),
    nps: Yup.object().shape({
      npsScores: Yup.array().min(1, 'Should have at least 1 selected item.'),
      npsCampaigns: Yup.array().min(1, 'Should have at least 1 selected item.'),
    }),
    country: Yup.object().shape({
      country: Yup.array().min(1, 'Should have at least 1 selected item.'),
    }),
    userBucket: Yup.object().shape({
      userBucket: Yup.array().of(
        Yup.number()
          .required('Required field')
          .typeError('Should be a number')
          .max(1000, 'Should be less than <= 1000')
          .min(1, 'Should be more than >= 1'),
      ),
    }),
    region: Yup.object().shape({
      region: Yup.array().min(1, 'Should have at least 1 selected item.'),
    }),
    purchaseType: Yup.object().shape({
      purposes: Yup.array().min(1, 'Should have at least 1 selected item.'),
    }),
    expirationDateFrom: Yup.object().shape({
      expirationDateFrom: Yup.number()
        .typeError('Should be a number')
        .min(0, 'Should be more than >= 0'),

    }),
    expirationDateTo: Yup.object().shape({
      expirationDateTo: Yup.number()
        .typeError('Should be a number')
        .min(0, 'Should be more than >= 0'),
    }),
    expirationDateAgoFrom: Yup.object().shape({
      expirationDateAgoFrom: Yup.number()
        .typeError('must be a number')
        .min(0, 'Should be more than >= 0'),
    }),
    expirationDateAgoTo: Yup.object().shape({
      expirationDateAgoTo: Yup.number()
        .typeError('must be a number')
        .min(0, 'Should be more than >= 0'),
    }),
    appVersion: Yup.array().of(
      Yup.object().shape({
        val: Yup.string()
          .required('Required field'),
      }),
    ),
    renewCount: Yup.array().of(
      Yup.object().shape({
        renewCount: Yup.string()
          .required('Required field'),
      }),
    ),
    osVersion: Yup.array().of(
      Yup.object().shape({
        val: Yup.string()
          .required('Required field'),
      }),
    ),
    deviceIdfv: Yup.array().of(
      Yup.object().shape({
        deviceIdfv: Yup.array()
          .min(1, 'Should have at least 1 selected item.')
          .required('Required field'),
      }),
    ),
    ldTrackId: Yup.array().of(
      Yup.object().shape({
        ldTrackId: Yup.array().min(1, 'Should have at least 1 selected item.'),
      }),
    ),
    deviceModel: Yup.array().of(
      Yup.object().shape({
        deviceModel: Yup.array().min(1, 'Should have at least 1 selected item.'),
      }),
    ),
    userProperty: Yup.array().of(
      Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Required field'),
          val: Yup.string().required('Required field'),
        }),
      ),
    ),
    sinceFirstVisitLess: Yup.array().of(
      Yup.object().shape({
        val: Yup.string()
          .required('Required field'),
      }),
    ),
    sinceFirstVisitMore: Yup.array().of(
      Yup.object().shape({
        val: Yup.string()
          .required('Required field'),
      }),
    ),
    hasEvent: Yup.array().of(
      Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required('Required field'),
          val: Yup.number()
            .typeError('Should be a number')
            .required('Required field'),
          params: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required('Required field'),
              val: Yup.array()
                .when('name', {
                  is: (v) => !!v,
                  then: Yup.array().min(1, 'Should have at least 1 selected item.'),
                }),
            }),
          ),
        }),
      ),
    ),
    afterEvent: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required('Required field'),
        val: Yup.string()
          .required('Required field'),
      }),
    ),
    sinceLastVisitMore: Yup.array().of(
      Yup.object().shape({
        val: Yup.string()
          .required('Required field'),
      }),
    ),
    sinceLastVisitLess: Yup.array().of(
      Yup.object().shape({
        val: Yup.string()
          .required('Required field'),
      }),
    ),
    sessionCount: Yup.array().of(
      Yup.object().shape({
        val: Yup.string()
          .required('Required field'),
      }),
    ),
    impressionCampaign: Yup.array().of(
      Yup.object().shape({
        ids: Yup.array().min(1, 'Should have at least 1 selected item.'),
      }),
    ),
  }),
});
