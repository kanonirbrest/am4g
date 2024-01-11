import { HTMLPostfix } from 'routes/Application/Reports/Statistic/InApp/Html';

// eslint-disable-next-line import/prefer-default-export
export const getLabel = (name, mapper) => {
  // to handle html name mapper
  if (mapper && mapper.type === 'HTML') {
    if (name === 'page_shown') {
      return 'Page shown';
    }
    if (name === 'impression') {
      return 'Impression';
    }
    if (name.includes(HTMLPostfix)) {
      // we should map names for html image and buttons
      const n = name.split(HTMLPostfix)[0];

      return `Conv ${mapper[n]}`;
    }

    return `${mapper[name]} Clicks`;
  }

  if (mapper) {
    return mapper[name] || name;
  }

  return name;
};
