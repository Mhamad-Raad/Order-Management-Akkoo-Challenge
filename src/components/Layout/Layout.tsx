import { Box, Container } from '@mui/material';
import { type PropsWithChildren } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ pt: 4, pb: 4 }}>
        <Box>{children}</Box>
      </Container>
    </>
  );
};

export default Layout;
