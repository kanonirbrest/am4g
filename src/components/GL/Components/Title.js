import React from 'react';
import { makeStyles } from '@mui/styles';

import AllProductsContext from 'contexts/Products';
import { style } from '../style';
import { parseTemplateVariable } from '../utils';

const useStyles = makeStyles(() => style);

const Title = ({
  itemKey: key, f,
}) => {
  const classes = useStyles();
  const {
    allProducts,
  } = React.useContext(AllProductsContext);
  const text = parseTemplateVariable(f.text, allProducts);

  return (
    <div
      data-key={key}
      id={key}
      style={{ ...style.innerText }}
      className={classes.innerTextClass}
      dangerouslySetInnerHTML={{ __html: text }} // eslint-disable-line
    />
  );
};

export default Title;
