import { parseTemplateVariable } from 'components/GL/utils';

const field = {
  page: 1,
  // eslint-disable-next-line max-len
  text: [{
    offers: [],
    text: '<div class="root-editor-block">and '
    + '<span class="template mceNonEditable nonVisible" '
    + 'style="display: inline;" data-field="localizedPrice" '
    + 'data-productid="com.mosaic.platforms.sample.3m" '
    + 'data-oldtemplate="{{com.mosaic.platforms.sample.3m.localizedPrice}}">'
    + '{{com.mosaic.platforms.sample.3m.localizedPrice}}</span> per &nbsp;'
    + '<span class="template mceNonEditable nonVisible" '
    + 'style="display: inline;" data-field="periodCountSubs" '
    + 'data-productid="com.mosaic.platforms.sample.3m" '
    + 'data-oldtemplate="{{com.mosaic.platforms.sample.3m.periodCountSubs}}">'
    + '{{com.mosaic.platforms.sample.3m.periodCountSubs}}</span>days after</div>',
  }],
};

const products = [
  {
    __typename: 'Product',
    title: '3 Months subscription',
    productId: 'com.mosaic.platforms.sample.3m',
    localizedPrice: 'test localizedPrice',
    period: '03m',
    currency: 'usd',
    periodCountSubs: 'test periodCountSubs',
    periodCountTrial: null,
    periodLengthSubs: 'm',
    periodLengthTrial: null,
    price: '8.99',
    type: 'subscription',
    alias: 'com.mosaic.platforms.sample.3m',
  },
];

describe('Statistic render methods', () => {
  it('should add correct attrs for open page button', () => {
    expect(parseTemplateVariable(field.text[0].text, products)).toContain('test periodCountSubs</span>');
    expect(parseTemplateVariable(field.text[0].text, products)).toContain('test localizedPrice</span>');
  });
});
