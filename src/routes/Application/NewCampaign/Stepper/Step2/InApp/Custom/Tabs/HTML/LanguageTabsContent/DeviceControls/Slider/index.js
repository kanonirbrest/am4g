import React from 'react';

import WithAccordion from './WithAccordion';
import Description from './Description';
import Score from './Score';
import Options from './Options';
import Button from './Button';
import Slider from './Slider';

const getNPSName = (name, ind) => {
  const [step, lang] = name.split('.');

  return `${`${step}.${lang}.`}fields[${ind}].`;
};
const getNPSIndex = (fields, values, label) => fields
  .findIndex((item) => item.index === values.index
        && item.type === label);

export default ({
  values = {},
  name,
  fields,
  actionProps,
  fontFamilyOptions,
  pages,
  page,
}) => {
  const descIndex = getNPSIndex(fields, values, 'nps-description');
  const descName = getNPSName(
    name, descIndex,
  );
  const descValues = fields[descIndex];
  const scoreIndex = getNPSIndex(fields, values, 'nps-score');
  const scoreName = getNPSName(
    name, scoreIndex,
  );
  const scoreValues = fields[scoreIndex];
  const buttonIndex = getNPSIndex(fields, values, 'nps-button');
  const buttonName = getNPSName(
    name, buttonIndex,
  );
  const buttonValues = fields[buttonIndex];

  return (
    <div>
      <WithAccordion label="Score Styles">
        <Score
          values={scoreValues}
          name={scoreName}
          actionProps={actionProps}
          fontFamilyOptions={fontFamilyOptions}
        />
      </WithAccordion>
      <WithAccordion label="Description Styles">
        <Description
          values={descValues}
          name={descName}
          actionProps={actionProps}
          fontFamilyOptions={fontFamilyOptions}
        />
      </WithAccordion>
      <WithAccordion label="Range Slider Styles">
        <Slider
          values={values}
          name={name}
          actionProps={actionProps}
          fontFamilyOptions={fontFamilyOptions}
        />
      </WithAccordion>
      <WithAccordion label="Range Options">
        <Options
          values={values}
          name={name}
          actionProps={actionProps}
          fontFamilyOptions={fontFamilyOptions}
        />
      </WithAccordion>
      <WithAccordion label="Button Styles">
        <Button
          values={buttonValues}
          name={buttonName}
          actionProps={actionProps}
          fontFamilyOptions={fontFamilyOptions}
          index={buttonIndex}
          pages={pages}
          page={page}
        />
      </WithAccordion>
    </div>
  );
};
