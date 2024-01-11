import { additionalTargetingFilters, targetingFilters } from 'utils/targetingConfig';

export default (filters, values, isAdditional = false) => {
  let targeting = {};

  const config = isAdditional ? additionalTargetingFilters : targetingFilters;
  filters.forEach((filter) => {
    const value = values.step3[filter];

    if (config[filter]) {
      // eslint-disable-next-line no-const-assign
      targeting = config[filter].getSendDate(targeting, value, values.step3);
    }
  });

  return targeting;
};
