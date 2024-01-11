/* eslint-disable max-len */
import React from 'react';

export default ({
  width = '24px',
  height = '24px',
  color = '#8D95A9',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7ZM6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V13H15C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13H6V7Z"
      fill={color}
    />
  </svg>

);
