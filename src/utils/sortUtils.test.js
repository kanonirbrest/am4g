import {
  getSortFunctionBySortType,
} from './sortUtils';

const campaigns = [{
  id: 3,
  name: 'c',
  status: 'b',
  type: 'b',
  updated: new Date(2020, 2, 1, 1, 10),
}, {
  id: 1,
  name: 'a',
  status: 'd',
  type: 'd',
  updated: new Date(2013, 2, 1, 1, 10),
}, {
  id: 4,
  name: 'd',
  status: 'a',
  type: 'a',
  updated: new Date(2022, 2, 1, 1, 10),
}, {
  id: 2,
  name: 'b',
  status: 'c',
  type: 'c',
  updated: new Date(2014, 2, 1, 1, 10),
}];
describe('Sort Utils', () => {
  it('should sort by updated field', () => {
    const sortFunction = getSortFunctionBySortType('updated');

    const result = [...campaigns
      .sort(sortFunction)].map((i) => i.id);
    expect(result).toEqual([4, 3, 2, 1]);
  });
  it('should sort by name field', () => {
    const sortFunction = getSortFunctionBySortType('name');

    const result = [...campaigns
      .sort(sortFunction)].map((i) => i.id);
    expect(result).toEqual([1, 2, 3, 4]);
  });
  it('should sort by type field', () => {
    const sortFunction = getSortFunctionBySortType('type');

    const result = [...campaigns
      .sort(sortFunction)].map((i) => i.id);
    expect(result).toEqual([4, 3, 2, 1]);
  });
  it('should sort by status field', () => {
    const sortFunction = getSortFunctionBySortType('status');

    const result = [...campaigns
      .sort(sortFunction)].map((i) => i.id);
    expect(result).toEqual([4, 3, 2, 1]);
  });
});
