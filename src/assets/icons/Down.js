/* eslint-disable max-len */
import React from 'react';

const Down = ({
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
    <path d="M12 15L6 9H18L12 15Z" fill={color} />
  </svg>
);

export default Down;
