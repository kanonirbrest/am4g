import { updateFieldsText } from './utils';

const fields = [{
  index: 'c3a446c7-f4fe-4a3f-8064-bd37c905365f',
  type: 'text',
  page: 1,
  pageId: '49ae5675-870e-4c5a-a297-998f8e28088b',
  fontSize: '20',
  fontWeight: 'normal',
  color: 'rgba(0,0,0,1)',
  alignment: 'start',
  fontFamily: 'Roboto',
  text: [{
    text: '<div class="root-editor-block">text: '
    + '<span class="template mceNonEditable" style="display: inline;'
    + '" data-field="currency" data-productid="com.mosaic.platforms.inapp_7.99_consumable" '
    + 'data-oldtemplate="{{old_alias.currency}}">{{old_alias.currency}}</span></div>',
  }],
  darkBackground: false,
}];

describe('Change product utils', () => {
  it('should update widgets when change alias ', () => {
    const updatedFields = updateFieldsText(
      'new_alias', 0,
      'com.mosaic.platforms.inapp_7.99_consumable', 'old_alias', fields,
    );

    expect(updatedFields[0].text[0].text)
      .toContain('{{new_alias.currency}}</span>');
    expect(updatedFields[0].text[0].text)
      .toContain('data-oldtemplate="{{new_alias.currency}}"');
  });
  it('should update product id if alias was used before', () => {
    const updatedFields = updateFieldsText(
      'old_alias', 0,
      'new_prod_id', 'old_alias', fields,
    );
    expect(updatedFields[0].text[0].text)
      .toContain('data-productid="new_prod_id"');
  });
});
