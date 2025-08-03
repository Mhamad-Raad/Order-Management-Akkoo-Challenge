import {
  Paper,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { ORDER_STATUSES } from '../../constants/orderStatus';
import { type OrderStatus } from '../../types/orderTypes';

const OrderSummary = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

  const statusCounts = orders.reduce<Record<OrderStatus, number>>(
    (acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    },
    {} as Record<OrderStatus, number>
  );

  const summaryData = [
    { label: 'Total Orders', value: totalOrders },
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}` },
    ...ORDER_STATUSES.map((status) => ({
      label: status.charAt(0).toUpperCase() + status.slice(1),
      value: statusCounts[status] || 0,
    })),
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {summaryData.map((item) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={item.label}
          {...({ item: true } as any)}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              backdropFilter: 'blur(12px)',
              backgroundColor: isDark
                ? 'rgba(255, 255, 255, 0.04)'
                : 'rgba(255, 255, 255, 0.6)',
              border: `1px solid ${
                isDark ? theme.palette.divider : 'rgba(25, 118, 210, 0.25)' // light blue border in light mode
              }`,
              boxShadow: isDark
                ? `0 8px 32px rgba(0,0,0,0.4)`
                : `0 8px 32px rgba(25, 118, 210, 0.1)`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: isDark
                  ? `0 12px 40px rgba(0,0,0,0.6)`
                  : `0 12px 40px rgba(25, 118, 210, 0.25)`,
                borderColor: isDark
                  ? theme.palette.primary.main
                  : 'rgba(25, 118, 210, 0.6)',
              },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.2,
            }}
          >
            <Typography
              variant='subtitle2'
              color='text.secondary'
              fontWeight={700}
              textTransform='uppercase'
              fontSize={isMobile ? 12 : 14}
              letterSpacing={0.5}
            >
              {item.label}
            </Typography>

            <Typography
              variant='h5'
              fontWeight={700}
              sx={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                color: theme.palette.primary.main,
              }}
            >
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderSummary;
