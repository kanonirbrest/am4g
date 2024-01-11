import { getLangScreen } from './lang';
import { campaignType } from '../components/constants';

const html = '<div class="makeStyles-none-241"></div>'
  + '<div class="react-grid-layout makeStyles-layout-247" '
  + '><div class="react-grid-item react-draggable cssTransforms react-resizable-hide react-resizable" '
  + '><div class="makeStyles-innerTextClass-264" data-key="ab60d5f0-e0eb-461d-9500-0e415b1ec4a4-text" '
  + 'id="ab60d5f0-e0eb-461d-9500-0e415b1ec4a4-text">'
  + '<div class="root-editor-block">temp var: <span class="template mceNonEditable" '
  + 'style="display: inline;" data-field="currency" '
  + 'data-productid="com.mosaic.platforms.sample.3m_1mi" data-oldtemplate="usd">usd</span> - '
  + '<span class="template mceNonEditable" style="display: inline;" '
  + 'data-field="price" data-productid="com.mosaic.platforms.sample.3m_1mi" '
  + 'data-oldtemplate="3.49">3.49</span></div></div></div></div>';

const english = {
  name: 'English',
  locale: 'en',
  fields: [
    {
      index: 'ab60d5f0-e0eb-461d-9500-0e415b1ec4a4',
      type: 'text',
      page: 1,
      pageId: '3c6e59fe-3f49-498b-a71c-835ec60fb99c',
      text: '<div class="root-editor-block">temp var: <span class="template mceNonEditable" style="display: inline;" data-field="currency" data-productid="com.mosaic.platforms.sample.3m_1mi" data-oldtemplate="{{alias.currency}}">{{alias.currency}}</span> - <span class="template mceNonEditable" style="display: inline;" data-field="price" data-productid="com.mosaic.platforms.sample.3m_1mi" data-oldtemplate="{{alias.price}}">{{alias.price}}</span></div>',
    },
  ],
};
const products = [{
  __typename: 'Product',
  title: '3 Months + Month intro',
  productId: 'com.mosaic.platforms.sample.3m_1mi',
  localizedPrice: '$3.49',
  period: '03m',
  currency: 'usd',
  periodCountSubs: '3',
  periodCountTrial: null,
  periodLengthSubs: 'm',
  periodLengthTrial: null,
  price: '3.49',
  type: 'subscription',
  alias: 'alias',
}];
describe('HTML Utils', () => {
  it('should change product values to template variables', () => {
    const updated_html = getLangScreen(html, campaignType.inAppHTML, english, products);
    expect(
      updated_html,
    )
      .toContain('data-oldtemplate="{{alias.currency}}">{{alias.currency}}');
    expect(
      updated_html,
    )
      .toContain('data-oldtemplate="{{alias.price}}">{{alias.price}}');
  });
});
