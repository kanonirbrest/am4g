import * as Yup from 'yup';

const mapRules = (map, rule) => Object.keys(map)
  .reduce((newMap, key) => (
    { ...newMap, [key]: rule }), {});

export default {
  languages: Yup.lazy((map) => Yup.object(
    mapRules(map, Yup.array().of(
      Yup.object().shape({
        content: Yup.object().shape({
          body: Yup.string()
            .nullable()
            .required('Required field'),
        }),
      }),
    )),
  )),
  deepLink: Yup
    .string()
    .nullable()
    .when('openAction', {
      is: 'deeplink',
      then: Yup.string()
      // eslint-disable-next-line
                .matches(/.*:\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]$/i,
          'Invalid deepLink format')
        .required('Required field'),
    }),
  limitPerDevice: Yup.number().nullable().min(1, 'Should be more than >= 1'),
};
