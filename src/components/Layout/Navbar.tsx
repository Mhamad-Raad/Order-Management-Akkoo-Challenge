import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  Box,
  Container,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/ThemeSlices/themeSlice';
import { type RootState } from '../../store';

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <AppBar
      position='sticky'
      color='default'
      elevation={0}
      sx={{
        backgroundColor:
          mode === 'dark' ? theme.palette.background.paper : '#fff',
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'space-between', py: 1.5 }}
        >
          <Typography
            variant='h6'
            fontWeight={700}
            sx={{ fontFamily: 'Inter, sans-serif' }}
          >
            Akkooo Orders
          </Typography>

          <Box>
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              color='inherit'
              aria-label='Toggle theme'
              sx={{ transition: 'transform 0.3s ease' }}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
