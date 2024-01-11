import React from 'react';
import { useFormikContext } from 'formik';

import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import { makeStyles } from '@mui/styles';
import FormikAutocomplete from 'components/FormControls/Autocomplete';
import Hint from 'components/Hint';

const useStyles = makeStyles(() => ({
  autocomplete: {
    marginRight: '15px',
    minWidth: '500px !important',
    maxWidth: '500px !important',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  startLabel: {
    color: '#6C7688',
    display: 'flex',
    fontSize: '11px',
    alignItems: 'center',
    marginRight: '10px',
    marginBottom: '5px',
  },
  row: {
    display: 'flex',
  },
}));

const scoreOptions = [{
  label: 'Promoter',
  value: 'promoters',
}, {
  label: 'Passive',
  value: 'passives',
}, {
  label: 'Detractor',
  value: 'detractors',
}];

const scoreInAppOptions = [
  ...scoreOptions, {
    label: 'No Score',
    value: 'no_scores',
  },
];
export default ({
  values,
  name,
  onRemove,
  campaignList,
}) => {
  const classes = useStyles();
  const { values: { step1: { type } } } = useFormikContext();
  const options = type.includes('TYPE_IN_APP') ? scoreInAppOptions : scoreOptions;

  const campaignOptions = campaignList
    .filter((camp) => camp.tags.includes('nps'))
    .map(({ name: campName, id }) => ({
      label: campName,
      value: id,
    }));

  return (
    <FieldContainer
      onRemove={() => onRemove(name)}
    >
      <div className={classes.wrapper}>
        <div className={classes.startLabel}>
          NPS
          {' '}
          <Hint text={(
            <div>
              NPS stands for Net Promoter Score and
              measures customer experience dividing Users
              into 3 categories: Promoter, Passive, Detractor.
              Select any NPS category and at least one
              NPS campaign user has fall in. Please read
              {' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.notion.so/
                Net-Promoter-Score-NPS-92e38d77444e46efba0419831bcd3feb"
              >
                this
              </a>
              {' '}
              for more.
            </div>
)}
          />
        </div>
        <div className={classes.row}>
          <FormikAutocomplete
            options={options}
            name={`${name}npsScores`}
            placeholder="Nps score"
            value={values.npsScores}
            required
            classes={{
              control: classes.startLabel,
              autocomplete: classes.autocomplete,
            }}
          />
          <FormikAutocomplete
            options={campaignOptions}
            name={`${name}npsCampaigns`}
            placeholder="Nps campaigns"
            value={values.npsCampaigns}
            required
            classes={{
              autocomplete: classes.autocomplete,
            }}
          />
        </div>
      </div>
    </FieldContainer>
  );
};
