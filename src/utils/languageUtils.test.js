import {
  onAddActionToAllLanguages,
  onRmvActionForAllLanguages,
  removeFieldPropInActions,
  updateActionPropForAllLangs,
} from './languageUtils';
import { ButtonActionOptions, OPEN_ACTION } from './constants/campaign';

const fields = [
  {
    type: 'button',
    actions: [
      {
        value: {
          product: 'test_prod_id',
          errorPage: 'test_page',
        },
        action: OPEN_ACTION.PURCHASE,
      },
    ],
  }, {
    type: 'button',
    actions: [
      {
        value: {
          product: 'test_prod_id',
          successPage: 'test_page',
        },
        action: OPEN_ACTION.PURCHASE,
      },
    ],
  },
];
const languages = [{
  name: 'English',
  locale: 'en',
  fields: [
    {
      type: 'text',
    },
    {
      type: 'button',
      actions: [
        { action: OPEN_ACTION.SUBMIT, value: '' },
        { action: OPEN_ACTION.CLOSE_SCREEN, value: '' },
      ],
    },
  ],
},
{
  name: 'French',
  locale: 'fr',
  fields: [
    {
      type: 'text',
    },
    {
      type: 'button',
      actions: [
        { action: OPEN_ACTION.SUBMIT, value: '' },
        { action: OPEN_ACTION.CLOSE_SCREEN, value: '' },
      ],
    },
  ],
}];
describe('Language Utils', () => {
  it('should remove product from button actions if product was removed', () => {
    const updatedFields = removeFieldPropInActions(fields, 'product',
      'test_prod_id');
    expect(updatedFields[0].actions[0].value.product)
      .toBe('');
    expect(updatedFields[1].actions[0].value.product)
      .toBe('');
  });
  it('should remove page from button actions if page was removed', () => {
    const updatedFields = removeFieldPropInActions(fields, 'page',
      'test_page');
    expect(updatedFields[0].actions[0].value.errorPage)
      .toBe('');
    expect(updatedFields[1].actions[0].value.successPage)
      .toBe('');
  });
  it('should add action in all languages', () => {
    const updatedLangs = onAddActionToAllLanguages(OPEN_ACTION.PURCHASE, languages, 1, ButtonActionOptions);
    expect(updatedLangs[0].fields[1].actions[2].action)
      .toBe(OPEN_ACTION.PURCHASE);
    expect(updatedLangs[1].fields[1].actions[2].action)
      .toBe(OPEN_ACTION.PURCHASE);
    expect(updatedLangs[0].fields[1].actions.length)
      .toBe(3);
    expect(updatedLangs[1].fields[1].actions.length)
      .toBe(3);
  });
  it('should add remove action in all languages', () => {
    const updatedLangs = onRmvActionForAllLanguages(languages, 1, 1);
    expect(updatedLangs[0].fields[1].actions.length)
      .toBe(1);
    expect(updatedLangs[1].fields[1].actions.length)
      .toBe(1);
  });
  it('should update action value for all languages', () => {
    const updatedLangs = updateActionPropForAllLangs('updated value', languages, 1, 1);

    expect(updatedLangs[0].fields[1].actions[1].value)
      .toBe('updated value');
    expect(updatedLangs[1].fields[1].actions[1].value)
      .toBe('updated value');
  });
});
