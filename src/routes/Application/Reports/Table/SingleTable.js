import React from 'react';
import {
  DataGrid,
} from '@mui/x-data-grid';

import CustomPagination from 'routes/Application/Reports/Table/Pagination/Pagination';
import useStyles from 'routes/Application/Reports/styles';
import NoRows from '../NoRows';

const ROW_HEIGHT = 40;

export default ({
  data, type, statistic, nameMapper, pageId,
}) => {
  const classes = useStyles();

  const {
    rows,
    columns,
    initialSorting = {},
  } = statistic.getStatistic(
    data.statistics.labels,
    data.statistics.data, type, '', nameMapper,
    pageId,
  );

  return (
    <DataGrid
      classes={{
        root: classes.dataGrid,
        columnHeader: classes.columnHeader,
        cell: classes.cell,
        row: classes.row,
        selectedRowCount: classes.selectedRowCount,
      }}
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10, 50, 100]}
      autoHeight
      disableColumnMenu
      headerHeight={ROW_HEIGHT}
      rowHeight={ROW_HEIGHT}
      hideFooter={!rows.length}
      initialState={initialSorting}
      components={{
        Pagination: () => (
          <CustomPagination
            labels={data.statistics.labels}
            type={type}
            pageId={pageId}
          />
        ),
        NoRowsOverlay: () => <NoRows />,
      }}
    />
  );
};
