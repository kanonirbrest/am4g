import React from 'react';
import Radio from '@mui/material/Radio';

import Checked from 'assets/icons/Checked';
import UnChecked from 'assets/icons/UnChecked';

export default (props) => (
  <Radio
    checkedIcon={<Checked />}
    icon={<UnChecked />}
    {...props}
  />
);
