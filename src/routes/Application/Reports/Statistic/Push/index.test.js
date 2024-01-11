import { campaignType } from 'components/constants';
import { getStatisticPush } from 'routes/Application/Reports/Statistic/Push/index';

const labels = [
  'push_send_count',
  'push_delivered_count',
  'push_open_count',
  'trigger',
];
const mockData = [
  {
    date: '2022-02-16T00:00:00.000Z',
    type: 'push_send_count',
    count: 1,
    variant: '',
  },
  {
    date: '2022-02-16T00:00:00.000Z',
    type: 'push_delivered_count',
    count: 1,
    variant: '',
  },
  {
    date: '2022-02-16T00:00:00.000Z',
    type: 'push_open_count',
    count: 1,
    variant: '',
  },
  {
    date: '2022-02-16T00:00:00.000Z',
    type: 'trigger',
    count: 1,
    variant: '',
  },
  {
    date: '2022-02-17T00:00:00.000Z',
    type: 'trigger',
    count: 4,
    variant: '',
  },
  {
    date: '2022-02-17T00:00:00.000Z',
    type: 'push_delivered_count',
    count: 8,
    variant: '',
  },
  {
    date: '2022-02-17T00:00:00.000Z',
    type: 'push_send_count',
    count: 33,
    variant: '',
  },
  {
    date: '2022-02-17T00:00:00.000Z',
    type: 'push_open_count',
    count: 4,
    variant: '',
  },
];
const type = campaignType.pushScheduled;

describe('getStatistic util', () => {
  const { columns } = getStatisticPush(labels, mockData, type);

  it('chart rows', () => {
    expect(columns.length)
      .toEqual(7);

    expect(columns).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            field: 'date', flex: 1, headerName: 'date',
          },
        ),
      ]),
    );
  });
});
