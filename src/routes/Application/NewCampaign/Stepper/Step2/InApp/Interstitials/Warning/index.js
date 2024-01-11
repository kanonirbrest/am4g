import { useQuery } from '@apollo/client';
import Alert from '@mui/material/Alert';
import React from 'react';
import { makeStyles } from '@mui/styles';

import { getTriggerIntersectionsQuery } from 'api/queries';
import { STATUS } from 'utils/constants/campaign';

const useStyles = makeStyles(() => ({
  alert: {
    textAlign: 'start',
    width: '468px',
  },
}));

export default React.memo(({ trigger, currentId, activeApplication }) => {
  const classes = useStyles();

  const intersectionsResp = useQuery(getTriggerIntersectionsQuery, {
    fetchPolicy: 'no-cache',
    variables: {
      applicationId: activeApplication.id,
      filter: {
        triggering: [{
          key: 'trigger',
          value: trigger,
        }],
        statuses: [STATUS.ACTIVE],
      },
    },
    skip: !trigger,
  });
  const warningMsg = !!intersectionsResp?.data?.campaigns
    .filter((c) => c.id !== currentId).length
        && (intersectionsResp?.data?.campaigns || [])
          .map((c) => `"${c.name}"`).join(', ');

  if (!warningMsg) return null;

  return (
    <Alert classes={{ root: classes.alert }} severity="warning">
      &laquo;
      {trigger}
      &raquo;
      {' '}
      event is already in use in campaigns
      {' '}
      {warningMsg}
    </Alert>
  );
});
