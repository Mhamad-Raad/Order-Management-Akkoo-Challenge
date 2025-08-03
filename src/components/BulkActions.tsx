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
  bulkUpdateStatus,
  deselectAllOrders,
  selectAllOrders,
} from '../store/OrderSlices/orderSlice';
import { type RootState } from '../store';
import { type Order } from '../types/orderTypes';
import { useState } from 'react';

interface Props {
  orders: Order[];
}

const BulkActions = ({ orders }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const selectedOrders = useSelector(
    (state: RootState) => state.orders.selectedOrders
  );

  const [selectedStatus, setSelectedStatus] = useState('');

  const visibleSelected = selectedOrders.filter((id) =>
    orders.some((o) => o.id === id)
  );

  const handleBulkUpdate = (status: string) => {
    dispatch(bulkUpdateStatus(status));
    enqueueSnackbar(`Updated ${visibleSelected.length} orders to ${status}`, {
      variant: 'success',
    });
    setSelectedStatus('Select status');
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      mb={1}
      flexWrap='wrap'
      gap={1}
    >
      <Stack direction='row' spacing={1}>
        <Button
          variant='outlined'
          size='small'
          onClick={() => dispatch(selectAllOrders(orders.map((o) => o.id)))}
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
          disabled={visibleSelected.length === 0}
          value={selectedStatus}
          defaultValue='Update Status'
          onChange={(e) => {
            handleBulkUpdate(e.target.value);
          }}
        >
          <MenuItem value='Select status' disabled>
            Select status
          </MenuItem>
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
