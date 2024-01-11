import React from 'react';

import Union from 'assets/icons/Union';
import { hoverStyle } from 'components/GL/style';

const Hovered = ({
  isHovered = true,
  onDuplicate,
  index,
}) => (
  <>
    {isHovered && (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDuplicate(index);
        }}
        style={hoverStyle.button}
        className="hover-item"
      >
        <Union />
      </button>
    )}
  </>
);
export default Hovered;
