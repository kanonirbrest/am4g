import isEmpty from 'lodash.isempty';
import { OPEN_ACTION } from './constants/campaign';

export const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

export const arrayMove = (arr, fromIndex, toIndex) => {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);

  return arr;
};

export const getMaxIndex = (arr) => {
  let max = 0;
  arr.forEach((item) => {
    if (item.index > max) {
      max = item.index;
    }
  });

  return max;
};

export const removeEmpty = (obj) => {
  const clean = Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (k === 'value' && obj?.action === OPEN_ACTION.SEND_ANALYTICS) {
        return [k, v];
      }
      // region can contain '' value inside array
      if (k === 'region') return [k, v]; /* to handle '' values no regions */

      return [k, v === Object(v)
        ? removeEmpty(v) : v];
    })
      .filter(
        ([k, v]) => (((
          v !== null
            && v !== ''
            && !isEmpty(v)
        ) || typeof v === 'boolean' || typeof v === 'number') && (v !== Object(v)
            || Object.keys(v).length))
            || (k === 'value' && obj?.action === OPEN_ACTION.SEND_ANALYTICS)
            || (k === 'tags'),
      ),
  );

  return Array.isArray(obj) ? Object.values(clean) : clean;
};
export const getIntersections = (
  arr1 = [], arr2 = [],
) => arr1
  .map((item) => (arr2.includes(item) ? item : null))
  .filter(Boolean);

export const hasIntersections = (
  arr1 = [], arr2 = [],
) => getIntersections(arr1, arr2).length > 0;

export const moveArray = (target, arr = []) => {
  const result = [];

  arr.forEach((el, index) => {
    if (index < target) {
      result.push(el);
    } else if (index > target) {
      result[index - 1] = el;
    }
  });

  return result;
};

export const getInstanceById = (arr, id) => arr.find((el) => el.id === id);

export const isArraysEqual = (a = [], b = []) => {
  if (a?.length && b?.length) {
    return [...a].sort().join(',') === [...b].sort().join(',');
  }

  return false;
};

export const isArraysContain = (a = [], b = []) => {
  if (a?.length && b?.length) {
    return a.every((v) => b.includes(v));
  }

  return false;
};
