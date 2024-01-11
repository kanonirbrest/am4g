import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import StatusItem from 'components/StatusItem';
import DateBlock from 'components/DateBlock';
import TextBlock from 'components/TextBlock';
import { getCampaignLabel, getCampaignTypeLabel } from 'utils/campaignUtils';
import Pie from './Pie';

const useStyles = makeStyles(() => ({
  sidePanel: {
    paddingRight: '10px',
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
  },
  infoBlock: {
    marginTop: '25px',
    display: 'flex',
    alignItems: 'center',
    // flexGrow: 1,
    justifyContent: 'space-between',
    borderBottom: 'thin solid #D8DFE8;',
    paddingBottom: '10px',
  },
  subLabel: {
    fontSize: '12px',
    color: '#6C7688',
  },
  type: {
    textAlign: 'start',
  },
  wrapper: {
    padding: 0,
    width: 'auto',
  },
  dateWrapper: {
    padding: 0,
  },
  message: {
    flexDirection: 'column',
    alignItems: 'start',
    fontWeight: 400,
    fontSize: '14px',
    borderBottom: 'none',
  },
  pieChart: {
    justifySelf: 'end',
    marginTop: 'auto',
  },
}));

export default ({ campaign, particulars }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidePanel}>
      <div className={classes.infoBlock}>
        <div>
          <div className={classes.type}>
            {getCampaignTypeLabel(campaign.type)}
          </div>
          <div className={classes.subLabel}>
            {getCampaignLabel(campaign.type)}
          </div>
        </div>
        <StatusItem title={campaign.status} />
      </div>
      <div className={classes.infoBlock}>
        <DateBlock
          title="Create date"
          date={campaign.created}
          classes={{ wrapper: classes.dateWrapper }}
        />
        <DateBlock
          title="Last edit date"
          date={campaign.updated}
          classes={{ wrapper: classes.dateWrapper }}
        />
      </div>
      {/* <div className={classes.infoBlock}> */}
      {/*  {campaign.triggering && campaign.triggering.length > 0 && ( */}
      {/*  <TextBlock */}
      {/*    title="Trigger:" */}
      {/*    items={campaign.triggering} */}
      {/*    classes={{ wrapper: classes.wrapper }} */}
      {/*  /> */}
      {/*  )} */}
      {/* </div> */}
      <div className={classes.infoBlock}>
        {campaign.targeting && campaign.targeting.length > 0
        && (
        <TextBlock
          title="Targets:"
          items={campaign.targeting}
          classes={{ wrapper: classes.wrapper }}
        />
        )}
      </div>
      <div className={cn(classes.infoBlock, classes.message)}>
        <div className={classes.subLabel}>
          Message
        </div>
      </div>
      {!!particulars?.length && (
      <div className={classes.pieChart}>
        <Pie data={particulars} />
      </div>
      )}
    </div>
  );
};
