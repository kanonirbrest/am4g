import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveButton from 'components/RemoveButton';
import Arrow from 'assets/icons/Arrow';
import { languageAccordionStyles } from 'utils/styles/common';
import InputList from './InputList';
import { UNCHECK_OFFER_MESSAGE } from '../constant';

const useStyles = makeStyles(() => ({
  modernized: {
    marginRight: '10px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  ...languageAccordionStyles,
  root: {
    ...languageAccordionStyles.root,
    background: '#fff',
  },
}));

export default ({
  offer, onRemove: onRemoveOffer,
  initialOfferValues,
  index,
  onOfferChange,
  onResetOfferField,
  setExpand,
  expand,
  offerKey,
}) => {
  const classes = useStyles();

  const onRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window// eslint-disable-line no-alert
      .confirm(UNCHECK_OFFER_MESSAGE)) {
      onRemoveOffer(offerKey);
    }
  };
  const onArrowClick = () => {
    let offerItems = expand.offers;
    if (!offerItems.includes(offerKey)) {
      offerItems = [...offerItems, offerKey];
    } else {
      offerItems = offerItems.filter((o) => o !== offerKey);
    }

    setExpand((v) => ({
      ...v,
      offers: offerItems,
    }));
  };

  return (
    <Accordion
      classes={{
        root: classes.root,
        expanded: classes.expanded,
      }}
      expanded={expand.offers.includes(offerKey)}
    >
      <AccordionSummary
        expandIcon={<Arrow />}
        aria-controls="panel1a-content"
        classes={{
          content: classes.content,
          root: classes.summaryRoot,
        }}
        onClick={onArrowClick}
      >
        <div className={classes.title}>
          <span className={classes.modernized}>
            {offer.identifier}
          </span>
        </div>
        <div className={classes.buttonsContainer}>
          <RemoveButton onClick={onRemove} />
        </div>
      </AccordionSummary>
      <AccordionDetails classes={{
        root: classes.detailsRoot,
      }}
      >
        <InputList
          offer={offer}
          initialOfferValues={initialOfferValues}
          index={index}
          onOfferChange={onOfferChange}
          onResetOfferField={onResetOfferField}
        />
      </AccordionDetails>
    </Accordion>
  );
};
