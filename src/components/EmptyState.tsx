import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

const EmptyState = ({ message = 'No orders found.' }: { message?: string }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 10,
        opacity: 0.6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <InboxIcon sx={{ fontSize: 64 }} />
      <Typography variant='h6'>{message}</Typography>
    </Box>
  );
};

export default EmptyState;
