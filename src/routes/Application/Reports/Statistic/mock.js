export const mockCellClicks = {
  rowNode: {
    id: 'auto-generated-row-date/Jun 13, 2022',
    groupingKey: 'Jun 14, 2022',
    groupingField: 'date',
    children: [
      0,
      1,
    ],
  },
  colDef: {
    field: 'clicks',
    fullData: {
      rows: [
        {
          clicks: 1,
          id: 0,
        },
        {
          clicks: 2,
          id: 1,
        },
      ],
    },
    total: {
      'Jun 14, 2022': {
        click: 46,
      },
    },
  },
};
export const mockCellClicksEmptyAndTotal = {
  rowNode: {
    id: 'auto-generated-row-date/Jun 13, 2022',
    groupingKey: 'Jun 14, 2022',
    groupingField: 'date',
    children: [
      0,
      1,
    ],
  },
  colDef: {
    field: 'clicks',
    fullData: {
      rows: [
        {
          id: 0,
        },
        {
          id: 1,
        },
      ],
    },
    total: {
      'Jun 14, 2022': {
        clicks: 46,
      },
    },
  },
};
export const mockCellClicksPartially = {
  rowNode: {
    id: 'auto-generated-row-date/Jun 13, 2022',
    groupingKey: 'Jun 14, 2022',
    groupingField: 'date',
    children: [
      0,
      1,
    ],
  },
  colDef: {
    field: 'clicks',
    fullData: {
      rows: [
        {
          id: 0,
        },
        {
          clicks: 4,
          id: 1,
        },
      ],
    },
    total: {
      'Jun 14, 2022': {
        click: 46,
      },
    },
  },
};
