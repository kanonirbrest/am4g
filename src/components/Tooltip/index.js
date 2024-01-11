import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';

export const BootstrapTooltip = styled(({
  className, boxWidth,
  ...props
}) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ boxWidth }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#FFFFFF',
    '&:before': {
      boxShadow: '0px 0px 4px rgb(62 69 84 / 30%)',
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#FFFFFF',
    color: 'grey',
    boxShadow: '0px 0px 4px rgb(62 69 84 / 30%)',
    padding: '20px',
    fontWeight: '400',
    fontSize: '12px',
    minWidth: boxWidth || '240px',
    whiteSpace: 'pre-line',
  },
}));

const useStyles = makeStyles(() => ({
  button: {
    width: 'auto',
    minWidth: '10px',
    padding: 0,
  },
}));

export default React.memo(({ children, tooltipText, boxWidth }) => {
  const classes = useStyles();

  return (
    <div>
      <BootstrapTooltip
        title={tooltipText}
        placement="right"
        boxWidth={boxWidth}
      >
        <Button className={classes.button}>
          {children}
        </Button>
      </BootstrapTooltip>
    </div>
  );
});
