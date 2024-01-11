import React from 'react';
import {
  gridPageCountSelector as gridPageCountSelectorPro,
  gridPageSelector as gridPageSelectorPro,
  useGridApiContext as useGridApiContextPro,
  useGridSelector as useGridSelectorPro,
} from '@mui/x-data-grid-pro';
import {
  gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector,
} from '@mui/x-data-grid';
import { getTotal } from 'routes/Application/Reports/utils';

const getDepth = (isPro) => (isPro ? {
  gridPageCountSelector: gridPageCountSelectorPro,
  gridPageSelector: gridPageSelectorPro,
  useGridApiContext: useGridApiContextPro,
  useGridSelector: useGridSelectorPro,
}
  : {
    gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector,
  });
export default ({
  type, labels, extraRows = [], isPro = false, pageId,
}) => {
  const depth = getDepth(isPro);
  const apiRef = depth.useGridApiContext();
  const page = depth.useGridSelector(apiRef, depth.gridPageSelector);
  const pageCount = depth.useGridSelector(apiRef, depth.gridPageCountSelector);
  const rows = Object.values(apiRef.current.state.rows.idRowsLookup);
  const totalData = React.useMemo(() => getTotal(type)([
    ...extraRows, ...rows], labels, pageId),
  [apiRef.current.state.rows.idRowsLookup]);
  const onPageChange = (event, value) => apiRef
    .current.setPage(value - 1);
  const groups = apiRef.current.state.rows.ids.filter((key) => key
    .toString()
    .includes('auto-generated-row'));
  const isShowPagination = groups.length > 10;

  return {
    isShowPagination,
    onPageChange,
    totalData,
    rows,
    page,
    pageCount,
    apiRef,
  };
};
