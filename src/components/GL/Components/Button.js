import React from 'react';
import { makeStyles } from '@mui/styles';

import { isArraysContain } from 'utils/arrayUtils';
import AllProductsContext from 'contexts/Products';
import OfferStateContext from 'contexts/OfferState';
import {
  getAnalyticActionParams,
  getButtonType,
  getOnClickString,
  getOpenPageAction,
  hasCloseAction,
  parseTemplateVariable,
} from '../utils';
import { style } from '../style';

const useStyles = makeStyles(() => (style));

const Button = ({
  f, pages = [], itemKey: key,
}) => {
  const classes = useStyles();
  const {
    allProducts,
  } = React.useContext(AllProductsContext);
  const {
    offers,
  } = React.useContext(OfferStateContext);
  let eligibleIndex = f.text.findIndex((t) => isArraysContain(t.offers, offers));
  if (eligibleIndex === -1) {
    // show default variant
    eligibleIndex = 0;
  }

  const onClickString = getOnClickString(f, pages, key);

  const openPageAction = getOpenPageAction(f);
  const analyticEventsMap = getAnalyticActionParams(f);
  const dataProps = {
    ...(openPageAction && { 'data-destination': openPageAction.value }),
    ...analyticEventsMap,
  };

  return (
    <button
        /* eslint-disable react/button-has-type */
      type={getButtonType(f)}
      data-onclick={onClickString}
      data-close={hasCloseAction(f)}
      data-currentpage={f.page}
      data-pages={JSON.stringify(pages)}
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
        whiteSpace: 'pre',
        overflow: 'hidden',
      }}
      data-key={key}
      id={key}
      className={`${classes.ignorePreviewClick} multiple`}
      {...dataProps}
    >
      {f.text.map((t, index) => {
        const text = parseTemplateVariable(t.text, allProducts);

        return (
          <span
            key={t.id}
            className={index === eligibleIndex ? classes.visible : classes.unVisible}
            dangerouslySetInnerHTML={{ __html: text }} // eslint-disable-line
          />
        );
      })}
    </button>
  );
};

export default React.memo(Button);
