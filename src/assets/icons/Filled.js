/* eslint-disable max-len */
import React from 'react';

const Filled = ({
  width = '24px',
  height = '24px',
  color = 'white',
  className = {},
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM16.7682 10.1402C17.1218 9.71593 17.0645 9.08537 16.6402 8.7318C16.2159 8.37824 15.5853 8.43556 15.2318 8.85984L10.9328 14.0186L8.70711 11.7929C8.31658 11.4024 7.68342 11.4024 7.29289 11.7929C6.90237 12.1834 6.90237 12.8166 7.29289 13.2071L10.2155 16.1297C10.6728 16.5871 11.4242 16.553 11.8383 16.0561L16.7682 10.1402Z"
      fill={color}
    />
  </svg>
);

export default Filled;
