/* eslint-disable max-len */
import React from 'react';

const ChevronLeft = ({
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
      d="M13.7071 7.05086C14.0697 7.41349 14.0956 7.98533 13.7848 8.37785L13.7071 8.46507L10.1716 12.0006L13.7071 15.5361C14.0697 15.8988 14.0956 16.4706 13.7848 16.8631L13.7071 16.9504C13.3445 17.313 12.7726 17.3389 12.3801 17.0281L12.2929 16.9504L8.05025 12.7077C7.68762 12.3451 7.66172 11.7732 7.97255 11.3807L8.05025 11.2935L12.2929 7.05086C12.6834 6.66033 13.3166 6.66033 13.7071 7.05086Z"
      fill={color}
    />
  </svg>
);

export default ChevronLeft;
