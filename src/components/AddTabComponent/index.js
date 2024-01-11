import React, { forwardRef } from 'react';

import SearchSelect from 'components/FormControls/SearchSelect';

export default forwardRef(({
  innerProps,
  children,
}, ref) => (
  <>
    <SearchSelect
      innerRef={ref}
      childrenProp={children}
      {...innerProps}
    />
  </>
));
