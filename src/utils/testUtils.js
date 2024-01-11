import React from 'react';
import { ThemeProvider } from '@mui/styles';
import {
  ThemeProvider as MaterialThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';

import theme from 'theme';

// eslint-disable-next-line import/prefer-default-export
export const WithTheme = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <MaterialThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </MaterialThemeProvider>
  </StyledEngineProvider>
);
