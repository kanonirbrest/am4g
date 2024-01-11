import React from 'react';
import { makeStyles } from '@mui/styles';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import { preventAction } from 'utils';
import { removePage } from 'utils/variantUtils';
import { onCopyPage } from 'utils/pageUtils';
import ErrorLabel from 'components/StyledTabs/ErrorLabel';
import Page from './Item';

const useStyles = makeStyles(() => ({
  variants: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
const RENAME_ERROR_MESSAGE = 'Same/empty names is not allowed';
export default ({
  active,
  setActive,
  items = [],
  npsPage,
  errorList = [],
}) => {
  const classes = useStyles();
  const formik = useFormikContext() ?? {};
  const [renameItem, setRenameItem] = React.useState(null);
  const [error, setError] = React.useState(null);

  const onRemove = (target) => {
    const languages = _get(formik.values, 'step2.languages');
    const layout = _get(formik.values, 'step2.layout');
    const pages = _get(formik.values, 'step2.pages')
      .filter((p) => p.index !== target.index)
      .map((p) => {
        if (p.index > target.index) {
          return { ...p, index: p.index - 1 };
        }

        return p;
      });
    const { updatedLanguages, updateLayout } = removePage(target, languages, layout);

    formik.setFieldValue('step2.languages', updatedLanguages);
    formik.setFieldValue('step2.layout', updateLayout);
    formik.setFieldValue('step2.pages', pages);
  };
  const onRename = (ind, value) => {
    const newValue = value.trim();
    if (!newValue || items.map((p) => p.name)
      .filter((n, i) => i !== ind).includes(newValue)) {
      setError(RENAME_ERROR_MESSAGE);

      return RENAME_ERROR_MESSAGE;
    }
    const pages = formik.values.step2.pages
      .map((p, i) => {
        if (ind === i) {
          return { ...p, name: newValue };
        }

        return p;
      });
    formik.setFieldValue('step2.pages', pages);
    setRenameItem(null);

    return null;
  };

  if (items?.length < 1) {
    return null;
  }
  // TODO: add cache
  const list = items
    .map((item, index) => {
      const menuItems = [
        {
          title: 'Create copy',
          onClick: (e) => {
            preventAction(e);
            const newIndex = onCopyPage(formik, item);
            setActive(newIndex);
          },
        },
        {
          title: 'Rename',
          onClick: (e) => {
            preventAction(e);
            setRenameItem(index);
          },
        },
        {
          title: 'Remove',
          onClick: (e) => {
            preventAction(e);
            if (active === item.index) {
              if (index >= 1) {
                setActive(item.index - 1);
              } else {
                setActive(1);
              }
            }
            onRemove(item);
          },
          disabled: item.isEditDisabled,
        },
      ];
      if (npsPage === item.index) {
        // not allow copy page with nps
        menuItems.shift();
      }

      return (
        <Page
          key={item.name}
          menuItems={menuItems}
          index={index}
          setActive={() => setActive(item.index)}
          name={errorList.includes(item.index)
            ? <ErrorLabel text={item.name} /> : item.name}
          isActive={active === item.index}
          isEdit={renameItem === index}
          onRename={onRename}
          renameError={error}
        />
      );
    });

  return (
    <div className={classes.variants}>
      {list.length > 1 && list}
    </div>
  );
};
