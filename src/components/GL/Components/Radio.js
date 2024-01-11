import React from 'react';
import { makeStyles } from '@mui/styles';

import { isArraysContain } from 'utils/arrayUtils';
import AllProductsContext from 'contexts/Products';
import OfferStateContext from 'contexts/OfferState';
import { style } from '../style';
import { parseTemplateVariable } from '../utils';
import RadioPreview from '../../RadioPreview';

const useStyles = makeStyles(() => style);

const Radio = ({
  itemKey: key, f,
}) => {
  const classes = useStyles();
  const {
    allProducts,
  } = React.useContext(AllProductsContext);
  const {
    offers,
  } = React.useContext(OfferStateContext);

  return (
    <div
      className={classes.innerTextClass}
      data-key={key}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: `${f.cardsSpacing}px`,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
      id={key}
    >
      {f.buttonList.map((radioButton) => {
        let eligibleIndex = radioButton.text.findIndex((t) => isArraysContain(t.offers, offers));
        if (eligibleIndex === -1) {
          // show default variant
          eligibleIndex = 0;
        }

        const title = parseTemplateVariable(radioButton.text[eligibleIndex].title.text, allProducts);
        const subTitle = parseTemplateVariable(radioButton.text[eligibleIndex].subTitle.text, allProducts);
        const details = parseTemplateVariable(radioButton.text[eligibleIndex].details.text, allProducts);
        const subDetails = parseTemplateVariable(radioButton.text[eligibleIndex].subDetails.text, allProducts);

        return (
          <RadioPreview
            key={radioButton.id}
            values={f}
            title={{ text: title, showField: radioButton.text[eligibleIndex].title.showField }}
            subTitle={{ text: subTitle, showField: radioButton.text[eligibleIndex].subTitle.showField }}
            details={{ text: details, showField: radioButton.text[eligibleIndex].details.showField }}
            subDetails={{ text: subDetails, showField: radioButton.text[eligibleIndex].subDetails.showField }}
            productId={radioButton.actionValue.product}
            offerId={radioButton.actionValue.offer}
            offerIds={radioButton.text[eligibleIndex].offers}
            isSelected={radioButton.isSelected}
            itemValues={radioButton.isSelected ? f.selected : f}
          />
        );
      })}
    </div>
  );
};

export default Radio;
