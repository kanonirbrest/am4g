import {
  insert, arrayMove, getMaxIndex, removeEmpty, getIntersections,
} from 'utils/arrayUtils';

describe('Array Utils - insert', () => {
  it('should insert item into array', () => {
    const array = [1, 2, 3, 4, 5];

    expect(insert(array, 2, 2)).toEqual([1, 2, 2, 3, 4, 5]);
  });
});

describe('Array Utils - arrayMove', () => {
  it('should return correct array', () => {
    const array = [1, 2, 3, 4, 5];

    expect(arrayMove(array, 2, 3)).toEqual([1, 2, 4, 3, 5]);
  });
});

describe('Array utils get max index', () => {
  it('should find max index', () => {
    const array = [{ index: 24 }, { index: 2 }, { index: 3 }];

    expect(getMaxIndex(array)).toEqual(24);
  });
});

describe('Array utils - remove Empty', () => {
  it('should remove empty fields from object', () => {
    const obj = {
      emptyString: '',
      emptyObj: {},
      fieldNull: null,
      fieldUndef: null,
      region: [''],
      notEmptyAtt: ['', '1'],
      string: 'string',
    };

    expect(removeEmpty(obj)).toEqual({
      string: 'string',
      region: [''],
      notEmptyAtt: ['1'],
    });
  });
});

describe('Array utils = get intersections', () => {
  it('should return array of intersections', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];

    expect(getIntersections(arr1, arr2)).toEqual([3]);
  });
});
