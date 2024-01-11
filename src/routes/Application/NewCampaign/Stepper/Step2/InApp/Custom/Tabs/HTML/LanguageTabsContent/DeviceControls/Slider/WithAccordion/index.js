import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Arrow from 'assets/icons/Arrow';

export default ({ children, label }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<Arrow />}
      aria-controls="panel1a-content"
    >
      {label}
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
);
