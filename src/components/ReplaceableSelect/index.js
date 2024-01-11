import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';

import Change from 'assets/icons/Change';
import { getIconByType } from 'utils/campaignUtils';
import FormikSelect from 'components/FormControls/Select';
import CAMPAIGN_TYPE_OPTIONS
  from 'routes/Application/NewCampaign/Stepper/Step1/Tabs/constant';
import Label from './Label';

const useStyles = makeStyles(() => {
  const rootSt = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  };

  return {
    root: {
      ...rootSt,
    },
    select: {
      minWidth: 220,
      background: '#fff',
    },
    selectControl: {
      flexDirection: 'column',
      marginLeft: '10px',
      alignItems: 'start',
    },
    rootReversed: {
      ...rootSt,
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
    },
    container: {
      display: 'flex',
      alignItems: 'flex-end',
    },
  };
});

export default function ReplaceableSelect({
  config:
{ sourceType, targetType },
  disabled,
}) {
  const classes = useStyles();
  const [source, setSource] = useState(
    () => CAMPAIGN_TYPE_OPTIONS[sourceType][0].value,
  );
  const [target, setTarget] = useState(
    () => CAMPAIGN_TYPE_OPTIONS[targetType][0].value,
  );
  const [isReversed, setIsReversed] = useState(false);
  const SourceIcon = getIconByType(source);
  const TargetIcon = getIconByType(target);

  return (
    <div className={isReversed ? classes.rootReversed : classes.root}>
      <div className={classes.container}>
        <SourceIcon />
        <FormikSelect
          value={source}
          label={<Label value={sourceType} />}
          onChange={(e) => {
            setSource(e.target.value);
          }}
          classes={{
            select: classes.select,
            control: classes.selectControl,
          }}
          disabled={disabled}
          options={CAMPAIGN_TYPE_OPTIONS[sourceType]}
        />
      </div>

      <IconButton
        onClick={() => {
          setIsReversed(!isReversed);
        }}
        aria-label="change icon"
        color="primary"
        disabled={disabled}
      >
        <Change />
      </IconButton>

      <div className={classes.container}>
        <TargetIcon />
        <FormikSelect
          label={<Label value={targetType} />}
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
          }}
          classes={{
            select: classes.select,
            control: classes.selectControl,
          }}
          disabled={disabled}
          options={CAMPAIGN_TYPE_OPTIONS[targetType]}
        />
      </div>

    </div>
  );
}
