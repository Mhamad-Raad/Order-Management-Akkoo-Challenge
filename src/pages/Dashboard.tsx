import { Typography, Box } from '@mui/material';
import OrdersList from '../components/Orders/OrdersList';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant='h5' fontWeight={600} gutterBottom>
        Orders Overview
      </Typography>
      <OrdersList />
    </Box>
  );
};

export default Dashboard;
