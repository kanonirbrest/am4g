import { copyObject } from 'utils/index';
import { DEFAULT_PUSH_LANGUAGE_CONTENT } from 'utils/constants';
import { removeFieldPropInActions } from './languageUtils';

export const createVariant = (languages) => {
  const result = copyObject(languages);
  Object.keys(languages)
    .forEach((key) => {
      const newVariant = {
        ...DEFAULT_PUSH_LANGUAGE_CONTENT(),
        name: 'Variant 2',
      };
      result[key] = [{ ...result[key][0], name: 'Variant 1' },
        newVariant];
    });

  return result;
};

const findMaxVariant = (variants) => {
  let max = 1;
  variants.forEach((v) => {
    const re = /^Variant \d$/;
    if (re.test(v.name)) {
      max = Number(v.name.split(' ')[1]) + 1;
    }
  });

  return max;
};

export const addVariant = (languages) => {
  const result = copyObject(languages);
  Object.keys(languages)
    .forEach((key) => {
      const newVariant = {
        ...DEFAULT_PUSH_LANGUAGE_CONTENT(),
        name: `Variant ${findMaxVariant(languages[key])}`,
      };
      result[key] = [...result[key], newVariant];
    });

  return result;
};

export const copyFromVariant = (variantName, languages) => {
  const result = copyObject(languages);

  Object.keys(languages)
    .forEach((key) => {
      const variantValue = languages[key].find((v) => v.name === variantName);

      const newVariant = {
        ...variantValue,
        name: `Variant ${findMaxVariant(languages[key])}`,
      };

      result[key] = [...result[key], newVariant];
    });

  return result;
};

export const removePage = (target, languages, layout) => {
  const result = copyObject(languages);
  const copiedLayout = copyObject(layout);
  const offsetIndexes = [];
  Object.keys(languages)
    .forEach((key) => {
      const fields = result[key].fields
        .filter((field) => field.page !== target.index)
        .map((field) => {
          if (field.page > target.index) {
            offsetIndexes.push(`${field.index}-${field.type}`);

            return { ...field, page: field.page - 1 };
          }

          return field;
        });

      result[key].fields = removeFieldPropInActions(fields, 'page', target.uuid);
    });
  const layoutResult = copiedLayout.map((l) => {
    if (offsetIndexes.includes(l.i)) {
      return { ...l, x: l.x - 16 };
    }

    return { ...l };
  });

  return { updatedLanguages: result, updateLayout: layoutResult };
};
export const removeVariant = (target, languages) => {
  const result = copyObject(languages);

  Object.keys(languages)
    .forEach((key) => {
      result[key] = result[key].filter((variant, index) => index !== target);
    });

  return result;
};
export const isVariantNameValid = (str) => /^[\w-_.\s]+$/.test(str);
export const renameVariant = (index, name, languages, locale) => {
  const result = copyObject(languages);
  if (languages[locale]
    .filter((l, i) => i !== index)
    .map((v) => v.name).includes(name) || !name) {
    return { error: 'Same/empty names is not allowed' };
  } if (!isVariantNameValid(name)) {
    return { error: 'For variant name please use a-z A-Z 0-9 . - _' };
  }

  Object.keys(languages)
    .forEach((key) => {
      result[key][index].name = name;
    });

  return { result };
};
