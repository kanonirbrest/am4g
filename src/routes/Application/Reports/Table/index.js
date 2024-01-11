import React from 'react';
import { getVariants } from 'routes/Application/Reports/Statistic/utils';

import DataGrouping from 'routes/Application/Reports/Table/DataGrouping';
import { campaignType } from 'components/constants';
import SingleTable from './SingleTable';

export default ({
  data, type, statistic, nameMapper, pageId, isPurchase,
}) => {
  const isMultiVariant = getVariants(data.statistics.data).length;

  return isPurchase || (isMultiVariant && type !== campaignType.inAppHTML)
    ? (
      <DataGrouping
        type={type}
        isPurchase={isPurchase}
        statistics={statistic}
        data={data}
        nameMapper={nameMapper}
        groupingColumns={statistic.groupingColumns}
      />
    )
    : (
      <SingleTable
        data={data}
        type={type}
        statistic={statistic}
        nameMapper={nameMapper}
        pageId={pageId}
      />
    );
};
