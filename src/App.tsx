import { useSelector } from 'react-redux';
import { type RootState } from './store';
import { SnackbarProvider } from 'notistack';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';

const App = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <Layout>
          <Dashboard />
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;

