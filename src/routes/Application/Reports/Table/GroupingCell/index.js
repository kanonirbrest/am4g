import React from 'react';
import KeyboardArrowRightTwoTone from '@mui/icons-material/KeyboardArrowRightSharp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { makeStyles } from '@mui/styles';

import { UNASSIGNED_LABEL } from 'utils/constants';
import Hint from 'components/Hint';
import { checkKeyEvent } from 'utils';
import _get from 'lodash.get';

const useStyles = makeStyles(() => ({
  bold: { fontWeight: 'bold' },
  wrapper: { fontWeight: 'bold', display: 'flex', alignItems: 'center' },
  button: { height: '20px', cursor: 'pointer' },
  label: { marginLeft: '5px' },
}));

const hintText = (
  <div>
    The percentage of users who didn&apos;t fall into variant distribution.
    {' '}
    <a
      href="https://www.notion.so/apalon/Unassigned-32f2692a47004ebfa3685117a8bd6603"
      target="_blank"
      rel="noreferrer"
    >
      Learn why
    </a>
  </div>
);

export default ({
  value, id, field, rowNode,
  api,
}) => {
  const classes = useStyles();

  const handleClick = (event) => {
    api.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
    api.setCellFocus(id, field);
    event.stopPropagation();
  };
  const nullChild = _get(rowNode, 'children.0');
  const isNullVariant = _get(api
    .getRow(nullChild), 'variant') === 'null';
  // to disable arrow when we have only null variant child
  // we don't show null variant

  return (
    <div className={classes.wrapper}>
      <div
        role="button"
        tabIndex={0}
        className={classes.button}
        onClick={handleClick}
        onKeyPress={checkKeyEvent((e) => handleClick(e))}
      >
        {isNullVariant ? null : (rowNode.children?.length && (rowNode.childrenExpanded
          ? <KeyboardArrowDownIcon fontSize="small" />
          : <KeyboardArrowRightTwoTone fontSize="small" />))}
      </div>
      <div className={classes.label}>
        {value}
        {value === UNASSIGNED_LABEL && (
        <Hint
          text={hintText}
        />
        )}
      </div>
    </div>
  );
};
