import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { BUTTON_TYPES } from 'utils/styles/common';
import AllProductsContext from 'contexts/Products';
import Modernized from 'assets/icons/Modernized';

const useStyles = makeStyles(() => ({
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-start',
    border: '1px solid #D8DFE8',
    padding: '10px',
    background: '#F8FAFD',
    marginBottom: '10px',
    marginRight: '10px',
    height: 'auto',
  },
  buttonTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '10px',
  },
  label: {
    fontSize: '10px',
    color: '#8D95A9',
    lineHeight: '10px',
  },
}));

export default ({
  setOpen,
  products,
  selectedProduct,
}) => {
  const classes = useStyles();

  const {
    initialProductValues,
    allProducts,
  } = React.useContext(AllProductsContext);
  const list = allProducts.map((p, index) => {
    if (Object.keys(products)
      .includes(p.productId)) {
      const { alias: _, ...allProd } = allProducts[index];
      const { alias, ...initProd } = initialProductValues.current[index];

      return {
        ...p,
        isChanged: JSON.stringify(allProd) !== JSON.stringify(initProd),
      };
    }

    return false;
  }).filter(Boolean);

  return (
    <div className={classes.productList}>
      {
        list.map((product) => {
          const isAliasChanged = product.alias !== product.productId;

          return (
            <Button
              key={product.productId}
              variant={BUTTON_TYPES.TRANSPARENT}
              classes={{ root: classes.button }}
              onClick={() => {
                setOpen(true);
                // eslint-disable-next-line no-param-reassign
                selectedProduct.current = product.productId;
              }}
            >
              <div className={classes.buttonTitle}>
                <div>
                  {isAliasChanged ? product.alias : product.title}
                </div>
                {isAliasChanged && (
                <div className={classes.label}>
                  {product.title}
                </div>
                )}
                <div className={classes.label}>
                  {product.productId}
                </div>
              </div>
              {product.isChanged && (
                <span style={{ marginLeft: '5px', display: 'flex' }}>
                  <Modernized />
                </span>
              )}
            </Button>
          );
        })
      }
    </div>
  );
};
