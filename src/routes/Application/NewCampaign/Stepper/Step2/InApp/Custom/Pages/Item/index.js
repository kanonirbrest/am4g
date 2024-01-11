import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import DropdownMenu from 'components/DropdownMenu';
import { checkKeyEvent } from 'utils';
import TextField from '@mui/material/TextField';
import ErrorLabel from 'components/StyledTabs/ErrorLabel';
import editableTabsStyles from 'utils/styles/editableTabs';

const useStyles = makeStyles(() => ({
  ...editableTabsStyles,
}));

export default React.memo(({
  index,
  setActive,
  menuItems,
  name,
  isActive,
  isEdit,
  onRename,
  renameError,
  error,
  isVariantActionsDisabled = false,
}) => {
  const classes = useStyles();
  const [input, setInput] = useState(name);
  const onBlur = (e) => {
    // should return error if has
    const errorRename = onRename(index, e.target.value);

    if (errorRename) {
      e.target.focus();
    }
  };
  const onChange = (e) => {
    if (e.target.value.length > 50) {
      e.preventDefault();
      e.stopPropagation();

      return;
    }
    setInput(e.target.value);
  };

  // TODO change with div content editable
  return (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn(classes.itemWrapper, {
        [classes.item]: !isEdit,
        [classes.active]: isActive,
        [classes.editItem]: isEdit,
      })}
      style={isVariantActionsDisabled ? {
        padding: '0',
      } : {
        paddingLeft: '20px',
      }}
      key={name}
      onClick={setActive}
      onKeyPress={checkKeyEvent(setActive)}
    >
      {isEdit ? (
        <>
          <TextField
            onBlur={onBlur}
            onChange={onChange}
            autoFocus
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            value={input}
            error={!!renameError}
          />
          {renameError && <div className={classes.error}>{renameError}</div>}
        </>
      ) : (
        <>
          {error ? <ErrorLabel text={name} />
            : (
              <div
                className={classes.name}
                title={name}
              >
                {name}
              </div>
            ) }
          {!isVariantActionsDisabled && (
            <DropdownMenu
              items={menuItems}
              isHorizontal={false}
            />
          )}
        </>
      )}
    </div>
  );
});
