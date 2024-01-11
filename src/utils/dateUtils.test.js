import { TIME_FORMAT, DATE_CHART_FORMAT } from 'utils/constants/date';
import { getValidDate } from './dateUtils';

describe('Date Utils', () => {
  it('should insert item into array', () => {
    expect(getValidDate(new Date('1995-12-17T03:24:00'), TIME_FORMAT))
      .toEqual('03:24:00');
  });
  it('should insert item into array', () => {
    expect(getValidDate(new Date('1995-12-17T03:24:00'), DATE_CHART_FORMAT))
      .toEqual('Dec 17, 1995');
  });
  it('should insert item into array', () => {
    expect(getValidDate('invalid', DATE_CHART_FORMAT))
      .toBeNull();
  });
});
