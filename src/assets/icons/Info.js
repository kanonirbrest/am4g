/* eslint-disable max-len */
import React from 'react';

const Info = ({
  width = '24px',
  height = '24px',
  color = '#8D95A9',
  className,
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
      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58174 4 4.00002 7.58172 4.00002 12C4.00002 16.4183 7.58174 20 12 20ZM12.8835 8.79058C12.8835 9.23037 12.5275 9.58115 12.0668 9.58115C11.606 9.58115 11.25 9.23037 11.25 8.79058C11.25 8.34555 11.606 8 12.0668 8C12.5275 8 12.8835 8.34555 12.8835 8.79058ZM12.8312 15.2042C12.8312 15.7016 12.538 16 12.0668 16C11.5903 16 11.3024 15.7016 11.3024 15.2042V10.9634C11.3024 10.466 11.5903 10.1623 12.0668 10.1623C12.538 10.1623 12.8312 10.466 12.8312 10.9634V15.2042Z"
      fill={color}
    />
  </svg>
);

export default Info;
