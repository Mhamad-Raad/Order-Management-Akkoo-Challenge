import { useSelector } from 'react-redux';
import { type RootState } from './store';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';

import { getAppTheme } from './theme';

const App = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = getAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background:
            mode === 'dark'
              ? '#121212'
              : 'linear-gradient(to bottom right, #f0f4fb, #dbe5fdff)',
          transition: 'background 0.3s ease',
        }}
      >
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={3000}
        >
          <Layout>
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </Layout>
        </SnackbarProvider>
      </Box>
    </ThemeProvider>
  );
};

export default App;

