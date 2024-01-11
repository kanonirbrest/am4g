import React from 'react';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';

import { styles } from 'routes/Application/Reports/Table/Pagination/styles';
import usePagination from 'routes/Application/Reports/Table/Pagination/usePagination';

const useStyles = makeStyles(() => (styles));

export default ({
  type, labels, pageFilter, pageId,
}) => {
  const {
    rows, pageCount, page, onPageChange, totalData,
  } = usePagination({
    type,
    labels,
    pageFilter,
    pageId,
  });
  const classes = useStyles();
  const isShowPagination = rows.length > 10;

  return (
    <div className={classes.footerWrapper}>
      <div
        className={classes.totalColumn}
        style={{
          borderBottom: isShowPagination && '1px solid rgba(224, 224, 224, 1)',
        }}
      >
        <div className={classes.totalRow}>Total</div>
        {Object.keys(totalData)
          .map((key) => (
            <div
              key={key}
              className={classes.totalRow}
            >
              {totalData[key]}
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
