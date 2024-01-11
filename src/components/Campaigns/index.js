import React from 'react';
import { makeStyles } from '@mui/styles';

import { getCampaignTypeLabel } from 'utils/campaignUtils';
import CampaignCard from './CampaignCard';

const useStyles = makeStyles(() => ({
  titleWrapper: {
    padding: '15px 0 8px 10px',
    textAlign: 'start',
    fontWeight: 600,
    fontSize: '17px',
    textTransform: 'capitalize',
    letterSpacing: '-0.0024em',
  },
}));

const getHeader = (data, index, activePage, fullList, itemsPerPage) => {
  const type = getCampaignTypeLabel(data[index].type);

  if (index === 0) {
    if (activePage === 0) {
      return type;
    }
    if (type !== getCampaignTypeLabel(fullList[itemsPerPage * activePage - 1].type)) {
      return type;
    }

    return null;
  } if (type !== getCampaignTypeLabel(data[index - 1].type)) {
    return type;
  }

  return null;
};

export default React.memo(({
  data,
  groupBy,
  activePage,
  fullList,
  itemsPerPage,
  activeApplication,
}) => {
  const classes = useStyles();

  return data.map(({
    id,
    status,
    name,
    message,
    triggering,
    targeting,
    type,
    created,
    updated,
    statistics,
    author,
  }, index) => {
    const header = getHeader(data, index, activePage, fullList, itemsPerPage);

    return (
      <React.Fragment key={id}>
        {groupBy && header && (
        <div
          className={classes.titleWrapper}
        >
          {header}
        </div>
        )}
        <CampaignCard
          status={status}
          data={{
            campaignName: name,
            triggering,
            targeting,
            message,
            type,
            created,
            updated,
            id,
            statistics,
            author,
          }}
          activeApplicationId={activeApplication.id}
        />
      </React.Fragment>
    );
  });
});
