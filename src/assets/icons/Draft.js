/* eslint-disable max-len */
import React from 'react';

export default ({
  width = '24px',
  height = '24px',
  color = '#8D95A9',
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
      d="M5 4C5 3.44772 5.44772 3 6 3H10C10.5523 3 11 3.44772 11 4V19C11 19.5523 10.5523 20 10 20H6C5.44772 20 5 19.5523 5 19V4ZM6 5.5C6 5.22386 6.22386 5 6.5 5H7.5C7.77614 5 8 5.22386 8 5.5C8 5.77614 7.77614 6 7.5 6H6.5C6.22386 6 6 5.77614 6 5.5ZM6.5 8C6.22386 8 6 8.22386 6 8.5C6 8.77614 6.22386 9 6.5 9H7.5C7.77614 9 8 8.77614 8 8.5C8 8.22386 7.77614 8 7.5 8H6.5ZM6 11.5C6 11.2239 6.22386 11 6.5 11H7.5C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12H6.5C6.22386 12 6 11.7761 6 11.5ZM6.5 14C6.22386 14 6 14.2239 6 14.5C6 14.7761 6.22386 15 6.5 15H7.5C7.77614 15 8 14.7761 8 14.5C8 14.2239 7.77614 14 7.5 14H6.5ZM6 17.5C6 17.2239 6.22386 17 6.5 17H7.5C7.77614 17 8 17.2239 8 17.5C8 17.7761 7.77614 18 7.5 18H6.5C6.22386 18 6 17.7761 6 17.5Z"
      fill={color}
    />
    <path
      d="M17.7597 8.7981C17.7597 8.59147 17.5922 8.42396 17.3855 8.42396H14.3925C14.1858 8.42396 14.0183 8.59147 14.0183 8.7981V16.5666C14.0183 16.6247 14.0318 16.682 14.0578 16.7339L15.5544 19.727C15.5906 19.7994 15.6493 19.8581 15.7217 19.8943C15.9065 19.9867 16.1312 19.9118 16.2236 19.727L17.7202 16.7339C17.7461 16.682 17.7597 16.6247 17.7597 16.5666V8.7981Z"
      fill={color}
    />
    <path
      d="M17.755 4.92317C17.6865 3.95237 16.8772 3.18609 15.889 3.18609C14.8559 3.18609 14.0183 4.02362 14.0183 5.05676L14.0183 6.5533L14.0244 6.62055C14.056 6.79508 14.2088 6.92743 14.3925 6.92743L17.3855 6.92743L17.4528 6.9214C17.6273 6.88972 17.7597 6.73697 17.7597 6.5533L17.7597 5.05676L17.755 4.92317Z"
      fill={color}
    />
  </svg>

);
