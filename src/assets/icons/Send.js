/* eslint-disable max-len */
import React from 'react';

const Send = ({
  width = '24px',
  height = '24px',
  className = {},
}) => (
  <svg
    width={width}
    className={className}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.8859 3.96966L18.2365 17.9897C18.1188 18.99 17.0683 19.5924 16.1455 19.1887L12.0756 17.4081L10.5948 20.1004C10.1712 20.8706 8.99999 20.5698 8.99999 19.6908V16.7143L13.9599 10.3373C14.1054 10.1502 13.8621 9.91029 13.677 10.0584L7.17171 15.2626L3.85028 13.8095C3.09203 13.4778 3.04197 12.4211 3.76546 12.0192L19.1465 3.47416C19.5028 3.27621 19.9335 3.56486 19.8859 3.96966Z"
      fill="white"
    />
  </svg>
);

export default Send;
