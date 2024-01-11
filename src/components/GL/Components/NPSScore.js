import React from 'react';

import { getDefaultSliderIndex } from '../utils';

const NPSScore = ({
  itemKey: key, f, fields,
}) => {
  const { slider, defaultSliderIndex } = getDefaultSliderIndex(fields, f);

  return (
    <div
      data-key={key}
      class="score"
      id={key}
      style={{
        fontFamily: `${f.fontFamily}`,
      }}
    >
      {slider.mapper[defaultSliderIndex].score}
    </div>
  );
};

export default NPSScore;
