import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@mui/styles';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import { getLanguagesQuery, triggerEventsByApplicationIDQuery } from 'api/queries';
import Spinner from 'components/Spinner';
import getTabContentByType from 'routes/Application/NewCampaign/Stepper/Step2/utils';

const useStyles = makeStyles(() => ({
  spinnerWrapper: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    height: 'calc(100vh - 350px)',
  },
}));
export default function Step2({
  activeApplication, isEdit, phoneRef,
  submitted,
  campaignId,
  status,
}) {
  const formik = useFormikContext();

  const classes = useStyles();
  const { step1: { type } } = formik.values;

  const triggerResp = useQuery(triggerEventsByApplicationIDQuery, {
    variables: {
      applicationId: activeApplication.id,
    },
  });
  const languagesResp = useQuery(getLanguagesQuery);
  const allLanguages = _get(
    languagesResp, 'data.audiences', [],
  );
  if (triggerResp.loading || languagesResp.loading) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  return getTabContentByType(type, {
    triggers: triggerResp.data,
    allLanguages,
    isEdit,
    phoneRef,
    submitted,
    platform: activeApplication.platform,
    activeApplication,
    campaignId,
    status,
  });
}
