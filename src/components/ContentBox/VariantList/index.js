import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import { preventAction } from 'utils';
import {
  copyFromVariant, removeVariant, renameVariant,
} from 'utils/variantUtils';
import { MAX_VARIANTS } from 'utils/constants/campaign';
import Variant from './Variant';

const useStyles = makeStyles(() => ({
  variants: {
    display: 'flex',
  },
}));

export default ({
  variants = [],
  setActiveVariant,
  activeVariant,
  languages,
  setValue,
  locale,
  errorList,
  removeVariantCallback,
  isVariantActionsDisabled,
}) => {
  const classes = useStyles();
  const [renameItem, setRenameItem] = useState(null);
  const [error, setError] = useState(false);

  const onRemoveVariant = (target) => {
    setValue('step2.languages', removeVariant(target, languages)).then(() => {
      removeVariantCallback(target);
    });
  };
  const onRenameVariantAndReturnError = (index, name) => {
    const newVariants = renameVariant(index, name, languages, locale);

    if (newVariants.result) {
      setValue('step2.languages', newVariants.result);
      setRenameItem(null);

      return null;
    }
    setError(newVariants.error);

    return newVariants.error;
  };
  const onCopyVariant = (variantName) => {
    setValue('step2.languages', copyFromVariant(variantName, languages));
  };

  if (variants?.length < 1) {
    return null;
  }

  const variantsView = variants
    .map((variant, index) => {
      const menuItems = [
        {
          title: 'Rename',
          onClick: (e) => {
            preventAction(e);
            setRenameItem(index);
          },
        },
        {
          title: 'Create copy',
          onClick: (e) => {
            preventAction(e);
            onCopyVariant(variant.name);
            setActiveVariant(variants.length);
          },
          disabled: variants.length > MAX_VARIANTS,
        },
        {
          title: 'Remove',
          onClick: (e) => {
            preventAction(e);
            if (activeVariant === index) {
              if (index >= 1) {
                setActiveVariant(index - 1);
              } else {
                setActiveVariant(0);
              }
            }
            onRemoveVariant(index);
          },
        },
      ];

      return (
        <Variant
          key={variant.name}
          menuItems={menuItems}
          index={index}
          error={errorList.includes(index)}
          setActiveVariant={setActiveVariant}
          name={variant.name}
          isActive={activeVariant === index}
          isEdit={renameItem === index}
          onRenameVariant={onRenameVariantAndReturnError}
          renameError={error}
          isVariantActionsDisabled={isVariantActionsDisabled}
        />
      );
    });

  return (
    <div className={classes.variants}>
      {variantsView}
    </div>
  );
};
