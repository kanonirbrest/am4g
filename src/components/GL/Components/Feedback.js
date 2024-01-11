import React from 'react';
import { makeStyles } from '@mui/styles';

import { style } from '../style';

const useStyles = makeStyles(() => style);

const Feedback = ({
  itemKey: key, f,
}) => {
  const classes = useStyles();

  return (
    <textarea
      name={key}
      data-key={key}
      id={key}
      placeholder={f.text}
      data-currentpage={f.page}
      data-input
      className={`${f.opacity && 'textAreaOpacity'} ${classes.textareaControl}`}
      required={f.required}
      data-focus="this.classList.remove('textAreaOpacity')"
      rows="30"
      disabled={f.page !== 1}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        height: '100%',
        backgroundColor: f.backgroundColor,
        color: f.color,
        resize: 'none',
        fontWeight: f.fontWeight,
        fontSize: `${f.fontSize}px`,
        fontFamily: `${f.fontFamily}`,
        textAlign: f.alignment,
        borderWidth: `${f.borderSize}px`,
        borderColor: `${f.borderColor}`,
        borderRadius: `${f.cutRound}px`,
        '--placeholder-color': f.color,
        '--placeholder-vertical': `${f.placeholderPaddingVertical}px`,
        '--placeholder-horizontal': `${f.placeholderPaddingHorizontal}px`,
        padding: `${f.paddingVertical}px ${f.paddingHorizontal}px`,
      }}
    />
  );
};

export default Feedback;
