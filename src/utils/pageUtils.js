import _get from 'lodash.get';
import { copyObject } from 'utils/index';
import { v4 as uuidv4 } from 'uuid';
import { OPEN_ACTION } from './constants/campaign';

let indexMap = {};

export const copyFields = (target, languages, newIndex, layout, pageId) => {
  const result = copyObject(languages);
  const newLayoutItems = [];
  Object.keys(languages)
    .forEach((key) => {
      const languagePageFields = result[key].fields
        .filter((field) => field.page === target.index)
        .map((f) => {
          const uuid = indexMap[f.index] || uuidv4(); // uuid
          if (!indexMap[f.index]) {
            indexMap[f.index] = uuid;
          }

          const layoutItem = layout.find((l) => l.i === `${f.index}-${f.type}`);
          const xOffset = layoutItem.x % 16;

          newLayoutItems.push({
            ...layoutItem,
            i: `${uuid}-${f.type}`,
            x: (16 * (newIndex - 1)) + xOffset,
          });

          return ({
            ...f, page: newIndex, index: uuid, pageId,
          });
        });
      result[key].fields = [...result[key].fields, ...languagePageFields];
    });
  indexMap = {};

  return { languages: result, layout: [...layout, ...newLayoutItems] };
};

export const onCopyPage = (formik, page) => {
  const languages = _get(formik.values, 'step2.languages');
  const pages = _get(formik.values, 'step2.pages');
  const layout = _get(formik.values, 'step2.layout');
  const newIndex = pages.length + 1;
  const newPageUuid = uuidv4();
  const newPage = {
    index: newIndex,
    name: `copy from ${page.name}`,
    uuid: newPageUuid,
  };
  formik.setFieldValue('step2.pages', [...pages, newPage]);
  const { languages: newLangs, layout: newLayout } = copyFields(
    page, languages, newIndex, layout, newPageUuid,
  );
  formik.setFieldValue('step2.languages', newLangs);
  formik.setFieldValue('step2.layout', newLayout);

  return newIndex;
};

export const findMaxPage = (pages) => {
  let max = 1;
  pages.forEach((v) => {
    const re = /^Page \d{1,2}$/;
    if (re.test(v.name)) {
      max = Number(v.name.split(' ')[1]) + 1;
    }
  });

  return max;
};
/* TODO: add useMemo to options */
export const getPageOptions = (pages, subField, currentPageIndex) => {
  if (subField === OPEN_ACTION.SUB_PURCHASE || OPEN_ACTION.SUB_PURCHASE_TRIGGER) { // to be able to select page
    return [{
      label: 'Campaign will be closed', value: '',
    }, ...pages.filter((p, ind) => ind + 1 !== currentPageIndex)
      .map((p) => ({
        label: p.name,
        value: p.uuid,
      }))];
  }

  // open page
  return pages.filter((p, ind) => ind + 1 !== currentPageIndex).map((p) => ({
    label: p.name,
    value: p.uuid,
  }));
};
export const getPageUuidByIndex = (pages, page) => (pages
  .find((p) => p.index === page)?.uuid);
