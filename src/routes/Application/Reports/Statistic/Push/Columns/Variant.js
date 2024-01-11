import {
  renderWithSum, renderHeader,
  renderAudience, renderValueAndTotalRelation,
} from 'routes/Application/Reports/Statistic/utils';

export default [
  {
    field: 'variant',
    headerName: 'variant',
    flex: 1,
    sortable: false,
  },
  {
    field: 'date',
    headerName: 'date',
    sortable: false,
    flex: 1,
    sortComparator: (v1, v2) => new Date(v1).getTime() - new Date(v2).getTime(),
  },
  {
    field: 'audience',
    headerName: 'audience, %',
    renderHeader,
    sortable: false,
    renderCell: renderAudience,
    flex: 1,
    tooltip: 'The percentage of targeted users that received a variant.'
            + ' The distribution of users between variants is equal '
            + 'and covers 100% users.',
  },
  {
    field: 'push_send_count',
    headerName: 'sent',
    renderHeader,
    renderCell: renderWithSum,
    flex: 1,
    sortable: false,
    tooltip: 'Number of push messages sent to users\' devices.',
  },
  {
    field: 'push_delivered_count',
    headerName: 'delivered',
    renderHeader,
    renderCell: renderWithSum,
    flex: 1,
    sortable: false,
    tooltip: 'Number of push messages delivered to user\'s device',
  },
  {
    field: 'push_open_count',
    headerName: 'opened',
    renderHeader,
    renderCell: renderWithSum,
    flex: 1,
    sortable: false,
    tooltip: 'Number of push notifications tapped/opened',
  },
  {
    field: 'delivery_rate',
    headerName: 'delivery rate, %',
    renderHeader,
    renderCell: renderValueAndTotalRelation,
    flex: 1,
    sortable: false,
    tooltip: 'Occurrences of delivered divided by '
            + 'occurrences of sent (displayed as a percentage)',
  },
  {
    field: 'open_per_sent',
    headerName: 'open per sent, %',
    renderHeader,
    renderCell: renderValueAndTotalRelation,
    flex: 1,
    sortable: false,
    tooltip: 'Occurrences of open divided by '
            + 'occurrences of sent (displayed as a percentage)',
  },
  {
    field: 'open_per_delivered',
    headerName: 'open per delivered, %',
    renderHeader,
    renderCell: renderValueAndTotalRelation,
    flex: 1,
    sortable: false,
    tooltip: 'Occurrences of open divided by occurrences '
            + 'of delivered (displayed as a percentage)',
  },
];
