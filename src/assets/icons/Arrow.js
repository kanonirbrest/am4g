/* eslint-disable max-len */
import React from 'react';

const Arrow = ({
  width = '24px',
  height = '24px',
  color = '#8D95A9',
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 9L18 15L6 15L12 9Z"
      fill={color}
    />
  </svg>
);

export default Arrow;
