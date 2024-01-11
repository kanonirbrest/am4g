import { useRef, useEffect, useMemo } from 'react';
import {
  gridColumnVisibilityModelSelector,
  GridEvents,
} from '@mui/x-data-grid-pro';

export default (apiRef, columns, initialModel, rows, total) => {
  const prevModel = useRef(initialModel);

  useEffect(() => {
    if (!apiRef.current?.subscribeEvent) return;
    apiRef.current.subscribeEvent(GridEvents.rowGroupingModelChange, (newModel) => {
      const columnVisibilityModel = {
        ...gridColumnVisibilityModelSelector(apiRef),
      };

      newModel.forEach((field) => {
        if (!prevModel.current.includes(field)) {
          columnVisibilityModel[field] = false;
        }
      });
      prevModel.current.forEach((field) => {
        if (!newModel.includes(field)) {
          columnVisibilityModel[field] = true;
        }
      });
    });
  }, [apiRef]);

  return useMemo(
    () => columns.map((colDef) => (initialModel.includes(colDef.field)
      ? {
        ...colDef,
        hide: true,
        fullData: { rows },
        total,
      }
      : {
        ...colDef,
        fullData: { rows },
        total,
      })),
    [columns, initialModel, rows],
  );
};
