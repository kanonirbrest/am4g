import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import Button from '@mui/material/Button';

import VariantList from 'components/ContentBox/VariantList';
import ButtonMenu from 'components/ButtonMenu';
import {
  addVariant, copyFromVariant, createVariant,
} from 'utils/variantUtils';
import { MAX_VARIANTS } from 'utils/constants/campaign';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles(() => ({
  root: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.4)',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  box: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: '#F8FAFD',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottom: '1px solid #D8DFE8',
    fontWeight: '500',
    justifyContent: 'space-between',
  },
}));

export default ({
  label,
  children,
  classes: propClasses = {},
  variants = [],
  setActiveVariant,
  activeVariant,
  languages,
  setValue,
  locale,
  errorList = [],
  removeVariantCallback,
  isVariantActionsDisabled,
}) => {
  const classes = useStyles();

  const onCreateVariant = () => {
    setValue('step2.languages', createVariant(languages));
  };
  const onAddVariant = () => {
    setValue('step2.languages', addVariant(languages));
    /* to handle situation when field was touched => removed =>
    added again and touched field preserve touched state */
    setActiveVariant(languages[locale].length);
  };
  const onCopyFromVariant = (variantName) => {
    setValue('step2.languages', copyFromVariant(variantName, languages));
  };

  const addMenuItems = [{
    text: 'Add new variant',
    onClick: onAddVariant,
  }, ...variants.map((variant) => ({
    text: `Copy from ${variant.name}`,
    name: variant.name,
    onClick: () => {
      onCopyFromVariant(variant.name);
      setActiveVariant(variants.length);
    },
  }))];

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>{label}</div>
        {variants.length > 1 && (
        <VariantList
          variants={variants}
          setActiveVariant={setActiveVariant}
          activeVariant={activeVariant}
          languages={languages}
          setValue={setValue}
          locale={locale}
          errorList={errorList}
          removeVariantCallback={removeVariantCallback}
          isVariantActionsDisabled={isVariantActionsDisabled}
        />
        )}
        {/* eslint-disable-next-line no-nested-ternary */}
        {!isVariantActionsDisabled ? (variants?.length > 1 ? (
          <ButtonMenu
            menuItems={addMenuItems}
            disabled={variants?.length > MAX_VARIANTS}
            active={activeVariant}
            buttonTitle="+ Add variant"
          />
        )
          : (
            <Button
              onClick={onCreateVariant}
              variant={BUTTON_TYPES.TRANSPARENT}
            >
              Create variants
            </Button>
          )
        ) : <div />}
      </div>

      <div className={cn(classes.box, propClasses.box)}>
        {children}
      </div>
    </div>
  );
};
