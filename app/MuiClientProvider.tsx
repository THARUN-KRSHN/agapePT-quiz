"use client";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import React from 'react';

export default function MuiClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
