import { Box, Container } from '@mui/material';
import { type PropsWithChildren } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          pt: 4,
          pb: 4,
          minHeight: '100vh',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            transition: 'all 0.3s ease',
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
