import {
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  updateSingleOrderStatus,
  toggleSelectOrder,
  selectAllOrders,
} from '../store/OrderSlices/orderSlice';
import { type RootState } from '../store';
import { type Order } from '../types/orderTypes';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { type OrderStatus } from '../types/orderTypes';

interface Props {
  orders: Order[];
}

const BulkActions = ({ orders }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();

  const selectedOrders = useSelector(
    (state: RootState) => state.orders.selectedOrders
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const visibleSelected = selectedOrders.filter((id) =>
    orders.some((o) => o.id === id)
  );

  const handleBulkUpdate = (status: OrderStatus) => {
    const idsInThisColumn = orders.map((o) => o.id);
    const targets = selectedOrders.filter((id) => idsInThisColumn.includes(id));

    if (targets.length === 0) return;

    targets.forEach((id) => {
      dispatch(updateSingleOrderStatus({ id, status }));
    });

    enqueueSnackbar(`Updated ${targets.length} orders to ${status}`, {
      variant: 'success',
    });

    targets.forEach((id) => dispatch(toggleSelectOrder(id)));

    setAnchorEl(null);
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      gap={2}
      mb={1.5}
      flexWrap='wrap'
      sx={{
        px: 1,
        py: 1,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack direction='row' spacing={1} alignItems='center'>
        <Tooltip title='Select all visible orders'>
          <Button
            size='small'
            variant='outlined'
            onClick={() => dispatch(selectAllOrders(orders.map((o) => o.id)))}
            startIcon={<CheckIcon fontSize='small' />}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Select All
          </Button>
        </Tooltip>

        <Tooltip title='Clear selection'>
          <Button
            size='small'
            variant='outlined'
            onClick={() => {
              // deselect all selected orders that are in that column
              const visibleIds = orders.map((o) => o.id);
              visibleIds.forEach((id) => {
                if (selectedOrders.includes(id)) {
                  dispatch(toggleSelectOrder(id));
                }
              });
            }}
            startIcon={<CloseIcon fontSize='small' />}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Deselect
          </Button>
        </Tooltip>
      </Stack>

      <Box>
        <Tooltip title='Bulk update status'>
          <span>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              disabled={visibleSelected.length === 0}
              size='small'
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{ dense: true }}
        >
          {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(
            (status) => (
              <MenuItem
                key={status}
                onClick={() => handleBulkUpdate(status as OrderStatus)}
                sx={{ textTransform: 'capitalize' }}
              >
                {status}
              </MenuItem>
            )
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default BulkActions;
