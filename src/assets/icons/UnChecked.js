import React from 'react';

const UnChecked = ({
  width = '16px',
  height = '16px',
  color = 'white',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="8"
      cy="8"
      r="7.5"
      fill={color}
      stroke="#8D95A9"
    />
  </svg>
);

export default UnChecked;
