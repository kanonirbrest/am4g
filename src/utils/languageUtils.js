import { OPEN_ACTION } from 'utils/constants/campaign';
import { FORM_SUBMITTED_EVENT } from 'utils/constants/actions';
import { v4 as uuidv4 } from 'uuid';
import { DEVICE_CONTROL } from './constants';
import { DEFAULT_RADIO } from './constants/campaignForm';

const OFFER_WIDGETS = [DEVICE_CONTROL.TEXT, DEVICE_CONTROL.BUTTON];

export const getLocale = (allLanguages, tab) => allLanguages
  .find((l) => l.title === tab)?.locale;
const getSubFieldDefaultValue = (subField) => {
  if (subField === OPEN_ACTION.SUB_SEND_ANALYTICS) {
    return { value: [] };
  }
  if (subField === OPEN_ACTION.SUB_PURCHASE) {
    return {
      value: {
        successPage: '',
        errorPage: '',
        product: '',
        offer: '',
      },
    };
  }
  if (subField === OPEN_ACTION.SUB_PURCHASE_TRIGGER) {
    return {
      value: {
        successPage: '',
        errorPage: '',
      },
    };
  }
  if (subField) {
    return { value: '' };
  }

  return null;
};
export const onAddActionToAllLanguages = (
  value, languages, activeFieldIndex, actionOptions,
) => languages
  .map(
    (language) => {
      const { fields } = language;

      return {
        ...language,
        fields: fields
          .map((f, fIndex) => {
            if (fIndex === activeFieldIndex) {
              const option = actionOptions.find((o) => o
                .value === value);
              const extraField = getSubFieldDefaultValue(option.subField);

              if (value === OPEN_ACTION.SUBMIT) {
                // if we add Submit action, we should add
                // analytics event = formSubmitted
                return {
                  ...f,
                  actions: [...(f.actions ? f.actions : []), {
                    action: value,
                    name: '',
                    ...extraField,
                  }, FORM_SUBMITTED_EVENT],
                };
              }

              return {
                ...f,
                actions: [...(f.actions ? f.actions : []), {
                  action: value,
                  name: '',
                  ...extraField,
                }],
              };
            }

            return f;
          }),
      };
    },
  );

export const onRmvActionForAllLanguages = (
  languages, activeFieldIndex, removeIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, fIndex) => {
          if (fIndex === activeFieldIndex) {
            return {
              ...f,
              actions: f.actions
                .filter((act, ind) => {
                  // in case if we remove submit we should remove
                  // form submitted event
                  if (f.actions[removeIndex].action === OPEN_ACTION.SUBMIT
                  && act.action === OPEN_ACTION.SEND_ANALYTICS
                      && act.name === 'FormSubmitted') {
                    return false;
                  }

                  return ind !== removeIndex;
                }),
            };
          }

          return f;
        }),
    };
  },
);
const removeOfferIdFromAction = (field, target) => {
  if (field.type === DEVICE_CONTROL.BUTTON) {
    return {
      ...field,
      actions: field.actions.map((a) => {
        if (a.action === OPEN_ACTION.PURCHASE) {
          return {
            ...a,
            value: {
              ...a.value,
              offer: a.value.offer === target ? '' : a.value.offer,
            },
          };
        }

        return a;
      }),
    };
  }

  return field;
};
export const updateActionPropForAllLangs = (
  value, languages, fieldIndex, updatedActionIndex, prop = 'value',
) => languages.map(
  (l) => {
    const { fields } = l;

    return {
      ...l,
      fields: fields
        .map((f, index) => {
          const { actions: fieldActions } = f;
          if (index === fieldIndex) {
            return {
              ...f,
              actions: fieldActions.map((act, actIndex) => {
                if (actIndex === updatedActionIndex) {
                  if (act.action === OPEN_ACTION.PURCHASE || act.action === OPEN_ACTION.BUTTON_TRIGGER) {
                    return {
                      ...act,
                      value: {
                        ...act.value,
                        [prop]: value,
                      },
                    };
                  }

                  return {
                    ...act,
                    [prop]: value,
                  };
                }

                return act;
              }),
            };
          }

          return f;
        }),
    };
  },
);

