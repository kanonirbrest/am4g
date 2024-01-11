import { htmlToElement } from 'utils/htmlUtils';
import { DEVICE_CONTROL } from 'utils/constants';

// eslint-disable-next-line import/prefer-default-export
export const updateFieldsText = (
  newAlias, activeIndex, prodId, oldAlias, fields,
) => fields
  .map((f) => {
    if ([
      DEVICE_CONTROL.BUTTON, DEVICE_CONTROL.TEXT, DEVICE_CONTROL.TITLE,
    ].includes(f.type)) {
      return {
        ...f,
        text: f.text.map((t) => {
          // this alias has been already used but product removed
          if (t.text.includes(`{{${newAlias}.`)) {
            const element = htmlToElement(t.text);

            // update product id
            [...element.querySelectorAll('span[data-productid]')]
              .forEach((span) => {
                if (span.textContent.includes(`{{${newAlias}.`)) {
                  span.setAttribute('data-productid', prodId);
                }
              });

            return {
              ...t,
              text: element.innerHTML,
            };
          }

          return {
            ...t,
            text: t.text.replaceAll(`{{${oldAlias}`, `{{${newAlias}`),
          };
        }),
      };
    }

    return f;
  });
