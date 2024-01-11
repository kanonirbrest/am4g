import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';
import Switch from '@mui/material/Switch';

import OfferStateContext from 'contexts/OfferState';
import RemoveButton from 'components/RemoveButton';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import {
  removeOfferRadio, updOfferForAllLanguages,
  updDarkMode, handleSelectDefault,
  handleChooseProduct,
  handleChooseOffer,
} from 'utils/RadioWidget/utils';
import Hint from 'components/Hint';
import ChipSelect from 'components/FormControls/ChipSelect';
import FormikSelect from 'components/FormControls/Select';
import LabelWithAsterisk from 'components/LabelWithAsterisk';
import SingleRadio from 'components/FormControls/SingleRadio';
import { ReactComponent as Condition } from 'assets/icons/Condition.svg';
import FormikCheckbox from 'components/FormControls/Checkbox';
import AllProductsContext from 'contexts/Products';
import ApplicationContext from 'contexts/Application';
import { OFFER_TYPE, PLATFORM } from 'utils/constants';
import EditorItem from './EditorItem';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #D8DFE8',
    marginBottom: '10px',
    padding: '10px 0',
  },
  variantRow: {
    fontSize: '14px',
  },
  editorError: {
    '& .tox-editor-container': {
      border: '1px solid red',
    },
  },
  switcher: {
    color: '#6C7688',
    marginLeft: 'auto',
    fontSize: '12px',
    marginTop: '5px',
  },
  textLabel: {
    color: '#6C7688',
    fontSize: '14px',
    textAlign: 'start',
  },
  conditionsLabel: {
    fontSize: '11px',
    color: '#6C7688',
    width: '100%',
    borderBottom: '1px solid #D8DFE8',
    textAlign: 'start',
    paddingBottom: '15px',
  },
  selectOffer: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px 12px 20px',
    borderBottom: '1px solid #D8DFE8',
  },
  offerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#6C7688',
    fontSize: '12px',
    fontWeight: 500,
    marginLeft: '20px',
    marginRight: '20px',
  },
  text: {
    margin: '0 0 0 10px',
  },
  editorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editorLabel: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  body: {
    padding: '10px 20px',
  },
  editorContainer: {
    padding: '0px 20px',
  },
  offer: {
    ...deviceControlStyles.label,
    marginTop: '10px',
  },
}));
const EDITOR_MODE = {
  DESIGN: 'design',
  READONLY: 'readonly',
};
const Label = ({
  onChange, name, value, label,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.editorHeader}>
      <span className={classes.editorLabel}>
        {label}
      </span>
      <div>
        <FormikCheckbox
          name={`${name}title.showField`}
          label="Show field"
          onChange={onChange}
          checked={!!value}
        />
      </div>
    </div>
  );
};
export default ({
  activeFieldIndex,
  name,
  textName,
  values,
  actionProps,
  editorRef,
  offerIndex,
  buttonIndex,
}) => {
  const { values: formikValues, setFieldValue } = useFormikContext() ?? {};
  const application = React.useContext(ApplicationContext);
  const classes = useStyles();
  const {
    offerOptions,
  } = React.useContext(OfferStateContext);
  const {
    allProducts,
  } = React.useContext(AllProductsContext);
  const selectedProductIds = Object.keys(formikValues.step2.products || {});
  const options = React.useMemo(() => allProducts
    .map((p) => ({
      label: `${p?.title} (${p.productId})`,
      value: p?.productId,
    }))
    .filter((p) => selectedProductIds.includes(p?.value)),
  [selectedProductIds.length, allProducts.length]);
  const onSelectOffers = (offers) => {
    const langs = updOfferForAllLanguages(
      formikValues.step2.languages, activeFieldIndex, buttonIndex, offerIndex, offers,
    );
    setFieldValue('step2.languages', langs);
  };
  const onRemoveOffer = () => {
    const langs = removeOfferRadio(
      formikValues.step2.languages, activeFieldIndex, buttonIndex, offerIndex,
    );
    setFieldValue('step2.languages', langs);
  };
  const changeBackground = (checked) => {
    const langs = updDarkMode(
      formikValues.step2.languages, activeFieldIndex, buttonIndex, checked,
    );

    setFieldValue('step2.languages', langs);
  };
  const changeDefaultSelect = () => {
    const langs = handleSelectDefault(
      formikValues.step2.languages, activeFieldIndex, buttonIndex,
    );

    setFieldValue('step2.languages', langs);
  };
  const handleChange = (e, n) => {
    /* is all langs? */
    setFieldValue(n, e.target.checked);
  };
  const button = values.buttonList[buttonIndex];
  const offerOps = React.useMemo(() => [{ label: 'no offer', value: '' },
    ...offerOptions
      .filter((o) => button.actionValue.product === o.productId
            && (o.type !== OFFER_TYPE.INTRO
                || application.platform === PLATFORM.ANDROID
            )),
  ], [offerOptions, button.actionValue.product]);

  return (
    <div className={cn(classes.container)}>
      {offerIndex === 0 && (
      <>
        <div className={classes.topBar}>
          <div>
            <SingleRadio
              name={`${name}.isSelected`}
              value={values.isSelected}
              label="Selected card by default"
              onChange={(event) => changeDefaultSelect(event.target.checked)}
            />
          </div>
          <div className={classes.switcher}>
            <Switch
              checked={button.darkBackground}
              onChange={(event) => changeBackground(event.target.checked)}
              size="small"
            />
            {' '}
            Show text on dark background
          </div>
        </div>
        <div className={classes.body}>
          <LabelWithAsterisk label="Choose Product" />
          <FormikSelect
            value={button.actionValue.product}
            name={`${name}.actionValue.product`}
            options={options}
            onChange={(e) => {
              const langs = handleChooseProduct(
                formikValues.step2.languages, activeFieldIndex, buttonIndex, { product: e.target.value },
              );

              setFieldValue('step2.languages', langs);
            }}
            placeholder="Choose Product"
            /* TODO: actionProps? */
          />
          {!!button.actionValue?.product && (
            <>
              <div
                className={classes.offer}
              >
                Choose promo offer applied in case of eligibility
                <Hint text="If eligible, user will be able to purchase a offer,
          otherwise will be initialized the purchase of the main (base) product"
                />
              </div>
              <FormikSelect
                value={button.actionValue?.offer || ''}
                name={`${name}.actionValue.offer`}
                options={offerOps}
                onChange={(e) => {
                  const langs = handleChooseOffer(
                    formikValues.step2.languages, activeFieldIndex, buttonIndex, e.target.value,
                  );

                  setFieldValue('step2.languages', langs);
                }}
                placeholder="Select promo offer"
                {...actionProps}
              />
            </>
          )}
        </div>
      </>
      )}
      {offerIndex !== 0 && (
      <>
        <div className={classes.offerHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Condition />
            <p className={classes.text}>
              Radio Card
              {' '}
              {buttonIndex + 1}
              {' '}
              - Offer Condition
              {' '}
              {offerIndex}
            </p>
          </div>

          <RemoveButton
            onClick={onRemoveOffer}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.selectOffer}>
            <div className={classes.conditionsLabel}>
              Display offer conditions:
              {' '}
              <Hint text="Select here offer(s). If user is eligible to the conditions,
                he will see the content you add here. If not, he will see a base text. "
              />
            </div>
            <div>
              <ChipSelect
                onSelect={onSelectOffers}
                values={button.text[offerIndex].offers}
                options={offerOptions}
                title="Add offer"
              />
            </div>
          </div>
        </div>
      </>
      )}
      <div ref={editorRef} className={classes.editorContainer}>
        <Label
          onChange={(e) => {
            handleChange(e, `${textName}.title.showField`);
          }}
          name={`${name}title.showField`}
          value={button.text[offerIndex].title.showField}
          label="Title"
        />
        <EditorItem
          name={`${textName}.title.text`}
          values={values}
          index={activeFieldIndex}
          actionProps={actionProps}
          mode={button.text[offerIndex].title.showField
            ? EDITOR_MODE.DESIGN : EDITOR_MODE.READONLY}
          darkBackground={button.darkBackground}
          withBorder={false}
          buttonIndex={buttonIndex}
        />
        <Label
          onChange={(e) => {
            handleChange(e, `${textName}.subTitle.showField`);
          }}
          name={`${name}subTitle.showField`}
          value={button.text[offerIndex].subTitle.showField}
          label="Sub Title"
        />
        <EditorItem
          name={`${textName}.subTitle.text`}
          values={values}
          index={activeFieldIndex}
          actionProps={actionProps}
          mode={button.text[offerIndex].subTitle.showField
            ? EDITOR_MODE.DESIGN : EDITOR_MODE.READONLY}
          darkBackground={button.darkBackground}
          withBorder={false}
          buttonIndex={buttonIndex}
        />
        <Label
          onChange={(e) => {
            handleChange(e, `${textName}.details.showField`);
          }}
          name={`${name}details.showField`}
          value={button.text[offerIndex].details.showField}
          label="Details"
        />
        <EditorItem
          name={`${textName}.details.text`}
          values={values}
          index={activeFieldIndex}
          actionProps={actionProps}
          mode={button.text[offerIndex].details.showField
            ? EDITOR_MODE.DESIGN : EDITOR_MODE.READONLY}
          darkBackground={button.darkBackground}
          withBorder={false}
          buttonIndex={buttonIndex}
        />
        <Label
          onChange={(e) => {
            handleChange(e, `${textName}.subDetails.showField`);
          }}
          name={`${name}subDetails.showField`}
          value={button.text[offerIndex].subDetails.showField}
          label="Sub Details"
        />
        <EditorItem
          name={`${textName}.subDetails.text`}
          values={values}
          index={activeFieldIndex}
          actionProps={actionProps}
          mode={button.text[offerIndex].subDetails.showField
            ? EDITOR_MODE.DESIGN : EDITOR_MODE.READONLY}
          darkBackground={button.darkBackground}
          buttonIndex={buttonIndex}
        />
      </div>
    </div>
  );
};
