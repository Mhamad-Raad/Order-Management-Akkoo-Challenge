import { createTheme, responsiveFontSizes } from '@mui/material';

export const getAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#8e44ad', // 🍇 Deep modern purple
        contrastText: '#fff',
      },
      secondary: {
        main: '#ff6f61', // Optional warm accent
      },
      background: {
        default: isDark ? '#121212' : '#f3f3f3',
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
