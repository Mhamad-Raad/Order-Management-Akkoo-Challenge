import { Box, Container, CssBaseline } from '@mui/material';
import { type PropsWithChildren } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth='lg' sx={{ pt: 4, pb: 4 }}>
        <Box>{children}</Box>
      </Container>
    </>
  );
};

export default Layout;
