import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import {
  selectAllOrders,
  deselectAllOrders,
  bulkUpdateStatus,
} from '../store/OrderSlices/orderSlice';
import { type RootState } from '../store';

const BulkActions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const selectedOrders = useSelector(
    (state: RootState) => state.orders.selectedOrders
  );
  const hasSelection = selectedOrders.length > 0;

  const handleBulkUpdate = (status: string) => {
    dispatch(bulkUpdateStatus(status));
    enqueueSnackbar(`Updated ${selectedOrders.length} orders to ${status}`, {
      variant: 'success',
    });
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      mb={2}
      flexWrap='wrap'
      gap={2}
    >
      <Stack direction='row' spacing={1}>
        <Button
          variant='outlined'
          size='small'
          onClick={() => dispatch(selectAllOrders())}
        >
          Select All
        </Button>
        <Button
          variant='outlined'
          size='small'
          onClick={() => dispatch(deselectAllOrders())}
        >
          Deselect All
        </Button>
      </Stack>

      <FormControl size='small' sx={{ minWidth: 200 }}>
        <InputLabel>Update Status</InputLabel>
        <Select
          label='Update Status'
          disabled={!hasSelection}
          onChange={(e) => handleBulkUpdate(e.target.value)}
          defaultValue=''
        >
          <MenuItem value='pending'>Pending</MenuItem>
          <MenuItem value='processing'>Processing</MenuItem>
          <MenuItem value='shipped'>Shipped</MenuItem>
          <MenuItem value='delivered'>Delivered</MenuItem>
          <MenuItem value='cancelled'>Cancelled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BulkActions;
