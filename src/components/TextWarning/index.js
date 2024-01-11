import React from 'react';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

export default ({ children }) => (
  <div style={{
    display: 'flex',
    marginBottom: '10px',
  }}
  >
    <WarningAmberOutlinedIcon color="warning" />
    <div style={{ marginLeft: '10px' }}>
      {children}
    </div>
  </div>
);
