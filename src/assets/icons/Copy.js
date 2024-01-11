/* eslint-disable max-len */
import React from 'react';

const Copy = ({
  width = '24px',
  height = '24px',
  color = '#4675C0',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6C4 4.89543 4.89543 4 6 4H15C15.5523 4 16 4.44772 16 5C16 5.55228 15.5523 6 15 6H6.00001V15C6.00001 15.5523 5.55228 16 5 16C4.44772 16 4 15.5523 4 15V6Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 10C8 8.89543 8.89543 8 10 8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H10C8.89543 20 8 19.1046 8 18V10ZM10 18V10H18V18H10Z"
      fill={color}
    />
  </svg>

);

export default Copy;
