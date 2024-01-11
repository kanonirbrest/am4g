/* eslint-disable max-len */
import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import { ReactComponent as REPORT } from 'assets/icons/Report.svg';
import StatusItem from 'components/StatusItem';
import {
  getIconByType, getCampaignLabel, getCampaignTypeLabel,
} from 'utils/campaignUtils';
import DropdownMenu from 'components/DropdownMenu';
import DateBlock from 'components/DateBlock';
import { PUSH_CAMPAIGNS, STATUS, SUPPORTED_CAMPAIGNS } from 'utils/constants/campaign';
import Spinner from 'components/Spinner';
import { useMutation } from '@apollo/client';
import {
  startCampaignMutation, stopCampaignMutation,
  cloneCampaignMutation, campaignsByApplicationIDQuery,
  archiveCampaignMutation,
} from 'api/campaignQueries';
import { ReactComponent as Pause } from 'assets/icons/Pause.svg';
import { ReactComponent as Run } from 'assets/icons/Run.svg';
import Test from 'assets/icons/Test';
import Edit from 'assets/icons/Edit';
import { campaignType } from 'components/constants';
import Duplicate from 'assets/icons/Duplicate';
import Archive from 'assets/icons/Archive';
import { BUTTON_TYPES } from 'utils/styles/common';
import Hint from 'components/Hint';
import Author from 'components/Author';
import { getBackgroundByStatus } from './utils';
import TrendItem from './TrendItem';

const hintRange = `${dayjs(new Date()).subtract(8, 'days').format('MMM D')
} - ${dayjs(new Date()).subtract(2, 'days').format('MMM D')}`;

const hintRangePrev = `${dayjs(new Date()).subtract(15, 'days').format('MMM D')
} - ${dayjs(new Date()).subtract(9, 'days').format('MMM D')}`;

const useStyles = makeStyles(() => ({
  trends: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '85px',
    padding: '20px 10px',
    '@media (max-width:1270px)': {
      display: 'none',
    },
  },
  trendValues: {
    textDecoration: 'none',
    display: 'flex',
    padding: 0,
    flexWrap: 'wrap',
  },
  spinnerWrapper: { /* todo move to spinner component */
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    height: '85px',
    width: '100%',
    background: 'white',
  },
  root: {
    marginTop: '10px',
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '@media (max-width:1270px)': {
      justifyContent: 'space-between',
    },
    '@media (max-width:1050px)': {
      flexWrap: 'wrap',
    },
  },
  gridWrapper: {
    minHeight: '85px',
    maxWidth: '350px',
    minWidth: '350px',
    width: 'auto',
    padding: '0 25px',
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gridInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginRight: '20px',
  },
  gridTextWrapper: {
    paddingLeft: '25px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  campaignName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '250px',
    fontSize: '14px',
    textAlign: 'start',
    textTransform: 'capitalize',
    cursor: 'pointer',
  },
  gridItems: {
    minHeight: '85px',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    flexWrap: 'unset',
    padding: '20px 0',
    '@media (max-width:1050px)': {
      display: 'none',
    },
  },
  buttonsWrapper: {
    padding: '0 25px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
  },
  title: {
    fontWeight: 'normal',
    color: '#6C7688',
    fontSize: '10px',
    textAlign: 'start',
  },
  statusesWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  disabled: {
    pointerEvents: 'none',
  },
}));

