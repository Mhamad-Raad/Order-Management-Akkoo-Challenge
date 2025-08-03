import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import OrderSummary from './OrdersSummary';
import isBetween from 'dayjs/plugin/isBetween';
import { type RootState } from '../../store';
import { Grid, Typography, Button } from '@mui/material';
import StatusColumn from './StatusColumn';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useMemo, useState, useEffect } from 'react';
import { type Order } from '../../types/orderTypes';
import OrderCard from './OrderCard';
import dayjs, { Dayjs } from 'dayjs';
import {
  loadOrders,
  updateSingleOrderStatus,
} from '../../store/OrderSlices/orderSlice';

import ExportCSVButton from '../ExportCSVButton';
import FilterPanel from '../FilterPanel';
import SortBar from '../SortBar';
import BulkActions from '../BulkActions';

import { generateId } from '../../utils/generateId';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

dayjs.extend(isBetween);

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

interface Props {
  openModal: (order: Order) => void;
}

const OrderBoard = ({ openModal }: Props) => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
  const [dateRange, setDateRange] = useState('all');
  const [amountRange, setAmountRange] = useState([0, 2000]);
  const [customStartDate, setCustomStartDate] = useState<Dayjs | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Dayjs | null>(null);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleDragStart = (event: any) => {
    const { active } = event;
    const draggedOrder = orders.find((o) => o.id === active.id);
    if (draggedOrder) setActiveOrder(draggedOrder);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveOrder(null);
    if (!over || !active) return;
    const fromId = active.id;
    const toStatus = over.id;
    if (fromId && toStatus && active.data.current?.status !== toStatus) {
      dispatch(updateSingleOrderStatus({ id: fromId, status: toStatus }));
      enqueueSnackbar(`Order ${fromId} moved to ${toStatus}`, {
        variant: 'success',
      });
    }
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor);

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    if (statusFilter !== 'all') {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.customerName.toLowerCase().includes(term) ||
          o.id.toLowerCase().includes(term)
      );
    }
    if (dateRange === 'today') {
      result = result.filter((o) => dayjs(o.orderDate).isSame(dayjs(), 'day'));
    } else if (dateRange === 'week') {
      result = result.filter((o) =>
        dayjs(o.orderDate).isAfter(dayjs().subtract(7, 'days'))
      );
    } else if (dateRange === 'month') {
      result = result.filter((o) =>
        dayjs(o.orderDate).isAfter(dayjs().subtract(1, 'month'))
      );
    } else if (dateRange === 'custom' && customStartDate && customEndDate) {
      result = result.filter((o) =>
        dayjs(o.orderDate).isBetween(
          customStartDate,
          customEndDate,
          'day',
          '[]'
        )
      );
    }
    result = result.filter(
      (o) => o.total >= amountRange[0] && o.total <= amountRange[1]
    );
    if (sortBy) {
      result = result.sort((a, b) => {
        let valA: any, valB: any;
        if (sortBy === 'date') {
          valA = new Date(a.orderDate).getTime();
          valB = new Date(b.orderDate).getTime();
        } else if (sortBy === 'amount') {
          valA = a.total;
          valB = b.total;
        } else if (sortBy === 'customer') {
          valA = a.customerName.toLowerCase();
          valB = b.customerName.toLowerCase();
        } else if (sortBy === 'status') {
          valA = a.status;
          valB = b.status;
        }
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [
    orders,
    statusFilter,
    searchTerm,
    dateRange,
    amountRange,
    customStartDate,
    customEndDate,
    sortBy,
    sortDirection,
  ]);

  useEffect(() => {
    const addOrderInterval = setInterval(() => {
      const newOrder: Order = {
        id: generateId(),
        customerName: `Customer ${Math.floor(Math.random() * 1000)}`,
        customerEmail: `customer${Math.floor(
          Math.random() * 1000
        )}@example.com`,
        customerPhone: `+1-${Math.floor(
          1000000000 + Math.random() * 9000000000
        )}`,
        orderDate: new Date().toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        items: [
          {
            id: `item_${Math.floor(Math.random() * 1000)}`,
            name: `Product ${Math.floor(Math.random() * 100)}`,
            quantity: Math.ceil(Math.random() * 3),
            price: parseFloat((Math.random() * 50 + 10).toFixed(2)),
            sku: `SKU-${Math.floor(Math.random() * 10000)}`,
          },
        ],
        total: 0,
        shippingAddress: {
          street: '123 Dev Street',
          city: 'Devville',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
        },
      };

      newOrder.total = newOrder.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      dispatch(loadOrders([...orders, newOrder]));
      enqueueSnackbar(`New order from ${newOrder.customerName}`, {
        variant: 'info',
      });
    }, 10000 + Math.random() * 5000);

    const statusChangeInterval = setInterval(() => {
      if (orders.length === 0) return;
      const randomOrder = orders[Math.floor(Math.random() * orders.length)];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      if (randomOrder.status !== newStatus) {
        dispatch(
          updateSingleOrderStatus({ id: randomOrder.id, status: newStatus })
        );
        enqueueSnackbar(
          `Order ${randomOrder.id} status changed to ${newStatus}`,
          {
            variant: 'success',
          }
        );
      }
    }, 12000 + Math.random() * 3000);

    return () => {
      clearInterval(addOrderInterval);
      clearInterval(statusChangeInterval);
    };
  }, [orders, dispatch]);

  const handleOpenModal = (order: Order) => {
    openModal(order);
    console.log('Opening modal for order:', order);
  };

  return (
    <>
      <Typography variant='h5' fontWeight={600} sx={{ mb: 2 }}>
        Orders Board
      </Typography>
      <OrderSummary />
      <ExportCSVButton orders={filteredOrders} />
      <FilterPanel
        status={statusFilter}
        onStatusChange={setStatusFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        amountRange={amountRange}
        onAmountChange={setAmountRange}
        customStartDate={customStartDate}
        customEndDate={customEndDate}
        onStartDateChange={setCustomStartDate}
        onEndDateChange={setCustomEndDate}
      />
      <Button
        variant='outlined'
        size='small'
        color='secondary'
        sx={{ mb: 2 }}
        onClick={() => {
          setStatusFilter('all');
          setSearchTerm('');
          setDateRange('all');
          setAmountRange([0, 2000]);
          setCustomStartDate(null);
          setCustomEndDate(null);
        }}
      >
        Reset Filters
      </Button>
      <SortBar
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={(key) => {
          if (sortBy === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
          } else {
            setSortBy(key);
            setSortDirection('asc');
          }
        }}
        onResetSort={() => {
          setSortBy('');
          setSortDirection('asc');
        }}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Grid
          container
          spacing={2}
          wrap='nowrap'
          sx={{ overflowX: 'auto', pb: 2 }}
        >
          {statuses.map((status) => {
            const filtered = filteredOrders.filter((o) => o.status === status);
            return (
              <Grid
                item
                key={status}
                sx={{
                  minWidth: { xs: '100%', sm: '380px', md: '400px' },
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
                {...({} as any)}
              >
                <BulkActions orders={filtered} />
                <StatusColumn
                  status={status}
                  orders={filtered}
                  onOpenModal={handleOpenModal}
                  activeOrder={activeOrder}
                />
              </Grid>
            );
          })}
        </Grid>
        <DragOverlay>
          {activeOrder && <OrderCard order={activeOrder} isDragging={true} />}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default OrderBoard;
