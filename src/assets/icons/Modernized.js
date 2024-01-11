/* eslint-disable max-len */
import React from 'react';

const Modernized = ({
  width = '16px',
  height = '14px',
  color = '#7D95BC',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="14" rx="2" fill={color} />
    <path d="M5.03731 4.288H6.44531L8.02131 8.76H8.03731L9.57331 4.288H10.9653V10H10.0133V5.592H9.99731L8.41331 10H7.58931L6.00531 5.592H5.98931V10H5.03731V4.288Z" fill="white" />
  </svg>
);

export default Modernized;
