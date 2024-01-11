import React from 'react';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

import Campaigns from 'components/Campaigns';
import CampaignsListActions from
  'routes/Application/CampaignListPage/CampaignsListActions';
import CampaignFilters from 'routes/Application/CampaignListPage/CampaignFilters';
import { CAMPAIGN_TYPE_LABEL, initialFilters } from 'components/constants';
import {
  getActiveFilters,
} from 'utils';
import FilterList from 'routes/Application/CampaignListPage/FilterList';
import ApplicationSettings from 'routes/Application/CampaignListPage/ApplicationSettings';
import TabPanel from 'components/TabPanel';
import {
  getActualCampaigns, getUniqueAuthors,
} from 'routes/Application/CampaignListPage/utils';
import PaginationWrapper from 'routes/Application/CampaignListPage/Pagination';
import { HEADER_TABS } from 'components/Header/BottomAppBar/HeaderTabs';
import { SORT_TYPE } from 'utils/sortUtils';
import { getCampaignLabel } from 'utils/campaignUtils';
import { SS_KEYS } from 'services/sessionStorage';
import useStateSS from 'hooks/useStateSS';
import Button from '@mui/material/Button';
import { BUTTON_TYPES } from 'utils/styles/common';
import { BACKUP_KEY, BACKUP_QUERY_KEY } from 'hooks/useBackup';
import NoBackupDialog from './NoBackupDialog';

