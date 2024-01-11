import React, { useState } from 'react';

import FormLabelHelp from 'assets/icons/FormLabelHelp';
import TooltipWrapper from 'components/Tooltip';
import HintHovered from 'assets/icons/HintHovered';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'inline-block',
    marginLeft: '5px',
  },
}));
export default ({
  text,
  height = '12px',
  width = '12px',
  boxWidth,
}) => {
  const classes = useStyles();
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={classes.wrapper}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <TooltipWrapper
        tooltipText={text}
        boxWidth={boxWidth}
      >
        {isHovering ? (
          <HintHovered width={width} height={height} />
        ) : (
          <FormLabelHelp width={width} height={height} />
        )}
      </TooltipWrapper>
    </div>
  );
};
