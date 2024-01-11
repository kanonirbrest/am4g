import * as React from 'react';
import { makeStyles } from '@mui/styles';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFormikContext } from 'formik';

import ProductAlertContext from 'contexts/ProductAlert';
import Button from '@mui/material/Button';
import InputChanged from 'assets/icons/InputChanged';
import { BUTTON_TYPES } from 'utils/styles/common';
import Save from 'assets/icons/Save';
import AllProductsContext from 'contexts/Products';
import ProductItem from './ProductItem';
import ProductOption from './ProductOption';

const useStyles = makeStyles(() => ({
  dialog: {
    padding: '10px 0',
    minWidth: '75vw',
    minHeight: '85vh',
    maxHeight: '85vh',
    background: '#F8FAFD',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: 'white',
    padding: '30px',
    maxHeight: 'calc(85vh - 180px)',
    paddingBottom: '10px',
    borderTop: '1px solid #D8DFE8',
  },
  modalContainer: {
    overflow: 'auto',
    flexGrow: 1,
  },
  panelWrapper: {
    display: 'flex',
    flex: 1,
    marginTop: '10px',
    flexDirection: 'column',
    maxHeight: 'calc(80vh - 150px)',
    overflow: 'auto',
  },
  autocomplete: {
    display: 'flex',
  },
  close: {
    position: 'absolute',
    right: '5px',
    top: '5px',
    cursor: 'pointer',
  },
  reset: {
    textTransform: 'none',
  },
  icon: {
    marginRight: '10px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 30px 10px 30px',
    justifyContent: 'space-between',
    borderTop: '1px solid #D8DFE8',
  },
}));

export default ({
  open,
  setOpen,
  setForceEditorUpdate,
  selectedProduct,
}) => {
  const classes = useStyles();
  const formik = useFormikContext() ?? {};

  const {
    allProducts,
    setAllProducts,
    initialProductValues,
  } = React.useContext(AllProductsContext);
  const { setIsProductUpdated } = React.useContext(ProductAlertContext);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const initialSessionProduct = React.useRef(null);
  // to update uncontrolled inputs
  React.useEffect(() => {
    // to compare with initial state if changes was made and
    // show notifications in modal
    initialSessionProduct.current = JSON.stringify(allProducts);
  }, []);

  const selectedProductIds = Object.keys(formik.values.step2.products || {});
  const selectedProducts = selectedProductIds.map((id) => {
    const indexInAllProducts = allProducts.findIndex((p) => p.productId === id);
    let alias; let initialValues; let productValues;
    // eslint-disable-next-line prefer-const
    ({ alias, ...initialValues } = initialProductValues.current[indexInAllProducts]);
    // eslint-disable-next-line prefer-const,no-unused-vars
    ({ alias, ...productValues } = allProducts[indexInAllProducts]);

    return {
      productId: id,
      indexInAllProducts,
      isChanged: JSON.stringify(initialValues) !== JSON.stringify(productValues),
    };
  });

  const options = allProducts
    .map((p) => ({ label: p?.title || '', value: p?.productId }))
    .filter((p) => !selectedProductIds.includes(p?.value));

  const onInputChange = (e, v) => {
    if (!v || typeof v === 'string') return;
    setValue('');
    setInputValue('');

    formik
      .setFieldValue('step2.products', {
        ...formik.values.step2.products,
        [v.value]: {
          ...formik.values.step2.products[v.value],
          alias: v.value,
        },
      });
  };
  const onCloseModal = () => {
    if (initialSessionProduct.current !== JSON.stringify(allProducts)) {
      setIsProductUpdated(true);
    }

    setOpen(false);
  };
  const onResetAll = () => {
    const products = [...allProducts];

    selectedProducts.forEach((p) => {
      products[p.indexInAllProducts] = {
        ...initialProductValues.current[p.indexInAllProducts],
        alias: products[p.indexInAllProducts].alias,
      };

      setAllProducts(products);
    });
  };

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      onClose={onCloseModal}
      open={open}
    >
      <IconButton
        className={classes.close}
        onClick={onCloseModal}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Add Product</DialogTitle>
      <div className={classes.modalBody}>
        <Autocomplete
          multiple={false}
          classes={{
            root: classes.autocomplete,
          }}
          placeholder="enter product..."
          options={options}
          getOptionLabel={(opt) => opt?.label || ''}
          onChange={onInputChange}
          value={value}
          filterOptions={(opts, state) => opts
            .filter((o) => o.label.includes(state.inputValue)
              || o.value.includes(state.inputValue))}
          renderOption={(props, option) => (
            <ProductOption
              props={props}
              option={option}
              key={option.value}
            />
          )}
          inputValue={inputValue}
          onInputChange={(e, v) => {
            setInputValue(v);
          }}
          freeSolo
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder="Enter product..."
              {...params}
            />
          )}
        />
        <div className={classes.panelWrapper}>
          <div className={classes.modalContainer}>
            {selectedProducts.map(({ productId, isChanged, indexInAllProducts }) => (
              <ProductItem
                key={productId}
                expanded={productId === selectedProduct.current}
                setForceEditorUpdate={setForceEditorUpdate}
                productId={productId}
                isChanged={isChanged}
                indexInAllProducts={indexInAllProducts}
              />
            ))}
          </div>
        </div>
      </div>
      <footer className={classes.footer}>
        <Button
          variant={BUTTON_TYPES.WHITE}
          onClick={onResetAll}
          className={classes.reset}
        >
          <InputChanged className={classes.icon} color="#8D95A9" />
          Reset all products
        </Button>
        <Button
          variant={BUTTON_TYPES.BLUE}
          color="primary"
          onClick={() => {
            setOpen(false);
          }}
        >
          <Save className={classes.icon} />
          Save all changes
        </Button>
      </footer>
    </Dialog>
  );
};