const useStyles = makeStyles(() => ({
  ul: {
    justifyContent: 'center',
  },
  backup: {
    marginBottom: '15px',
    height: 'auto',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: '#F1F5FA',
  },
  bodyMain: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    background: '#F1F5FA',
  },
  bodyAside: {
    width: '240px',
    padding: '20px 0',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'start',
    minHeight: 'calc(100vh - 63px - 68px - 64px - 40px - 48px)',
    /* top bar, bottom bar, footer, left panel paddings, side padding */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bodyContent: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    flexGrow: 1,
    width: 'calc(100% - 240px)',
    height: '100%',
    padding: '24px',
  },
  campaigns: {
    width: '100%',
  },
  spinnerWrapper: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  noItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '100px',
  },
  tabsPanelWrapper: {
    padding: '0 24px',
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
const campaignsPerPage = 10;
export const CAMPAIGN_LIST_SS_PARAMS = [SS_KEYS.ACTIVE_PAGE, SS_KEYS.SORT,
  SS_KEYS.GROUP, SS_KEYS.TYPE_FILTER, SS_KEYS.SUB_TYPE_FILTER, SS_KEYS.PER_PAGE, SS_KEYS.AUTHOR_FILTER];

export const getItemKey = (key, id) => `${key}.${id}`;
export default ({
  activeTab,
  activeApplication,
  setActiveApplication,
  campaignsData,
  applications,
}) => {
  const { id } = activeApplication;
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  const [campaigns, setCampaigns] = React.useState([]);
  const [activePage, setActivePage] = useStateSS(getItemKey(SS_KEYS.ACTIVE_PAGE, id), 0);
  const [sort, setSort] = useStateSS(getItemKey(SS_KEYS.SORT, id), SORT_TYPE.UPDATED);
  const [groupBy, setGroupBy] = useStateSS(getItemKey(SS_KEYS.GROUP, id), '');
  const [shownCampaigns, setShownCampaigns] = React.useState([]);
  const [filterTypeValues, setFilterTypeValues] = useStateSS(
    getItemKey(SS_KEYS.TYPE_FILTER, id), initialFilters,
  );
  const [filterSubTypeValues, setFilterSubTypeValues] = useStateSS(
    getItemKey(SS_KEYS.SUB_TYPE_FILTER, id), initialFilters,
  );
  const [itemsPerPage, setItemsPerPage] = useStateSS(
    getItemKey(SS_KEYS.PER_PAGE, id), campaignsPerPage,
  );
  const [filterAuthorValues, setFilterAuthorValues] = useStateSS(
    getItemKey(SS_KEYS.AUTHOR_FILTER, id), initialFilters,
  );
  const count = Math.ceil(campaigns.length / itemsPerPage);

  const onPageChange = (event, page) => {
    setActivePage(page - 1);
  };
  const authors = getUniqueAuthors({ campaigns: [...campaignsData.campaigns] });
  Object.keys(authors).forEach((key) => {
    if (!(authors[key] in filterAuthorValues)) {
      filterAuthorValues[authors[key]] = false;
    }
  });

  React.useEffect(() => {
    if (!campaignsData?.campaigns) {
      setCampaigns([]);

      return;
    }
    const activeFilters = getActiveFilters(filterTypeValues);
    const activeSubFilters = getActiveFilters(filterSubTypeValues);
    const activeAuthorFilters = getActiveFilters(filterAuthorValues);

    const actual = getActualCampaigns({
      campaigns: [...campaignsData.campaigns],
      activeFilters,
      activeSubFilters,
      groupBy,
      sort,
      activeAuthorFilters,
    });

    setCampaigns(actual);
  }, [
    filterTypeValues,
    itemsPerPage, filterSubTypeValues,
    sort, groupBy, campaignsData?.campaigns, filterAuthorValues,
  ]);
  React.useEffect(() => {
    const startItem = activePage * itemsPerPage;
    const lastItem = campaigns.length < itemsPerPage
      ? campaigns.length : startItem + itemsPerPage;
    setShownCampaigns(campaigns.slice(startItem, lastItem));
  }, [campaigns, activePage, itemsPerPage]);

  const memoizedGetSubFilterLabel = React.useCallback(
    (f) => (getCampaignLabel(f) !== 'Unknown'
      ? getCampaignLabel(f) : CAMPAIGN_TYPE_LABEL[f]),
    [],
  );
  const onBackupClick = React.useCallback(() => {
    const campaign = localStorage.getItem(BACKUP_KEY);
    if (campaign) {
      const backupId = JSON.parse(campaign)?.id;
      const applicationId = JSON.parse(campaign)?.applicationId;

      if (backupId) {
        history.push({
          pathname: `/${applicationId}/${backupId}/edit`,
          search: `?${BACKUP_QUERY_KEY}=true`,
        });
      } else {
        history.push({
          pathname: `/${applicationId}/new-campaign`,
          search: `?${BACKUP_QUERY_KEY}=true`,
        });
      }
      if (applicationId !== activeApplication.id) {
        setActiveApplication(applications.find((a) => a.id === applicationId));
      }
    } else {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <main className={classes.body}>
        <TabPanel
          value={activeTab}
          tabValue={HEADER_TABS.CAMPAIGNS}
          classes={{ tabsPanelWrapper: classes.tabsPanelWrapper }}
        >
          <div className={classes.bodyMain}>
            <div className={classes.bodyAside}>
              <div>
                <span>Campaigns</span>
                <CampaignFilters
                  setFilterValues={setFilterTypeValues}
                  filterValues={filterTypeValues}
                  subTypeFilters={filterSubTypeValues}
                  setSubTypeFilters={setFilterSubTypeValues}
                  setActivePage={setActivePage}
                  authors={authors}
                  setAuthorFilter={setFilterAuthorValues}
                  filterAuthor={filterAuthorValues}
                />
              </div>
              <Button
                variant={BUTTON_TYPES.BLUE}
                size="medium"
                text="button"
                className={classes.backup}
                onClick={onBackupClick}
              >
                Restore Last Campaign Changes
              </Button>
            </div>

            <div className={classes.bodyContent}>
              <CampaignsListActions
                sort={sort}
                setSort={setSort}
                groupBy={groupBy}
                setGroupBy={setGroupBy}
                activeApplication={activeApplication}
              />
              {campaignsData && campaignsData.campaigns.length > 0
                ? (
                  <>
                    <div className={classes.chipWrapper}>
                      <FilterList
                        filters={filterTypeValues}
                        setFilters={setFilterTypeValues}
                      />
                      <FilterList
                        filters={filterSubTypeValues}
                        setFilters={setFilterSubTypeValues}
                        getLabel={memoizedGetSubFilterLabel}
                      />
                      <FilterList
                        filters={filterAuthorValues}
                        setFilters={setFilterAuthorValues}
                      />
                    </div>
                    <div className={classes.campaigns}>
                      <Campaigns
                        data={shownCampaigns}
                        groupBy={groupBy}
                        activePage={activePage}
                        fullList={campaigns}
                        itemsPerPage={itemsPerPage}
                        activeApplication={activeApplication}
                      />
                    </div>
                    <PaginationWrapper
                      count={count}
                      onPageChange={onPageChange}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      setActivePage={(page) => {
                        setActivePage(page);
                      }}
                      activePage={activePage}
                    />
                  </>
                ) : (
                  <div className={classes.noItems}>There is no items</div>
                )}
            </div>
          </div>
        </TabPanel>
        <TabPanel
          value={activeTab}
          tabValue={HEADER_TABS.SETTINGS}
          classes={{ tabsPanelWrapper: classes.tabsPanelWrapper }}
        >
          <ApplicationSettings />
        </TabPanel>
      </main>
      <NoBackupDialog
        open={open}
        onClose={handleClose}
      />
    </>
  );
};
