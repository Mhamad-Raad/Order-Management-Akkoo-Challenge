import { createTheme } from '@mui/material';

export const getAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: { mode },
  });
