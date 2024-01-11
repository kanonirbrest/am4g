import { OPEN_ACTION } from 'utils/constants/campaign';
import { hasIntersections } from 'utils/arrayUtils';

export const END_ACTIONS = [OPEN_ACTION.CLOSE_SCREEN,
  OPEN_ACTION.RR_SCREEN, OPEN_ACTION.DEEPLINK, OPEN_ACTION.URL, OPEN_ACTION.SUBSCRIPTION,
  OPEN_ACTION.PURCHASE];
const MAX_COUNT_ANALYTIC_EVENTS = 5;
export const getFilteredActions = (options, values = []) => {
  let resultOptions = [...options];
  const actionValues = values.map((v) => v.action);
  const countOfAnalytics = actionValues
    .filter((a) => a === OPEN_ACTION.SEND_ANALYTICS).length;
  // if we have end event, disable all other except of sendAnalytic
  if (hasIntersections(actionValues, END_ACTIONS)) {
    // has end actions, allow only analytic
    resultOptions = resultOptions.map((opt) => {
      if (opt.value !== OPEN_ACTION.SEND_ANALYTICS
          || countOfAnalytics >= MAX_COUNT_ANALYTIC_EVENTS) {
        return {
          ...opt,
          disabled: true,
        };
      }

      return opt;
    });
  }

  // disable if it has already been added
  return resultOptions.map((opt) => {
    if ((opt.value !== OPEN_ACTION.SEND_ANALYTICS
        || countOfAnalytics >= MAX_COUNT_ANALYTIC_EVENTS)
        && actionValues.includes(opt.value)) {
      return {
        ...opt,
        disabled: true,
      };
    }

    return opt;
  });
};