export default React.memo(({
  status,
  data: {
    campaignName,
    type,
    created,
    updated,
    id,
    statistics,
    author,
  },
  activeApplicationId,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const cloneOptions = {
    refetchQueries: [{
      query: campaignsByApplicationIDQuery,
      variables: { applicationId: activeApplicationId },
    }],
  };
  const [stopCampaign, { loading: stopLoading }] = useMutation(stopCampaignMutation);
  const [archiveCampaign,
    { loading: archiveLoading }] = useMutation(archiveCampaignMutation);
  const [startCampaign, { loading: startLoading }] = useMutation(startCampaignMutation);
  const [cloneCampaign, { loading: cloneLoading }] = useMutation(cloneCampaignMutation,
    cloneOptions);

  const navigateEdit = () => {
    history.push(`${activeApplicationId}/${id}/edit`);
  };
  const navigateReport = () => {
    history.push(`${activeApplicationId}/${id}/reports`);
  };
  const navigateStep1 = () => {
    history.push(`${activeApplicationId}/${id}/edit?step=1`);
  };
  const isActive = status === STATUS.ACTIVE;
  const Icon = getIconByType(type);
  const typeValue = `${getCampaignTypeLabel(type)} / ${getCampaignLabel(type)}`;
  const isDisableEdit = !SUPPORTED_CAMPAIGNS.includes(type) || status === STATUS.ARCHIVED;
  const notArchived = status !== STATUS.ARCHIVED;
  const menuItems = [
    {
      title: 'Edit',
      Icon: Edit,
      onClick: navigateEdit,
      condition: SUPPORTED_CAMPAIGNS.includes(type) && notArchived,
    },
    {
      title: 'Pause',
      Icon: Pause,
      onClick: () => {
        stopCampaign({
          variables: {
            id,
          },
        });
      },
      condition: status === STATUS.ACTIVE && notArchived,
    },
    {
      title: 'Run',
      Icon: Run,
      onClick: () => {
        startCampaign({
          variables: {
            id,
          },
        });
      },
      condition: status !== STATUS.ACTIVE && notArchived,
    },
    {
      title: 'Test',
      Icon: Test,
      onClick: navigateStep1,
      condition: PUSH_CAMPAIGNS.includes(type)
          && notArchived,
    },
    {
      title: 'Clone',
      Icon: Duplicate,
      onClick: () => {
        cloneCampaign({
          variables: {
            id,
          },
        });
      },
      condition: true,
    },
    {
      title: 'Archive',
      Icon: Archive,
      onClick: () => {
        archiveCampaign({
          variables: {
            id,
          },
        });
      },
      condition: notArchived,
    },
  ];
  const isLoading = stopLoading || startLoading || cloneLoading || archiveLoading;
  const isReportDisabled = type === campaignType.inAppHoustonRedistribute;
  /* As HR campaign isn't defined as a traditional
    campaign for AM4G there are no metrics to display for AM4G users. */
  const trends = statistics.tendencies;

  return (
    <Paper
      classes={{
        root: classes.root,
      }}
      elevation={isActive ? 3 : 1}
      style={{
        background: getBackgroundByStatus(status),
      }}
    >
      {isLoading ? <div className={classes.spinnerWrapper}><Spinner size={30} /></div>
        : (
          <>
            <Grid
              container
              classes={{
                root: classes.gridWrapper,
              }}
            >
              <Grid
                item
                classes={{
                  root: classes.gridInner,
                }}
              >
                <Icon />
              </Grid>
              <Grid
                item
                style={{
                  root: classes.gridTextWrapper,
                }}
              >
                <Typography
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: '11px',
                    textAlign: 'start',
                  }}
                  variant="subtitle1"
                  color="textSecondary"
                  align="inherit"
                >
                  {typeValue}
                </Typography>
                <Typography
                  classes={{
                    root: cn({
                      [classes.campaignName]: true,
                      [classes.disabled]: isDisableEdit,
                    }),
                  }}
                  color="primary"
                  variant="h6"
                  onClick={navigateEdit}
                >
                  { campaignName }
                </Typography>
                <div className={classes.statusesWrapper}>
                  <StatusItem title={status} />
                </div>
              </Grid>
            </Grid>
            <Grid
              classes={{
                root: classes.gridItems,
              }}
              item
            >
              <DateBlock title="Created" date={created} />
            </Grid>
            <Grid
              classes={{
                root: classes.gridItems,
              }}
              item
            >
              <DateBlock title="Last modified" date={updated} />
            </Grid>
            <Grid
              classes={{
                root: classes.gridItems,
              }}
              item
            >
              <Author title="Author" author={author} />
            </Grid>
            <Grid
              classes={{
                root: classes.trends,
              }}
              item
            >
              {(STATUS.ACTIVE === status && trends.length > 0) && (
              <>
                <div className={classes.title}>
                  7 Days Trends
                  <Hint text={`7 Days trend for date range ${hintRange} compared to previous period ${hintRangePrev}`} />
                </div>
                <ul className={classes.trendValues}>
                  {trends.map((trend) => (
                    <TrendItem
                      key={trend.type}
                      {...trend}
                    />
                  ))}
                </ul>
              </>
              )}

            </Grid>
            <Grid
              classes={{
                root: classes.buttonsWrapper,
              }}
              item
            >
              <Button
                variant={BUTTON_TYPES.BLUE}
                size="medium"
                text="button"
                startIcon={<REPORT />}
                onClick={navigateReport}
                disabled={isReportDisabled}
              >
                Reports
              </Button>
              <DropdownMenu
                items={menuItems
                  .filter((o) => o.condition)}
              />
            </Grid>
          </>
        )}
    </Paper>
  );
});
