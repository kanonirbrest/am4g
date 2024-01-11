import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';

import { getObjectFitValue } from 'utils/campaignUtils';
import { style } from '../style';
import {
  getAnalyticActionParams,
  getButtonType,
  getOnClickString,
  getOpenPageAction,
  hasCloseAction,
} from '../utils';

const useStyles = makeStyles(() => style);

const Title = ({
  itemKey: key, pages, f,
}) => {
  const classes = useStyles();

  const onClickString = getOnClickString(f, pages, key);
  const openPageAction = getOpenPageAction(f);
  const analyticEventsMap = getAnalyticActionParams(f);
  const dataProps = {
    ...(openPageAction && { 'data-destination': openPageAction.value }),
    ...analyticEventsMap,
  };

  return (
    <button
      style={{
        height: '100%',
        width: '100%',
      }}
      data-child="image"
      data-onclick={onClickString}
      data-key={key}
      id={key}
      data-pages={JSON.stringify(pages)}
      data-close={hasCloseAction(f)}
        /* eslint-disable react/button-has-type */
      type={getButtonType(f)}
      data-currentpage={f.page}
      data-index={f.index}
      className={cn(classes.resetBtn, classes.ignorePreviewClick)}
      {...dataProps}
    >
      <div style={{
        /* added this div to handle issue with old ios versions
          * https://stackoverflow.com/a/44250830 */
        height: '100%',
        width: '100%',
      }}
      >
        {f.backgroundValue && (
        <img
          draggable="false"
          alt="uploaded"
          src={f.backgroundValue}
          style={{
            borderRadius: `${f.cutRound}px`,
            objectFit: getObjectFitValue(f.imageFit),
            ...style.image,
          }}
        />
        )}
      </div>
    </button>
  );
};

export default Title;
