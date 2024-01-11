import { COLUMNS_PER_PAGE, DEVICE_CONTROL } from './index';

// eslint-disable-next-line import/prefer-default-export
export const getDefaultLayoutItem = (item, index, page) => {
  switch (item.type) {
    case 'ASTitle':

      return {
        x: COLUMNS_PER_PAGE * page,
        w: 16,
        h: 5,
        i: `${index}-${item.type}`,
      };

    case 'action':

      return {
        x: COLUMNS_PER_PAGE * page,
        y: null,
        w: 16,
        h: 5,
        i: `${index}-${item.type}`,
      };

    case 'cancel':

      return {
        x: COLUMNS_PER_PAGE * page,
        y: 0,
        w: 16,
        h: 5,
        i: `${index}-${item.type}`,
      };

    case DEVICE_CONTROL.TITLE:

      return {
        x: COLUMNS_PER_PAGE * page,
        y: 3,
        w: 16,
        h: 3,
        i: `${index}-${item.type}`,
      };

    case DEVICE_CONTROL.TEXT:

      return {
        x: COLUMNS_PER_PAGE * page,
        y: 3,
        w: 16,
        h: 3,
        i: `${index}-${item.type}`,
      };

    case DEVICE_CONTROL.BUTTON:

      return {
        x: COLUMNS_PER_PAGE * page,
        y: 3,
        w: 16,
        h: 3,
        i: `${index}-${item.type}`,
      };
    case DEVICE_CONTROL.NPS_SCORE:

      return {
        x: 1 + (COLUMNS_PER_PAGE * page),
        y: 3,
        w: 14,
        h: 3,
        i: `${index}-${item.type}`,
      };
    case DEVICE_CONTROL.NPS_DESCRIPTION:

      return {
        x: 1 + (COLUMNS_PER_PAGE * page),
        y: 3,
        w: 14,
        h: 3,
        i: `${index}-${item.type}`,
      };
    case DEVICE_CONTROL.FEEDBACK:

      return {
        x: COLUMNS_PER_PAGE * page,
        y: 3,
        w: 16,
        h: 6,
        i: `${index}-${item.type}`,
      };
    case DEVICE_CONTROL.NPS_SLIDER:

      return {
        x: 1 + (COLUMNS_PER_PAGE * page),
        y: 3,
        w: 14,
        h: 5,
        i: `${index}-${item.type}`,
      };

    case DEVICE_CONTROL.NPS_BUTTON:

      return {
        x: 2 + (COLUMNS_PER_PAGE * page),
        y: 3,
        w: 12,
        h: 3,
        i: `${index}-${item.type}`,
      };

    case DEVICE_CONTROL.IMAGE:

      return {
        x: COLUMNS_PER_PAGE * page,
        y: 3,
        w: 16,
        h: 9,
        i: `${index}-${item.type}`,
      };
    case DEVICE_CONTROL.RADIO:

      return {
        x: COLUMNS_PER_PAGE * page,
        y: 3,
        w: 16,
        h: 15,
        i: `${index}-${item.type}`,
      };
    default:
      return {};
  }
};
