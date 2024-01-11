/* eslint-disable max-len */
import React from 'react';

const Delete = ({
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
      d="M10 4C9.44772 4 9 4.44772 9 5H6C5.72386 5 5.5 5.22386 5.5 5.5V6.5C5.5 6.77614 5.72386 7 6 7H18C18.2761 7 18.5 6.77614 18.5 6.5V5.5C18.5 5.22386 18.2761 5 18 5H15C15 4.44772 14.5523 4 14 4H10Z"
      fill={color}
    />
    <path
      d="M6.54957 9.54527C6.52295 9.25246 6.7535 9 7.04752 9H16.9525C17.2465 9 17.477 9.25246 17.4504 9.54527L16.5827 19.0905C16.5359 19.6056 16.104 20 15.5868 20H8.41321C7.89601 20 7.46415 19.6056 7.41732 19.0905L6.54957 9.54527Z"
      fill={color}
    />
  </svg>
);

export default Delete;
