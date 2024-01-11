import React from 'react';

import { STATUS, STATUS_ENUM } from 'utils/constants/campaign';

const baseStyles = {
  fontSize: '8px',
  borderRadius: '2px',
  padding: '2px 4px',
  textTransform: 'capitalize',
  marginRight: '10px',
};

const getStatusStyles = (title) => {
  switch (title) {
    case STATUS.ACTIVE:

      return {
        ...baseStyles,
        background: '#22BB9F',
        color: '#fff',
      };
    case STATUS.ARCHIVED:

      return {
        ...baseStyles,
        background: 'transparent',
        color: '#8D95A9',
        border: '1px solid #8D95A9',
      };
    case STATUS.DRAFT:

      return {
        ...baseStyles,
        background: '#8D95A9',
        color: '#fff',
      };

    case STATUS.STOPPED:

      return {
        ...baseStyles,
        background: '#FF9840',
        color: '#fff',
      };

    default:
      return {};
  }
};

export default ({
  title,
}) => (
  <div style={getStatusStyles(title)}>
    {STATUS_ENUM[title]}
  </div>
);
