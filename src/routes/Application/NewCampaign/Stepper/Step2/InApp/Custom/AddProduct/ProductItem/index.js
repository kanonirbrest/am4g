import * as React from 'react';
import { makeStyles } from '@mui/styles';
import _get from 'lodash.get';
import Accordion from '@mui/material/Accordion';
import cn from 'classnames';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useFormikContext } from 'formik';

import SelectedProductsContext from 'contexts/Products';
import { checkKeyEvent } from 'utils';
import Arrow from 'assets/icons/Arrow';
import RemoveButton from 'components/RemoveButton';
import InputChanged from 'assets/icons/InputChanged';
import { languageAccordionStyles } from 'utils/styles/common';
import Modernized from 'assets/icons/Modernized';
import useProduct from 'hooks/useProduct';
import OfferStateContext from 'contexts/OfferState';
import { rmvOfferValueForAllLanguages } from 'utils/languageUtils';
import { buildOfferKey } from 'utils/OfferUtils';
import ProductDetails from './Details';
import { UNCHECK_OFFER_MESSAGE } from './constant';

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
}));

export default ({
  setForceEditorUpdate,
  productId,
  isChanged,
  indexInAllProducts,
  expanded,
}) => {
  const formik = useFormikContext() ?? {};
  const [expand, setExpand] = React.useState({ expanded, offers: [] });
  const classes = useStyles();
  const { offerOptions, setOfferOptions, setOffers } = React.useContext(OfferStateContext);
  const {
    allProducts,
    setAllProducts,
    initialProductValues,
  } = React.useContext(SelectedProductsContext);
  const initialSessionProduct = React.useRef(null);
  // to update uncontrolled inputs
  React.useEffect(() => {
    // to compare with initial state if changes was made and
    // show notifications in modal
    initialSessionProduct.current = JSON.stringify(allProducts);
  }, []);
  const {
    onRemoveProduct,
    onProductChange,
    onResetProduct,
    onResetProductField,
    onRemoveOffer,
    onOfferChange,
    onResetOfferField,
    reInitProduct,
  } = useProduct({
    indexInAllProducts,
    initialProductValues,
    productId,
    formik,
    setAllProducts,
    allProducts,
    setForceEditorUpdate,
  });

  const onSelect = (value) => {
    const currentOffers = formik.values.step2.products[productId].offers || [];
    if (currentOffers.includes(value)) {
      if (window// eslint-disable-line no-alert
        .confirm(UNCHECK_OFFER_MESSAGE)) {
        setOfferOptions((ops) => ops.filter((o) => o.value !== value));
        const languages = rmvOfferValueForAllLanguages(
          _get(formik.values, 'step2.languages'), value,
        );
        formik.setFieldValue('step2.languages', languages);
        setOffers((offers) => offers.filter((o) => o !== value));
        formik.setFieldValue('step2.products', {
          ...formik.values.step2.products,
          [productId]: {
            ...formik.values.step2.products[productId],
            offers: currentOffers.filter((v) => v !== value),
          },
        });
      }
    } else {
      const offerIdent = value.split('&')[1];
      const offer = allProducts[indexInAllProducts].offers
        .find((o) => o.identifier === offerIdent);
      setOfferOptions([...offerOptions, {
        label: `${offer.identifier} (${allProducts[indexInAllProducts]?.title})`,
        value: buildOfferKey(offer?.identifier, productId),
        productId,
        type: offer.type,
      }]);

      formik.setFieldValue('step2.products', {
        ...formik.values.step2.products,
        [productId]: {
          ...formik.values.step2.products[productId],
          offers: [...currentOffers, value],
        },
      });
    }
  };

  return (
    <Accordion
      classes={{
        root: cn(classes.root),
        expanded: classes.expanded,
      }}
      expanded={expand.expanded}
    >
      <AccordionSummary
        expandIcon={<Arrow />}
        aria-controls="panel1a-content"
        classes={{
          content: classes.content,
          root: classes.summaryRoot,
        }}
        onClick={() => {
          setExpand((prevState) => ({
            expanded: !prevState.expanded,
            offers: prevState.offers,
          }));
        }}
      >
        <div className={classes.title}>
          <span className={classes.modernized}>
            {formik.values.step2.products[productId].alias}
          </span>
          {isChanged && <Modernized />}
        </div>
        <div className={classes.buttonsContainer}>
          {isChanged && (
          <div
            role="button"
            title="reset"
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            onKeyDown={checkKeyEvent((e) => onResetProduct(e))}
            onClick={(e) => onResetProduct(e)}
          >
            <InputChanged />
          </div>
          )}
          <RemoveButton onClick={(e) => onRemoveProduct(e)} />
        </div>
      </AccordionSummary>
      <AccordionDetails classes={{
        root: classes.detailsRoot,
      }}
      >
        <ProductDetails
          key={reInitProduct}
          allProducts={allProducts}
          activeProductId={productId}
          onChange={onProductChange}
          offers={formik.values.step2.products[productId].offers}
          onResetProductField={onResetProductField}
          indexInAllProducts={indexInAllProducts}
          initialProductValues={initialProductValues.current[indexInAllProducts]}
          onRemoveOffer={onRemoveOffer}
          onOfferChange={onOfferChange}
          onResetOfferField={onResetOfferField}
          onSelect={onSelect}
          expand={expand}
          setExpand={setExpand}
        />
      </AccordionDetails>
    </Accordion>
  );
};
