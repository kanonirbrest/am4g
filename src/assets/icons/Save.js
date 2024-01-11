/* eslint-disable max-len */
import React from 'react';

const Save = ({
  width = '16px',
  height = '16px',
  className = {},
}) => (
  <svg
    className={className}
    width={height}
    height={width}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 9.5C4 9.22386 4.22386 9 4.5 9H11.5C11.7761 9 12 9.22386 12 9.5C12 9.77614 11.7761 10 11.5 10H4.5C4.22386 10 4 9.77614 4 9.5Z" fill="white" />
    <path d="M4 11.5C4 11.2239 4.22386 11 4.5 11H11.5C11.7761 11 12 11.2239 12 11.5C12 11.7761 11.7761 12 11.5 12H4.5C4.22386 12 4 11.7761 4 11.5Z" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2C0 0.895431 0.895431 0 2 0H4V4C4 4.55229 4.44771 5 5 5H11C11.5523 5 12 4.55229 12 4V0H12.1716C12.702 0 13.2107 0.210714 13.5858 0.585786L15.4142 2.41421C15.7893 2.78929 16 3.29799 16 3.82843V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2ZM3 7C2.44772 7 2 7.44771 2 8V13C2 13.5523 2.44771 14 3 14H13C13.5523 14 14 13.5523 14 13V8C14 7.44772 13.5523 7 13 7H3Z"
      fill="white"
    />
    <path
      d="M8 0H10V4H8V0Z"
      fill="white"
    />
  </svg>
);

export default Save;
