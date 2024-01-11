import { DEVICE_CONTROL, PLATFORM } from 'utils/constants/index';
import { OPEN_ACTION } from 'utils/constants/campaign';
import { FORM_SUBMITTED_EVENT, NPS_RECORDED } from 'utils/constants/actions';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_RADIO_OFFER_ITEM } from '../RadioWidget/constant';

const DEFAULT_SLIDER_MAPPER = [
  {
    score: 0, description: 'Awful', default: false,
  },
  {
    score: 1, description: 'Disappointed', default: false,
  },
  {
    score: 2, description: 'Neutral', default: true,
  },
  {
    score: 3, description: 'Good', default: false,
  },
  {
    score: 4, description: 'Awesome', default: false,
  },
];

export const WIDGET_BUTTONS = [
  { label: '+ Text', value: 'text' },
  { label: '+ Button', value: 'button' },
  { label: '+ Image', value: 'image' },
  { label: '+ NPS', value: 'nps' },
  { label: '+ Feedback', value: 'feedback' },
  { label: '+ Radio Card Group', value: 'radio' },
];

export const getDefaultWidgetValues = (type, platformValue) => {
  const defaultFont = platformValue === PLATFORM.ANDROID ? 'Roboto' : 'Arial';
  switch (type) {
    case DEVICE_CONTROL.TITLE:

      return {
        fontSize: '20',
        fontWeight: 'bold',
        color: 'rgba(0,0,0,1)',
        alignment: 'center',
        fontFamily: defaultFont,
        text: 'title',
        darkBackground: false,
      };
    case DEVICE_CONTROL.TEXT:

      return {
        fontSize: '20',
        fontWeight: 'normal',
        color: 'rgba(0,0,0,1)',
        alignment: 'start',
        fontFamily: defaultFont,
        text: [{
          text: 'Text',
          offers: [],
          id: uuidv4(),
        }],
        darkBackground: false,
      };
    case DEVICE_CONTROL.BUTTON:

      return {
        fontSize: '14',
        fontWeight: 'bold',
        fontFamily: defaultFont,
        color: 'rgba(255,255,255,1)',
        alignment: 'center',
        text: [{
          text: 'Submit',
          offers: [],
          id: uuidv4(),
        }],
        cutRound: '16',
        backgroundColor: 'rgba(70,117,192,1)',
        showShadow: true,
        actions: [],
        darkBackground: true,
      };
    case DEVICE_CONTROL.IMAGE:

      return {
        imageFit: 'fitIn',
        cutRound: '0',
        actions: [],
      };

    case DEVICE_CONTROL.NPS_BUTTON:

      return {
        fontSize: '18',
        fontWeight: 'bold',
        fontFamily: defaultFont,
        color: 'rgba(255,255,255,1)',
        text: 'Submit',
        cutRound: '4',
        backgroundColor: 'rgba(0,0,0,1)',
        showShadow: true,
        alignment: 'center',
        actions: [NPS_RECORDED, FORM_SUBMITTED_EVENT, {
          action: OPEN_ACTION.SUBMIT,
        }],
      };

    case DEVICE_CONTROL.NPS_SLIDER:
      return {
        thumbColor: 'rgba(255,255,255,1)',
        lineColor: 'rgba(0,0,0,1)',
        thumbBorder: 'black',
        thumbBorderSize: '1',
        scoreIndexPosition: -3,
        indexSize: '18',
        scoreIndexColor: 'black',
        thumbSize: '24',
        lineSize: '2',
        mapper: DEFAULT_SLIDER_MAPPER,
        showIndex: false,
        hideScore: false,
      };

    case DEVICE_CONTROL.NPS_DESCRIPTION:
      return {
        fontSize: '16',
        fontWeight: 'bold',
        fontFamily: defaultFont,
        color: 'black',
        alignment: 'center',
      };

    case DEVICE_CONTROL.NPS_SCORE:
      return {
        fontSize: '48',
        fontWeight: 'bold',
        fontFamily: defaultFont,
        color: 'black',
        alignment: 'center',
      };

    case DEVICE_CONTROL.FEEDBACK:
      return {
        fontSize: '20',
        fontWeight: 'normal',
        fontFamily: defaultFont,
        color: 'grey',
        backgroundColor: 'white',
        alignment: 'start',
        required: true,
        borderSize: '1',
        borderColor: 'black',
        opacity: true,
        cutRound: '16',
        placeholderPaddingHorizontal: 0,
        placeholderPaddingVertical: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
      };

    case DEVICE_CONTROL.RADIO:

      return {
        showShadow: true,
        showIcon: true,
        cardsSpacing: 8,
        height: 75,
        width: 275,
        cornerRadius: 15,
        iconSize: 24,
        fontFamily: defaultFont,
        radioHeight: 'fixed',
        iconType: 'default',
        template: 'default',
        iconColor: '#D1D4D8',
        borderColor: '#D1D4D8',
        borderThickness: 1,
        backgroundColor: '#FFFFFF',
        selected: {
          iconColor: '#667080',
          borderColor: '#667080',
          borderThickness: 2,
          backgroundColor: '#FFFFFF',
          showShadow: true,
        },
        actions: [{
          action: OPEN_ACTION.PURCHASE_TRIGGER,
        }],
        buttonList: [{
          text: [
            {
              ...DEFAULT_RADIO_OFFER_ITEM,
              id: uuidv4(),
            },
          ],
          isSelected: true,
          id: uuidv4(),
          actionValue: {
            product: '',
          }, /* purchase value for each button */
          darkBackground: false,
        }],
      };
    default:
      return null;
  }
};