export const rmvActionValueForAllLanguages = (
  languages, activeFieldIndex, actionIndex, removeIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, fIndex) => {
          if (fIndex === activeFieldIndex) {
            return {
              ...f,
              actions: f.actions
                .map((act, actionInd) => {
                  if (actionIndex === actionInd) {
                    return {
                      ...act,
                      value: act.value
                        .filter((val, valInd) => valInd !== removeIndex),
                    };
                  }

                  return act;
                }),
            };
          }

          return f;
        }),
    };
  },
);

export const removeFieldPropInActions = (fields = [], target, value) => fields
  .map((f) => {
    if (f.type !== DEVICE_CONTROL.BUTTON) return f;
    if (f.actions === undefined) return f;

    return ({
      ...f,
      actions: f.actions
        .map((act) => {
          if (act.action === OPEN_ACTION.PURCHASE) {
            if (target === 'page') {
              return {
                ...act,
                value: {
                  ...act.value,
                  errorPage: act.value.errorPage === value ? '' : act.errorPage,
                  successPage: act.value.successPage === value ? '' : act.successPage,
                },
              };
            }
            if (target === 'product') {
              return {
                ...act,
                value: {
                  ...act.value,
                  // if remove purchase product - then remove offer
                  product: act.value.product === value ? '' : act.value.product,
                  offer: act.value.product === value ? '' : act.value.offer,
                },
              };
            }
          }

          return act;
        }),
    });
  });
export const onRmvPropFromAction = (
  languages, target = 'page', value = '',
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: removeFieldPropInActions(fields, target, value),
    };
  },
);

export const rmvOfferValueForAllLanguages = (
  languages, offerKey,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f) => {
          if (OFFER_WIDGETS.includes(f.type)) {
            return {
              ...removeOfferIdFromAction(f, offerKey),
              text: f.text
                .map((textItem) => ({
                  ...textItem,
                  offers: textItem?.offers
                    ?.filter((off) => off !== offerKey),
                })),
            };
          }

          return f;
        }),
    };
  },
);

export const addOfferForAllLanguages = (
  languages, fieldIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            if (f.type === DEVICE_CONTROL.RADIO) {
              return {
                ...f,
                text: [...f.text, {
                  ...DEFAULT_RADIO,
                  text: '',
                  offers: [],
                  id: uuidv4(),
                }],
              };
            }

            return {
              ...f,
              text: [...f.text, {
                text: '',
                offers: [],
                id: uuidv4(),
              }],
            };
          }

          return f;
        }),
    };
  },
);

export const removeOfferForAllLanguages = (
  languages, fieldIndex, editorIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              text: f.text.filter((t, ind) => ind !== editorIndex),
            };
          }

          return f;
        }),
    };
  },
);

export const updOfferForAllLanguages = (
  languages, fieldIndex, textIndex, offers,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              text: f.text.map((t, ind) => {
                if (ind === textIndex) {
                  return {
                    ...t,
                    offers,
                  };
                }

                return t;
              }),
            };
          }

          return f;
        }),
    };
  },
);
export const removeOfferByProduct = (fields = [], prodId = '') => fields
  .map((f) => {
    if (f.type === DEVICE_CONTROL.BUTTON || f.type === DEVICE_CONTROL.TEXT) {
      return ({
        ...f,
        text: f.text.map((t) => ({
          ...t,
          // eslint-disable-next-line
          offers: t.offers ? t.offers.filter((offer) => {
            return !offer.includes(`${prodId}&`);
          }) : [],
        })),
      });
    }

    return f;
  });

export const onRmvProduct = (
  languages, value = '',
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: removeOfferByProduct(removeFieldPropInActions(fields, 'product', value), value),
    };
  },
);
