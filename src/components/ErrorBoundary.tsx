import React, { Component, type ReactNode } from 'react';
import { Typography, Button, Box } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload(); // reloads app
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign='center' mt={10}>
          <Typography variant='h4' gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant='body1' gutterBottom>
            Please refresh the page or try again later.
          </Typography>
          <Button
            onClick={this.handleReset}
            variant='contained'
            color='primary'
          >
            Refresh
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
