import React from 'react';

import { getDefaultSliderIndex } from '../utils';

const NPS_Button = ({
  itemKey: key, f, fields,
}) => {
  const { defaultSliderIndex, slider } = getDefaultSliderIndex(fields, f);

  return (
    <div
      className="desc"
      data-key={key}
      id={key}
      style={{
        fontFamily: `${f.fontFamily}`,
      }}
    >
      {slider.mapper[defaultSliderIndex].description}
    </div>
  );
};

export default NPS_Button;
