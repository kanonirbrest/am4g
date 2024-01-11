import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import WithOrField from 'routes/Application/NewCampaign/Stepper/Step3/WithOrField';
import LabelWithAsterisk from 'components/LabelWithAsterisk';
import FormikRadio from 'components/FormControls/Radio';
import { getCampaignTypeLabel, getCampaignLabel } from 'utils/campaignUtils';
import FormikAutocomplete from 'components/FormControls/Autocomplete';

const useStyles = makeStyles(() => ({
  select: {
    minWidth: '620px',
  },
  selectControl: {
    marginRight: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  radioWrapper: {
    marginLeft: '5px',
    marginTop: '5px',
    display: 'flex',
  },
  highlighted: {
    fontWeight: '700',
  },
  tooltip: {
    color: '#6C7688',
    fontSize: '12px',
    fontWeight: '400',
    '&>div': {
      marginBottom: '10px',
    },
  },
  optionTitle: {
    fontSize: '12px',
    color: '#3E4554',
  },
  value: {
    fontSize: '10px',
    color: '#8D95A9',
  },
  dot: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px',
    color: '#8D95A9',
  },
  values: {
    display: 'flex',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: '12px',
    color: '#8D95A9',
  },
}));

const ImpressionCampaign = ({
  fieldName,
  campaignList,
  item,
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const options = React.useMemo(() => campaignList
    .map(({ name: triggerName, id, type }) => ({
      renderLabel: () => (
        <div>
          <div className={classes.optionTitle}>{triggerName}</div>
          <div className={classes.values}>
            <span className={classes.value}>{getCampaignTypeLabel(type)}</span>
            <div className={classes.dot}>-</div>
            <span className={classes.value}>{getCampaignLabel(type)}</span>
          </div>
        </div>
      ),
      value: id,
      label: triggerName,
    })), [campaignList.length]);
  const tooltip = (
    <div className={classes.tooltip}>
      <div className={classes.highlighted}>How it works?</div>
      <div>
        If you set up InApp campaign,
        Push and Email campaigns are not available for this filter.
      </div>
      <div>
        When setting up Email campaign,
        Multi campaign has a status
        {' '}
        <span className={classes.highlighted}>&quot;Received&quot;</span>
        {' '}
        if a push was sent.
      </div>
      <div>
        When setting up InApp campaign,
        Multi campaign has a status
        {' '}
        <span className={classes.highlighted}>&quot;Received&quot;</span>
        {' '}
        if a push was sent and InApp was shown.
      </div>
    </div>
  );

  return (
    <div className={classes.wrapper}>
      <div>
        <LabelWithAsterisk
          label="Impression Campaign ID"
          withAsterisk={false}
          tooltipText={tooltip}
        />
        <FormikAutocomplete
          options={options}
          placeholder="Select"
          name={`${fieldName}ids`}
          value={item.ids}
          isExclude={item.was === false}
        />
      </div>
      <div className={classes.radioWrapper}>
        <FormikRadio
          name={`${fieldName}was`}
          value={item.was}
          options={[
            { label: 'received', value: true },
            { label: 'not received', value: false },
          ]}
          setFieldValue={(v) => {
            setFieldValue(`${fieldName}was`, v === 'true');
          }}
        />
      </div>
    </div>
  );
};

export default ({
  name,
  values,
  ...props
}) => (
  <WithOrField
    component={ImpressionCampaign}
    name={`${name}impressionCampaign`}
    items={values.impressionCampaign}
    {...props}
  />
);
