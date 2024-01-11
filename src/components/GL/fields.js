import React from 'react';

import 'react-grid-layout/css/styles.css';
import {
  lastStyles, firstStyles, style, preLastStyles,
} from 'components/GL/style';

const getGridItem = ({
  f,
  hoveredProps,
  isFirst,
  isPreLast,
}) => {
  const key = `${f.index}-${f.type}`;

  switch (f.type) {
    case 'action':

      return (
        <div
          style={{
            ...style.item,
          }}
          key={key}
          {...hoveredProps}
        >
          <button
            type="button"
            style={{
              fontWeight: f.fontWeight,
              color: f.color,
              border: 'none',
              borderBottom: '0.5px solid rgba(60, 60, 67, 0.36)',
              ...style.action,
              ...(isFirst && firstStyles),
              ...(isPreLast && preLastStyles),
            }}
            data-key={key}
            id={key}
          >
            {f.title}
          </button>
        </div>
      );

    case 'cancel':

      return (
        <div
          style={{
            ...style.item,
          }}
          key={key}
          {...hoveredProps}
        >
          <button
            type="button"
            style={{
              fontWeight: f.fontWeight,
              color: f.color,
              borderBottom: '0.5px solid rgba(60, 60, 67, 0.36)',
              ...style.cancel,
              ...lastStyles,
            }}
            data-key={key}
            id={key}
          >
            {f.title}
          </button>
        </div>
      );

    default:
      return <div />;
  }
};
export default getGridItem;
