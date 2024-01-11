import React from 'react';
import cn from 'classnames';
import Button from '@mui/material/Button';

import { makeStyles } from '@mui/styles';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles(() => ({
  button: {
    marginRight: '10px',
    marginTop: '10px',
  },
  active: {
    background: '#8D95A9',
    color: '#FFFFFF',
    border: 'none',
  },
}));

export default React.memo(({
  language, languageTab, setLanguageTab, audiences,
}) => {
  const classes = useStyles();

  return (
    <Button
      variant={BUTTON_TYPES.LANGUAGE}
      size="medium"
      text="button"
      className={cn({
        [classes.button]: true,
        [classes.active]: languageTab === language,
      })}
      onClick={() => {
        setLanguageTab(language);
      }}
    >
      {audiences
        .find((a) => a.locale === language)?.title}
    </Button>
  );
});
