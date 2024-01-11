import React, { useMemo } from 'react';
import _groupBy from 'lodash.groupby';
import {
  PieChart, Pie, Cell,
} from 'recharts';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { makeStyles } from '@mui/styles';

import { multiplePercentage } from 'routes/Application/Reports/Statistic/utils';
import { formatData, formatNPS } from 'utils';
import Hint from 'components/Hint';

const COLORS = ['#178E29', '#CBA611', '#CB3011'];
const emotionItemStyle = {
  color: 'white',
  padding: '5px',
  borderRadius: '50%',
  marginRight: '10px',
  marginBottom: '5px',
};

const useStyles = makeStyles(() => ({
  satisfied: {
    background: '#178E29',
    ...emotionItemStyle,
  },
  neutral: {
    background: '#CBA611',
    ...emotionItemStyle,
  },
  detract: {
    background: '#CB3011',
    ...emotionItemStyle,
  },
  emotions: {
    display: 'flex',
    flexDirection: 'column',
  },
  emotion: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  scoreLabel: {
    textAlign: 'left',
    marginBottom: '5px',
  },
}));

export default ({ data }) => {
  const classes = useStyles();
  const grouped = _groupBy(data, 'type');

  const nps = formatNPS(multiplePercentage(grouped.nps[0].count, 0.01));
  const avg = formatData(multiplePercentage(grouped.avg[0].count, 0.01));
  const promoters_pr = formatData(multiplePercentage(grouped
    .Promoters.find(((el) => el.ext === '%')).count, 0.01));
  const passives_pr = formatData(multiplePercentage(grouped
    .Passives.find(((el) => el.ext === '%')).count, 0.01));
  const detractors_pr = formatData(multiplePercentage(grouped
    .Detractors.find(((el) => el.ext === '%')).count, 0.01));

  // useMemo to make animation works
  const absCounts = useMemo(() => {
    const promoters = grouped
      .Promoters.find(((el) => el.ext === 'abs')).count;
    const passives = grouped
      .Passives.find(((el) => el.ext === 'abs')).count;
    const detractors = grouped
      .Detractors.find(((el) => el.ext === 'abs')).count;

    return [
      { name: 'Promoters', value: promoters },
      { name: 'Passives', value: passives },
      { name: 'Detractors', value: detractors },
    ];
  }, [data]);

  return (
    <>
      <div className={classes.scoreLabel}>
        Net Promoter Score
        <Hint text="NPS fits for the rating between 0 (not at all likely) and
        10 (extremely likely). Responses divided into Detractors (0-6),
        Passives (7-8), and Promoters (9-10). Formula: % of promoters - %
        of detractors, passives are excluded from calculation. If you
        have less or more than 10 rating values we convert Scores to % values
        as Detractors (< 70%), Passives (between 70 and 90), and Promoters (>= 90%)
        and use the same formula"
        />
      </div>
      <div className={classes.scoreLabel}>
        Average Score
        <Hint text="Calculated as average number of overall scores" />
      </div>
      <PieChart width={210} height={210}>
        <Pie
          data={absCounts}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          fill="#CB3011"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
                // eslint-disable-next-line
                key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              color={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <text
          x="50%"
          y={70}
          fontSize="14px"
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          NPS:
        </text>
        <text
          x="50%"
          y={95}
          fontSize="28px"
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {nps}
        </text>
        <text
          x="50%"
          y={125}
          fontSize="14px"
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Av. Score:
        </text>
        <text
          x="50%"
          y={150}
          fontWeight={700}
          fontSize="28px"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {avg}
        </text>
      </PieChart>
      <div className={classes.emotions}>
        <div className={classes.emotion}>
          <SentimentSatisfiedAltIcon
            classes={{
              root: classes.satisfied,
            }}
            fontSize="large"
          />
          <span>
            {' '}
            Promoters:
            {` ${promoters_pr}`}
            % (
            {absCounts[0].value}
            )
          </span>
        </div>
        <div className={classes.emotion}>
          <SentimentNeutralIcon
            classes={{
              root: classes.neutral,
            }}
            fontSize="large"
          />
          <span>
            Passives:
            {` ${passives_pr}`}
            % (
            {absCounts[1].value}
            )
          </span>
        </div>
        <div className={classes.emotion}>
          <SentimentVeryDissatisfiedIcon
            classes={{
              root: classes.detract,
            }}
            fontSize="large"
          />
          <span>
            Detractors:
            {` ${detractors_pr}`}
            % (
            {absCounts[2].value}
            )
          </span>
        </div>
      </div>
    </>
  );
};
