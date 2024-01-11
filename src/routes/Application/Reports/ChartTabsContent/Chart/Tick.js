import React from 'react';
import dayjs from 'dayjs';

const OFFSET_FOR_CENTERING = 16;
const WIDTH = 16;

const CustomizedTick = ({ payload = {}, x, ...props }) => {
  const {
    tickFormatter, visibleTicksCount, verticalAnchor, ...textProps
  } = props;

  return (
    <text
      {...textProps}
      x={x + OFFSET_FOR_CENTERING}
      style={{ fontSize: '10px' }}
      textAnchor="middle"
    >
      <tspan
        style={{ fill: '#3E4554' }}
        textAnchor="middle"
        dy="0.71em"
        width={WIDTH}
        x={x}
      >
        {dayjs(payload.value).format('MMM D')}
      </tspan>
      <tspan
        style={{ fill: '#8D95A9' }}
        textAnchor="middle"
        dy="0.88em"
        width={WIDTH}
        x={x}
      >
        {dayjs(payload.value).format('YYYY')}
      </tspan>
    </text>
  );
};

export default CustomizedTick;
