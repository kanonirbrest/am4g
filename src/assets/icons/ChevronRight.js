/* eslint-disable max-len */
import React from 'react';

const ChevronRight = ({
  width = '24px',
  height = '24px',
  color = 'white',
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
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2929 16.9491C9.93026 16.5865 9.90436 16.0147 10.2152 15.6222L10.2929 15.5349L13.8284 11.9994L10.2929 8.46386C9.93026 8.10123 9.90436 7.52939 10.2152 7.13687L10.2929 7.04965C10.6555 6.68702 11.2274 6.66112 11.6199 6.97194L11.7071 7.04965L15.9497 11.2923C16.3124 11.6549 16.3383 12.2268 16.0275 12.6193L15.9497 12.7065L11.7071 16.9491C11.3166 17.3397 10.6834 17.3397 10.2929 16.9491Z"
      fill={color}
    />
  </svg>
);

export default ChevronRight;
