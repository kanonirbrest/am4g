import { DEVICE_CONTROL } from 'utils/constants';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RadioPreview from '../components/RadioPreview';

// change default link behaviour with bridge method
export const changeLinkHrefToClick = (doc) => {
  const links = [...doc.getElementsByTagName('a')];
  links.forEach((link) => {
    link.setAttribute('onclick',
      'amBridge.openExternalUrl(this.href); return false;');
  });
};

export const getLangScreen = (
  clearHtmlView,
  campType,
  language,
  allProducts,
) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(clearHtmlView, 'text/html');
  language.fields.forEach(({
    index, type, text, mapper, ...props
  }) => {
    const key = `${index}-${type}`;
    const element = doc.getElementById(key);

    if (element) {
      if (type === DEVICE_CONTROL.RADIO) {
        const css = `
          .checked {
              background-color: ${props.selected.backgroundColor} !important;
              border: ${props.selected.borderThickness}px solid ${props.selected.borderColor}!important;
          }
          input[type="radio"] {
              accentColor: ${props.selected.iconColor}!important;
              border: 1px solid ${props.selected.iconColor}!important;
              -webkit-appearance: none;
          }
          .checked input {
              accentColor: ${props.selected.iconColor}!important;
              border: 1px solid ${props.selected.iconColor}!important;
              -webkit-appearance: auto !important;
        }`;
        const style = document.createElement('style');
        style.innerHTML = css;
        doc.body.appendChild(style);
        let html = '';
        props.buttonList.forEach((button, buttonIndex) => {
          html += `<span class="multiple">${button.text
            .reduce((acc, t, currentIndex) => {
              if (currentIndex !== 0) {
                // to wrap all offer variant elements, and then handle logic whether show it or not on mobile
                return `${acc}<span data-offers='${
                  JSON.stringify(t.offers) || []}' style="display: none" >${
                  ReactDOMServer.renderToString(<RadioPreview
                    values={props}
                    buttonIndex={buttonIndex}
                    title={t.title}
                    subTitle={t.subTitle}
                    details={t.details}
                    subDetails={t.subDetails}
                    isSelected={button.isSelected}
                    itemValues={props}
                    productId={button.actionValue.product}
                    offerIds={t.offers}
                    offerid={button.actionValue.offer}
                  />)}
                </span>`.replaceAll('data-onclick', 'onclick');
              }

              return acc + ReactDOMServer.renderToString(<RadioPreview
                values={props}
                buttonIndex={buttonIndex}
                title={t.title}
                subTitle={t.subTitle}
                details={t.details}
                subDetails={t.subDetails}
                isSelected={button.isSelected}
                itemValues={props}
                productId={button.actionValue.product}
                offerid={button.actionValue.offer}
                offerIds={t.offers}
              />).replaceAll('data-onclick', 'onclick');
            }, '')}</span>`;
        });

        element.innerHTML = html;
      } else if (type === DEVICE_CONTROL.NPS_SLIDER) {
        const elements = doc.querySelectorAll(`[data-key='${key}']`);
        elements.forEach((el) => {
          el.setAttribute('data-mapper', JSON.stringify(mapper));
          el.setAttribute('max', JSON.stringify(mapper.length - 1));
        });
      } else if (type === DEVICE_CONTROL.NPS_DESCRIPTION) {
        const npsMapper = language.fields.find((f) => f
          .type === DEVICE_CONTROL.NPS_SLIDER).mapper;
        const defValue = npsMapper.findIndex((item) => item.default);
        element.innerText = npsMapper[defValue].description;
      } else if (type === DEVICE_CONTROL.NPS_SCORE) {
        const npsMapper = language.fields.find((f) => f
          .type === DEVICE_CONTROL.NPS_SLIDER).mapper;
        const defValue = npsMapper.findIndex((item) => item.default);
        const { score } = npsMapper[defValue];

        element.innerText = score;
      } else if (type === DEVICE_CONTROL.IMAGE) {
        element.src = props.backgroundValue;
      } else if (element && (type !== DEVICE_CONTROL.FEEDBACK)) {
        if (Array.isArray(text)) {
          element.innerHTML = text.reduce((acc, t, currentIndex) => {
            if (currentIndex !== 0) {
              // to wrap all offer variant elements, and then handle logic whether show it or not on mobile
              return `${acc}<span data-offers='${
                JSON.stringify(t.offers) || []}' style="display: none" >${t.text} </span>`;
            }

            return acc + t.text;
          }, '');
        } else {
          element.innerHTML = text;
        }
      }
    }
  });

  doc.querySelectorAll('.template')
    .forEach((node) => {
      const oldtemplate = node.getAttribute('data-oldtemplate');
      const id = node.getAttribute('data-productId');
      const field = node.getAttribute('data-field');
      const offerIdent = node.getAttribute('data-offeridentifier');
      const product = allProducts
        .find((p) => p.productId === id);

      if (product) {
        if (offerIdent) {
          const offerIndex = product.offers.findIndex((o) => o.identifier === offerIdent);
          // eslint-disable-next-line
          node.innerHTML = node.innerHTML
            .replaceAll(`${product.offers[offerIndex][field]}<`, `${oldtemplate}<`);
        } else {
          // eslint-disable-next-line
          node.innerHTML = node.innerHTML
            .replaceAll(`${product[field]}<`, `${oldtemplate}<`);
        }
      }
    });
  changeLinkHrefToClick(doc);

  return doc.documentElement.outerHTML;
};
