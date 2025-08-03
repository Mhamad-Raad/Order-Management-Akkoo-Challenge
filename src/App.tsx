import { useSelector } from 'react-redux';
import { type RootState } from './store';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline } from '@mui/material';

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
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <Layout>
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;

