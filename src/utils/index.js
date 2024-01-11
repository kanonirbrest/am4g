import { ENTER_KEY_CODE } from 'utils/constants';

export const getActiveFilters = (filterValues) => Object.keys(filterValues)
  .map((key) => (filterValues[key] ? key : null))
  .filter(Boolean);

export const a11yProps = (prefix, index) => ({
  id: `${prefix}-tab-${index}`,
  'aria-controls': `${prefix}-tabpanel-${index}`,
});

export const checkKeyEvent = (callback) => (event) => {
  if (event.which === ENTER_KEY_CODE
      || event.keyCode === ENTER_KEY_CODE
      || event.key === 'Enter') {
    return callback(event);
  }

  return () => {};
};

export const preventAction = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

export const copyObject = (obj) => JSON
  .parse(JSON.stringify(obj));

export const formatImageSize = (image) => {
  const size = image?.size;
  if (!size) return '';
  if (size.toString().length < 4) {
    return `${size} bytes`;
  } if (size.toString().length < 7) {
    return `${(size / 1000)
      .toFixed(1)} KB`;
  }

  return `${(size.toString() / 1000000)
    .toFixed(1)} MB`;
};

// check 0
export const formatData = (value, toFixValue = 2) => {
  if (!value) return '-';

  return +value.toFixed(toFixValue)
    .replace(/\.?00+$/, '');
};

export const formatNPS = (value, toFixValue = 2) => {
  if (value === 0) return 0;
  if (!value) return '-';

  return +value.toFixed(toFixValue)
    .replace(/\.?00+$/, '');
};
