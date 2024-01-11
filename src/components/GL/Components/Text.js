import React from 'react';
import { makeStyles } from '@mui/styles';

import { isArraysContain } from 'utils/arrayUtils';
import AllProductsContext from 'contexts/Products';
import OfferStateContext from 'contexts/OfferState';
import { style } from '../style';
import { parseTemplateVariable } from '../utils';

const useStyles = makeStyles(() => style);

const Text = ({
  itemKey: key, f,
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

  return (
    <div
      style={{
        ...style.innerText,
        overflow: 'hidden',
      }}
      className={classes.innerTextClass}
      class="multiple"/* to find element in mobile view */
      data-key={key}
      id={key}
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
    </div>
  );
};

export default Text;
