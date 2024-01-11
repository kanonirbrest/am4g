import _groupBy from 'lodash.groupby';

import { getSortFunctionBySortType } from 'utils/sortUtils';
import { getCampaignTypeLabel } from 'utils/campaignUtils';
import { STATUS_ENUM } from 'utils/constants/campaign';

// eslint-disable-next-line import/prefer-default-export
export const getActualCampaigns = ({
  campaigns, activeFilters, activeSubFilters, groupBy, sort, activeAuthorFilters,
}) => {
  let actualCampaigns = [...campaigns];
  /* apply filters */
  if (activeFilters.length !== 0) {
    actualCampaigns = campaigns.filter(
      ({ status }) => activeFilters.includes(STATUS_ENUM[status]),
    );
  }

  /* apply sub filters */
  if (activeSubFilters.length !== 0) {
    actualCampaigns = actualCampaigns.filter(
      ({ type }) => activeSubFilters.includes(type),
    );
  }
  /* apply author filters */
  if (activeAuthorFilters.length !== 0) {
    actualCampaigns = actualCampaigns.filter(
      ({ author }) => activeAuthorFilters.includes(author),
    );
  }

  /* apply grouping */
  if (groupBy) {
    const groupedItems = _groupBy(actualCampaigns
      .map((i) => ({ ...i, group: getCampaignTypeLabel(i.type) })), 'group');
    let result = [];
    Object.keys(groupedItems).forEach((key) => {
      if (sort) {
        /* apply sort in grouping */
        const sortFunction = getSortFunctionBySortType(sort);
        result = result.concat(groupedItems[key].sort(sortFunction));
      } else {
        result = result.concat(groupedItems[key]);
      }
    });

    return result;
  } if (sort) {
    /* apply sort */
    const sortFunction = getSortFunctionBySortType(sort);

    return [...actualCampaigns
      .sort(sortFunction)];
  }

  /* set unchanged array */
  return [...actualCampaigns];
};

export const getUniqueAuthors = ({
  campaigns,
}) => {
  let authors = campaigns.map((campaign) => campaign.author);
  authors = [...new Set(authors)];
  authors = authors.filter((o) => o !== null);

  return authors;
};
