/* eslint-disable max-len */
import React from 'react';

const StatusDefault = ({
  width = '24px',
  height = '24px',
  color = '#8D95A9',
  className = {},
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="4.5"
      y="4.5"
      width="15"
      height="15"
      rx="1.5"
      fill="white"
      stroke={color}
    />
  </svg>
);

export default StatusDefault;
