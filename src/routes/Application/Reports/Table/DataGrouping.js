import React, { useEffect, useRef } from 'react';
import {
  DataGridPro,
  useGridApiRef,
} from '@mui/x-data-grid-pro';

import useStyles from 'routes/Application/Reports/styles';
import useGroupingColumnsHidden from 'hooks/useGroupingColumnsHidden';
import NoRows from 'routes/Application/Reports/NoRows';
import CustomPagination from 'routes/Application/Reports/Table/Pagination/ProPaginations';
import Info from 'assets/icons/Info';
import GroupingCell from './GroupingCell';

const ROW_HEIGHT = 40;

export default ({
  type,
  statistics,
  data,
  nameMapper,
  groupingColumns = [],
  isPurchase,
}) => {
  const classes = useStyles();
  const {
    rows,
    columns,
    total,
    isShowProPagination,
    initialSorting = {},
  } = statistics.getStatistic(
    data.statistics.labels,
    data.statistics.data,
    type,
    '',
    nameMapper,
  );
  const apiRef = useGridApiRef();
  const scrollRef = useRef(null);

  const tableColumns = useGroupingColumnsHidden(
    apiRef,
    columns,
    groupingColumns,
    rows,
    total,
  );

  // buy key
  useEffect(() => {
    setTimeout(() => {
      const xpath = "//div[text()='MUI X: Missing license key']";
      const matchingElement = document
        .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
      if (matchingElement) matchingElement.style.display = 'none';
    }, 500);
  }, []);
  const extraFields = isShowProPagination ? {
    Pagination: () => (
      <CustomPagination
        labels={data.statistics.labels}
        type={type}
        total={total}
      />
    ),
  } : {};

  useEffect(() => {
    const handler = (e) => {
      const es = document
        .getElementById('grid-scroll-wrapper');

      es.scrollLeft = e.target.scrollLeft;
    };
    setTimeout(() => {
      const list = document
        .getElementsByClassName('MuiDataGrid-virtualScroller');
      scrollRef.current = document
        // we can have 2 tables (inAppHtml with purchase) and should adjust last one
        .getElementsByClassName('MuiDataGrid-virtualScroller')[list.length - 1];
      if (scrollRef.current) {
        scrollRef.current.addEventListener('scroll', handler);
      }
    }, 500);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handler);
      }
    };
  }, []);

  return (
    <>
      {isPurchase && (
      <div className={classes.purchaseLabel}>
        <Info className={classes.infoIcon} />
        Purchases statistics
      </div>
      )}
      <DataGridPro
        classes={{
          root: classes.dataGrid,
          columnHeader: classes.columnHeader,
          cell: classes.cell,
          row: classes.row,
          selectedRowCount: classes.selectedRowCount,
          groupingCriteriaCell: classes.variantLabel,
          columnSeparator: classes.separator,
        }}
        rows={rows}
        columns={tableColumns}
        pageSize={10}
        autoHeight
        rowThreshold={0}
        disableColumnMenu
        headerHeight={ROW_HEIGHT}
        rowHeight={ROW_HEIGHT}
        hideFooter={!rows.length}
        hidefooterselectedrowcount
        rowGroupingColumnMode="single"
        pagination
        sortingOrder={['desc', 'asc']}
        initialState={{
          ...initialSorting,
          rowGrouping: {
            model: groupingColumns,
          },
        }}
        // disableColumnResize
        experimentalFeatures={{
          rowGrouping: true,
        }}
        groupingColDef={{
          hideDescendantCount: true,
          renderCell: (props) => <GroupingCell {...props} />,
        }}
        components={{
          NoRowsOverlay: () => <NoRows />,
          ...extraFields,
        }}
      />
    </>
  );
};
