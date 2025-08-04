import { createTheme, responsiveFontSizes } from '@mui/material';

export const getAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#8e44ad' : '#1976d2',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ff6f61',
      },
      background: {
        default: isDark ? '#121212' : '#f0f4fb',
        paper: isDark ? '#1e1e1e' : '#ffffff',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      fontSize: 14,
      h6: {
        fontWeight: 700,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '::-webkit-scrollbar': { width: '8px', height: '8px' },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: isDark ? '#8e44ad' : '#1976d2',
            borderRadius: '8px',
          },
          '::-webkit-scrollbar-track': { background: 'transparent' },
          '*': {
            scrollbarColor: `${isDark ? '#8e44ad' : '#1976d2'} transparent`,
            scrollbarWidth: 'thin',
          },

          body: {
            background: isDark
              ? '#121212'
              : 'linear-gradient(to bottom right, #f0f4fb, #e6ecfa)',
            transition: 'background 0.3s ease',
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: false,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 10,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
