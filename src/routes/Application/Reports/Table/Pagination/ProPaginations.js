import React from 'react';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';

import { proStyles } from 'routes/Application/Reports/Table/Pagination/styles';
import usePagination from 'routes/Application/Reports/Table/Pagination/usePagination';

const useStyles = makeStyles(() => (proStyles));

export default ({ type, total, labels }) => {
  const classes = useStyles();
  const {
    isShowPagination,
    pageCount, page, onPageChange, apiRef, totalData,
  } = usePagination({
    type,
    labels,
    extraRows: Object.keys(total)
      .map((date) => total[date]),
    isPro: true,
  });

  const position = apiRef.current.getColumnsMeta().positions;

  return (
    <div className={classes.footerWrapper}>
      <div
        id="grid-scroll-wrapper"
        className={classes.totalColumn}
        style={{
          borderBottom: isShowPagination && '1px solid rgba(224, 224, 224, 1)',
        }}
      >
        <div
          className={classes.totalRowPro}
          style={{
            minWidth: `${+(position[1] - position[0]) - 25}px`,
            // to render correct width when resize
          }}
        >
          Total
        </div>
        {apiRef.current.getAllColumns()
        // total and variant column
          .filter((el, ind) => ind !== 0 && ind !== 1)
          .map(({ field }, ind) => (
            <div
              key={field}
              className={classes.totalRowPro}
              style={{
                minWidth: `${(position[ind + 2] || 1870) - position[ind + 1] - 25}px`,
              }}
            >
              {totalData[field]}
            </div>
          ))}
      </div>
      {isShowPagination && (
        <Pagination
          classes={{
            root: classes.pagination,
          }}
          count={pageCount}
          page={page + 1}
          hideFooterSelectedRowCount
          onChange={onPageChange}
        />
      )}
    </div>
  );
};
