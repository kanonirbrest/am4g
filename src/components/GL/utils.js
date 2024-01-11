import { OPEN_ACTION } from 'utils/constants/campaign';
import {
  onClickAnalytics, onClickClose, onClickNext, onClickPurchase, onClickPurchaseTrigger,
} from 'utils/constants/html';
import { BUTTON_TYPE, DEVICE_CONTROL } from 'utils/constants';
import { style } from './style';

const ACTION_SEPARATOR = '#';
const getAnalyticEventsMap = (action) => {
  if (!action?.value || action?.value?.length === 0) return {};

  const map = {};
  action.value.forEach((a) => {
    map[a.name] = a.value;
  });

  return map;
};
export const hasCloseAction = (f) => {
  if (f.actions) {
    return f.actions
      .findIndex((act) => act.action === OPEN_ACTION.CLOSE_SCREEN) >= 0;
  }

  return false;
};
export const getActionIndexByType = (f, type) => {
  if (f.actions) {
    return f.actions
      .findIndex((act) => type === act.action);
  }

  return -1;
};
export const hasSubmitAction = (f) => getActionIndexByType(f, OPEN_ACTION.SUBMIT) >= 0;
export const getButtonType = (f) => (getActionIndexByType(f, OPEN_ACTION.SUBMIT) >= 0
  ? BUTTON_TYPE.SUBMIT : BUTTON_TYPE.BUTTON);
export const getOpenPageAction = (f) => {
  if (f.actions) {
    const index = getActionIndexByType(f, OPEN_ACTION.OPEN_PAGE);
    if (index >= 0) {
      return f.actions[index];
    }
  }

  return null;
};
export const getAnalyticActionParams = (f = { actions: [] }) => {
  if (!f.actions) {
    return {};
  }
  const analyticActions = f.actions.filter(
    (act) => act.action === OPEN_ACTION.SEND_ANALYTICS,
  );

  if (analyticActions.length <= 0) {
    return {};
  }

  const actionMap = {};
  analyticActions.forEach((action) => {
    actionMap[action.name] = getAnalyticEventsMap(action);
  });

  return { 'data-analytic': JSON.stringify(actionMap) };
};

// Close and submit should be last
const sortActions = (actions) => actions.sort((a, b) => {
  if (b.action === OPEN_ACTION.CLOSE_SCREEN) {
    return -1;
  }

  if (b.action === OPEN_ACTION.SUBMIT) {
    return -1;
  }

  return a;
});

