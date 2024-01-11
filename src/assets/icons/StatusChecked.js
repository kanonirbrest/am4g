/* eslint-disable max-len */
import React from 'react';

const StatusChecked = ({
  width = '24px',
  height = '24px',
  color = '#4675C0',
  className = {},
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6402 8.2318C17.0645 8.58537 17.1218 9.21593 16.7682 9.64021L11.8383 15.5561C11.4242 16.053 10.6728 16.0871 10.2155 15.6297L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929C7.68342 10.9024 8.31658 10.9024 8.70711 11.2929L10.9328 13.5186L15.2318 8.35984C15.5853 7.93556 16.2159 7.87824 16.6402 8.2318Z"
      fill="white"
    />
  </svg>

);

export default StatusChecked;
