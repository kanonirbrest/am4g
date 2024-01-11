import React from 'react';
import { makeStyles } from '@mui/styles';

import LabelWithAsterisk from 'components/LabelWithAsterisk';
import ContentBox from 'components/ContentBox';
import FormikTabRadio from 'components/FormControls/FormikTabRadio';
import SingleTypingAutocomplete from 'components/FormControls/Autocomplete';
import Repeated
  // eslint-disable-next-line max-len
  from 'routes/Application/NewCampaign/Stepper/Step2/InApp/Custom/RepeatTabsContent/Repeated';
import { getIntersections } from 'utils/arrayUtils';
import Blacklist from 'components/Warnings/Blacklist';
import Warning from './Warning';

const useStyles = makeStyles(() => ({
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formControl: {
    width: '640px',
    alignItems: 'normal',
    textAlign: 'start',
    marginBottom: '15px',
  },
  wrapper: {
    marginBottom: '20px',
  },
  autocomplete: {
    width: '600px',
    alignItems: 'start',
  },
  inter: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px',
  },
  inputLabel: {
    fontSize: '14px',
    color: '#3E4554',
  },
  textField: {
    width: '120px',
    margin: '0 10px',
  },
  addButton: {
    textAlign: 'start',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: '0px',
    },
  },
  limit: {
    display: 'flex',
    alignItems: 'center',
  },
  removeBtn: {
    marginLeft: '10px',
  },
}));

const inters = ['Cached', 'Instant'];

export default ({
  formik,
  triggers = {},
  activeApplication,
}) => {
  const classes = useStyles();
  const triggerOptions = triggers.trigger_events.map(({ name: triggerName }) => ({
    label: triggerName,
    value: triggerName,
  }));
  const blacklist = React.useMemo(() => (getIntersections(
    activeApplication.blacklistLocal, formik.values.step2.inters.spots,
  )), [activeApplication.id, formik.values.step2.inters.spots.length]);

  return (
    <ContentBox label="DELIVERY">
      <LabelWithAsterisk
        label="Type of interstitials"
        withAsterisk={false}
      />
      <FormikTabRadio
        options={inters
          .map((v) => ({
            label: v,
            value: v.toLowerCase(),
          }))}
        value={formik.values.step2.inters.type}
        onChange={(v) => {
          formik.setFieldValue('step2.inters.type', v);
        }}
        error={null}
        bpHeight="24px !important"
      />
      <LabelWithAsterisk
        label="Spots"
        withAsterisk
        wrapperStyles={{
          marginBottom: 0,
          marginTop: '15px',
        }}
      />
      <SingleTypingAutocomplete
        options={triggerOptions}
        placeholder="Add spots"
        name="step2.inters.spots"
        value={formik.values.step2.inters.spots}
        classes={{
          control: classes.autocomplete,
        }}
        required
      />
      {formik.values.step2.inters.spots.map((trigger) => (
        <Warning
          key={trigger}
          currentId={formik.values.id}
          trigger={trigger}
          activeApplication={activeApplication}
        />
      ))}
      {blacklist && (
      <Blacklist
        trigger={blacklist.join(', ')}
      />
      )}
      <div className={classes.inter}>
        <Repeated
          name="step2.triggering."
          values={formik.values.step2.triggering}
        />
      </div>
    </ContentBox>
  );
};
