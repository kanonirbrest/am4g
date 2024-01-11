import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Legend, Tooltip,
  ResponsiveContainer,
} from 'recharts';

import Tick from 'routes/Application/Reports/ChartTabsContent/Chart/Tick';
import CustomizedLegend
  from 'routes/Application/Reports/ChartTabsContent/Chart/CustomizedLegend';
import CustomTooltip
  from 'routes/Application/Reports/ChartTabsContent/Chart/CustomTooltip';

const useStyles = makeStyles(() => ({
  dot: {
    minWidth: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'blue',
    marginRight: '10px',
  },
  noData: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '12px',
    color: '#3E4554',
  },
}));

const SPACES = 60;
const getXOffset = (length, width) => {
  switch (length) {
    case 2:
      return width / 2 - SPACES;
    case 3:
      return width / 3 - SPACES;
    default:
      return 10;
  }
};

const VARIANTS_LEGEND_HEIGHT = '98px';
const LEGEND_HEIGHT = '38px';

export default ({
  rows,
  lines,
  yTickFormatter = null,
  chartWidth,
  variant,
  setVariant,
  variantsArr,
  labelMapper,
  isPerformanceField = false,
  isFinanceField,
  /* to handle reversed tab tooltip label */
  nameMapper,
}) => {
  const classes = useStyles();
  const [hiddenLines, setHiddenLines] = useState([]);
  const onLegendClick = (item) => {
    if (hiddenLines.includes(item.dataKey)) {
      setHiddenLines(hiddenLines.filter((i) => i !== item.dataKey));
    } else {
      setHiddenLines([...hiddenLines, item.dataKey]);
    }
  };

  if (!rows.length) {
    return (
      <div className={classes.noData}>
        There is no enough data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer
      width="100%"
      debounce={100/* redraw issue */}
    >
      <LineChart
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
        width={700}
        data={rows}
        iconType="line"
      >
        <CartesianGrid
          strokeDasharray="3 0"
          vertical={false}
        />
        <XAxis
          tick={<Tick />}
          dataKey="date"
          padding={{
            right: getXOffset(rows.length, chartWidth),
          }}
        />
        <YAxis
          tickFormatter={yTickFormatter}
          style={{ fontSize: '12px' }}
          padding={{ top: 10 }}
        />
        <Tooltip
          iconType="line"
          itemStyle={null}
          wrapperStyle={null}
          content={(
            <CustomTooltip
              isPerformanceField={isPerformanceField}
              isFinanceField={isFinanceField}
              nameMapper={nameMapper}
            />
)}
        />
        <Legend
          wrapperStyle={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            minHeight: variantsArr?.length > 1 ? VARIANTS_LEGEND_HEIGHT : LEGEND_HEIGHT,
          }}
          content={(
            <CustomizedLegend
              onLegendClick={onLegendClick}
              classes={classes}
              lines={lines}
              variant={variant}
              setVariant={setVariant}
              variants={variantsArr}
              labelMapper={nameMapper || labelMapper}
            />
            )}
        />
        {lines
          .filter((line) => !hiddenLines
            .includes(line.dataKey))
          .map((line) => (
            (
              <Line
                key={line.dataKey}
                dot={false}
                strokeWidth={2}
                iconType="line"
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                activeDot={{ r: 8 }}
                name={line.name}
              />
            )
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
