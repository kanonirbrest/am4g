import React from 'react';
import { makeStyles } from '@mui/styles';

import LanguageButton
  from 'routes/Application/NewCampaign/Stepper/TestPush/LanguageButton';

const useStyles = makeStyles(() => ({
  languages: {
    marginBottom: '20px',
  },
  label: {
    color: '#6C7688',
    fontSize: '11px',
  },
}));

export default ({
  setLanguageTab, audiencesData,
  languageTab, languages,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.label}>Preview language</div>
      <div className={classes.languages}>
        {Object.keys(languages)
          .map((language) => (
            <LanguageButton
              key={language}
              audiences={audiencesData.audiences}
              setLanguageTab={setLanguageTab}
              languageTab={languageTab}
              language={language}
            />
          ))}
      </div>
    </>
  );
};
