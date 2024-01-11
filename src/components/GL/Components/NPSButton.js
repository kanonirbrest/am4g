import React from 'react';

import {
  getAnalyticActionParams, getButtonType, getOpenPageAction, hasCloseAction,
} from '../utils';
import { style } from '../style';

const NPSButton = ({
  itemKey: key, f, pages,
}) => {
  const openPageAction = getOpenPageAction(f);
  const analyticParams = getAnalyticActionParams(f);

  const dataProps = {
    ...(openPageAction && { 'data-destination': openPageAction.value }),
    ...analyticParams,
  };

  return (
    <button
      data-close={hasCloseAction(f)}
      data-index={f.index}
        /* eslint-disable react/button-has-type */
      type={getButtonType(f)}
      data-currentpage={f.page}
      data-pages={JSON.stringify(pages)}
      disabled
      class="nps-button"
      style={{
        borderRadius: `${f.cutRound}px`,
        fontWeight: f.fontWeight,
        fontSize: `${f.fontSize}px`,
        color: f.color,
        textAlign: f.alignment,
        backgroundColor: f.backgroundColor,
        fontFamily: `${f.fontFamily}`,
        ...(f.showShadow && { boxShadow: '0px 2px 4px rgba(22, 68, 143, 0.25)' }),
        ...style.button,
      }}
      data-key={key}
      id={key}
      {...dataProps}
    >
      {f.text}
    </button>
  );
};

export default NPSButton;
