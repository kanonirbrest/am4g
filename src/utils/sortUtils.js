export const SORT_TYPE = {
  UPDATED: 'updated',
  NAME: 'name',
  STATUS: 'status',
  TYPE: 'type',
};

export const sortByDate = (value) => (a, b) => new Date(b[value]) - new Date(a[value]);
export const sortByString = (value) => (a, b) => (
  (a[value] > b[value]) ? 1 : -1);

export const getSortFunctionBySortType = (sortType) => {
  switch (sortType) {
    case SORT_TYPE.UPDATED:
      return sortByDate(sortType);

    case SORT_TYPE.NAME:
      return sortByString(sortType);

    case SORT_TYPE.STATUS:
      return sortByString(sortType);

    case SORT_TYPE.TYPE:
      return sortByString(sortType);

    default:
      return () => {};
  }
};
