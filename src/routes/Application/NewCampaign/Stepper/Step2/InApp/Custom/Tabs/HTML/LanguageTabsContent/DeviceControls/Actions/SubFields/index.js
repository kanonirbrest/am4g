import React from 'react';
import { makeStyles } from '@mui/styles';

import { OPEN_ACTION } from 'utils/constants/campaign';
import FormikTextField from 'components/FormControls/TextField';
import FormikSelect from 'components/FormControls/Select';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import { getPageOptions } from 'utils/pageUtils';
import ActivePageContext from 'contexts/ActivePage';
import SelectProduct from './SelectProduct';
import SelectTriggerPages from './SelectTriggerPages';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  row: {
    minWidth: '300px',
  },
}));

const SUB_FIELDS_TYPE_TEXT = [
  OPEN_ACTION.SUB_SUBSCRIPTION, OPEN_ACTION.SUB_URL,
  OPEN_ACTION.SUB_DEEPLINK,
];

export default ({
  name,
  actionProps,
  subField,
  actionIndex,
  value,
  onChange,
  pages,
  platform,
}) => {
  const classes = useStyles();
  const { page } = React.useContext(ActivePageContext);
  const options = React.useMemo(() => ([
    OPEN_ACTION.SUB_OPEN_PAGE, OPEN_ACTION.SUB_PURCHASE, OPEN_ACTION.SUB_PURCHASE_TRIGGER,
  ].includes(subField)
    ? getPageOptions(pages, subField, page) : []), [pages.length, page]);

  return (
    <div className={classes.row}>
      <div
        className={classes.label}
      >
        {subField}
      </div>
      {SUB_FIELDS_TYPE_TEXT.includes(subField) && (
      <FormikTextField
        name={`${name}actions[${actionIndex}].value`}
        placeholder="Enter value"
        classes={{
          root: classes.textField,
        }}
        withDebounce
        onChange={(e) => onChange(e, actionIndex)}
        {...actionProps}
      />
      )}
      {OPEN_ACTION.SUB_OPEN_PAGE === subField && (
        <FormikSelect
          value={value}
          name={`${name}actions[${actionIndex}].value`}
          options={options}
          classes={{
            select: classes.select,
          }}
          onChange={(e) => onChange(e, actionIndex)}
          placeholder="Enter value"
          {...actionProps}
        />
      )}
      {OPEN_ACTION.SUB_PURCHASE === subField && (
        <SelectProduct
          value={value}
          name={`${name}actions[${actionIndex}].value`}
          onChange={onChange}
          pageOptions={options}
          actionProps={actionProps}
          actionIndex={actionIndex}
          platform={platform}
          {...actionProps}
        />
      )}
      {OPEN_ACTION.SUB_PURCHASE_TRIGGER === subField && (
        <SelectTriggerPages
          value={value}
          name={`${name}actions[${actionIndex}].value`}
          onChange={onChange}
          pageOptions={options}
          actionProps={actionProps}
          actionIndex={actionIndex}
          platform={platform}
          {...actionProps}
        />
      )}
    </div>
  );
};
