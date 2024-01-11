import {
  renderDate, renderOnlyChilds, renderOnlyTotalPercentage, renderWithSum,
  division, isAllUndefined,
}
  from 'routes/Application/Reports/Statistic/utils';
import { mockCellClicks, mockCellClicksEmptyAndTotal, mockCellClicksPartially }
  from 'routes/Application/Reports/Statistic/mock';

describe('Statistic render methods', () => {
  it('should render correct vales if value are presented', () => {
    expect(renderWithSum(mockCellClicks))
      .toEqual(3);
  });
  it('should render correct vales if value are missing', () => {
    expect(renderWithSum(mockCellClicksEmptyAndTotal))
      .toEqual('-');
  });
  it('should render correct vales if value are missing partially', () => {
    expect(renderWithSum(mockCellClicksPartially))
      .toEqual(4);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(renderOnlyTotalPercentage(mockCellClicksEmptyAndTotal))
      .toEqual(46);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(renderOnlyTotalPercentage(mockCellClicks))
      .toEqual('-');
  });
  it('should render correct vales if value are missing partially', () => {
    expect(renderDate({ value: new Date('12.12.2022') }))
      .toEqual('2022-12-12');
  });
  it('should render correct vales if value are missing partially', () => {
    expect(renderOnlyChilds({
      value: 12,
      rowNode: {
        children: [
          0,
          1,
        ],
      },
      colDef: {},
    }))
      .toEqual(null);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(renderOnlyChilds({
      value: 12,
      rowNode: {
        children: null,
      },
      colDef: {},
    }))
      .toEqual(12);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(renderOnlyChilds({
      value: 12,
      rowNode: {
        children: null,
      },
      colDef: {},
    }))
      .toEqual(12);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(division(undefined, 2))
      .toEqual(undefined);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(division(2, undefined))
      .toEqual(undefined);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(division(4, 2))
      .toEqual(2);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(isAllUndefined(mockCellClicks, 'clicks'))
      .toEqual(false);
  });
  it('should render correct vales if value are missing partially', () => {
    expect(isAllUndefined(mockCellClicksEmptyAndTotal, 'clicks'))
      .toEqual(true);
  });
});