// if it is submit button, we handle it using onsubmit callback
// instead of onclick
export const getOnClickString = (f, pages, key) => {
  if (!f.actions || hasSubmitAction(f)) return '';
  const actions = [...f.actions];
  sortActions(actions);

  let onClickString = '';

  f.actions.forEach((action) => {
    if (action.action) {
      if (OPEN_ACTION.SEND_ANALYTICS === action.action) {
        // add event later
        const paramsObject = getAnalyticEventsMap(action);
        onClickString += onClickAnalytics(action.name, paramsObject);
      } else if (OPEN_ACTION.SUBMIT === action.action) {
        // add event later
      } else if (action.action === OPEN_ACTION.OPEN_PAGE) {
        onClickString += onClickNext;
      } else if (action.action === OPEN_ACTION.PURCHASE) {
        onClickString += onClickPurchase(
          action.value.product,
          action.value.offer,
          {
            successPage: action.value.successPage,
            errorPage: action.value.errorPage,
          },
          f.pageId,
        );
      } else if (action.action === OPEN_ACTION.BUTTON_TRIGGER) {
        onClickString += onClickPurchaseTrigger(
          {
            successPage: action?.value?.successPage,
            errorPage: action?.value?.errorPage,
          },
          f.pageId,
        );
      } else if (action.action === OPEN_ACTION.CLOSE_SCREEN) {
        // set data-close - true only if it's form submitter,
        // in other case just use onClick
        onClickString += onClickClose;
      } else {
        const currentPageUuid = pages.find((p) => p.index === f.page).uuid;
        const elementId = key + ACTION_SEPARATOR + currentPageUuid;
        onClickString += `amBridge.action('${elementId}');`;
      }
    }
  });

  return onClickString;
};
const TEMPLATE_VARS_REGEXP = /{{(.*?)}}/g;
/*
* update variables in preview
* (set product value instead of template variable)
* */
export const parseTemplateVariable = (text, allProducts) => {
  // todo: arr
  let updatedText = text;
  const templateVars = text.match(TEMPLATE_VARS_REGEXP);

  if (templateVars) {
    Array.from(templateVars || [])
      .forEach((templateVar) => {
        const splittedVar = templateVar.slice(2, -2).split('.');
        const propName = splittedVar.pop();
        let offerIndex;
        let productAlias = splittedVar.join('.');
        let currentProduct = allProducts
          .find((p) => (p.alias === productAlias));

        // it means that structure not productAlias.property(month.price),
        // but productAlias.offerIdentifier.property (month.offer1.price)
        // and we should parse it another way
        if (!currentProduct) {
          const offerIdent = splittedVar.pop();
          productAlias = splittedVar.join('.');
          currentProduct = allProducts
            .find((p) => (p.alias === productAlias));
          offerIndex = currentProduct?.offers.findIndex((o) => o.identifier === offerIdent);
        }

        if (currentProduct) {
          if (offerIndex >= 0) {
            updatedText = updatedText.replace(templateVar, currentProduct.offers[offerIndex][propName]);
          } else {
            updatedText = updatedText.replace(templateVar, currentProduct[propName]);
          }
        }
      });
  }

  return updatedText;
};

export const getStyleByType = (type, f, slider) => {
  switch (type) {
    case DEVICE_CONTROL.RADIO: {
      return {
        overflow: 'hidden',
      };
    }
    case DEVICE_CONTROL.NPS_BUTTON: {
      return style.item;
    }
    case DEVICE_CONTROL.TITLE: {
      return {
        ...style.item,
        fontWeight: f.fontWeight,
        fontSize: `${f.fontSize}px`,
        color: f.color,
        textAlign: f.alignment,
        fontFamily: `${f.fontFamily}`,
        whiteSpace: 'pre',
      };
    }
    case DEVICE_CONTROL.TEXT: {
      return {
        ...style.item,
        fontWeight: f.fontWeight,
        fontSize: `${f.fontSize}px`,
        fontFamily: `${f.fontFamily}`,
        color: f.color,
        textAlign: f.alignment,
        whiteSpace: 'pre',
      };
    }
    case DEVICE_CONTROL.IMAGE: {
      return style.item;
    }
    case DEVICE_CONTROL.BUTTON: {
      return style.item;
    }
    case DEVICE_CONTROL.NPS_SLIDER: {
      return style.item;
    }
    case DEVICE_CONTROL.FEEDBACK: {
      return {
        ...style.item,
        fontWeight: f.fontWeight,
        fontSize: `${f.fontSize}px`,
        color: f.color,
        textAlign: f.alignment,
      };
    }
    case DEVICE_CONTROL.NPS_DESCRIPTION: {
      return {
        ...style.item,
        fontWeight: f.fontWeight,
        fontSize: `${f.fontSize}px`,
        color: f.color,
        textAlign: f.alignment,
        visibility: slider.hideScore ? 'hidden' : 'visible',
      };
    }
    case DEVICE_CONTROL.NPS_SCORE: {
      return {
        ...style.item,
        fontWeight: f.fontWeight,
        fontSize: `${f.fontSize}px`,
        color: f.color,
        textAlign: f.alignment,
        visibility: slider.hideScore ? 'hidden' : 'visible',
      };
    }
    default: {
      return {};
    }
  }
};
export const getDefaultSliderIndex = (fields, currentField) => {
  const slider = fields
    .find((item) => item.index === currentField.index
      && item.type === DEVICE_CONTROL.NPS_SLIDER);

  return { slider, defaultSliderIndex: slider.mapper.findIndex((item) => item.default) };
};
