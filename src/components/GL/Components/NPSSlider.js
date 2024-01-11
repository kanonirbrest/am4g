import React from 'react';
import { makeStyles } from '@mui/styles';

import { style } from '../style';

const useStyles = makeStyles(() => style);

const NPSSlider = ({
  itemKey: key, inputRef, f,
}) => {
  const classes = useStyles();

  const thumbHalfWidth = inputRef.current ? ((+getComputedStyle(inputRef.current)
    .getPropertyValue('--thumb-size').split('px')[0])) / 2
    : 0;

  const totalInputWidth = inputRef.current?.clientWidth + 4 || 0;
  const defValue = f.mapper.findIndex((item) => item.default);
  const min = 1;
  const left = ((defValue / ((f.mapper.length) - min))
    * ((totalInputWidth - thumbHalfWidth)
      - thumbHalfWidth));

  return (
    <>
      {f.showIndex && (
        <output
          data-element="output"
          data-max={f.mapper.length}
          data-index={f.index}
          id="output-slider"
          style={{
            position: 'absolute',
            left,
            width: `${f.thumbSize}px`,
            fontSize: `${f.indexSize}px`,
            color: f.scoreIndexColor,
            top: `${f.scoreIndexPosition}px`,
            visibility: f.hideScore ? 'hidden' : 'visible',
          }}
          className={classes.displayProp}
        >
          {defValue}
        </output>
      )}
      <input
        ref={inputRef}
        style={{
          '--tooltip-background': f.lineColor,
          '--tooltip-thumb': f.thumbColor,
          '--thumb-size': `${f.thumbSize}px`,
          '--line-size': `${f.lineSize}px`,
          '--thumb-border': f.thumbBorder,
          '--thumb-border-size': `${f.thumbBorderSize}px`,
        }}
        min={0}
        data-mapper={JSON.stringify(f.mapper)}
        data-id={f.index}
        data-input
        data-key={key}
        id={key}
        type="range"
        name={key}
        step={1}
        /* eslint-disable-next-line  */
        className="range"
        value={defValue}
        defaultValue={defValue}
        onChange={window.onChangeInput}
        data-onchange="window.onChangeInput(this.value, this)"
        max={f.mapper.length - 1}
        data-currentpage={f.page}
      />
      <input
        style={{
          '--tooltip-background': f.lineColor,
          '--tooltip-thumb': f.thumbColor,
          '--thumb-size': `${50}px`,
          '--line-size': `${f.lineSize}px`,
          '--thumb-border': f.thumbBorder,
          '--thumb-border-size': `${20}px`,
          marginTop: `calc(-2px + -${f.lineSize}px`,
          opacity: '0',
        }}
        min={0}
        data-mapper={JSON.stringify(f.mapper)}
        data-id={f.index}
        data-key={key}
        id={key}
        /* to ignore duplicated submit, because we have 2 same inputs */
        data-ignore-submit
        data-input
        data-currentpage={f.page}
        type="range"
        name={key}
        step={1}
        className="rangeArea"
        value={defValue}
        defaultValue={defValue}
        onChange={window.onChangeInput}
        data-onchange="window.onChangeInput(this.value, this)"
        max={f.mapper.length - 1}
      />
    </>
  );
};

export default NPSSlider;
