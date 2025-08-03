import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState, useEffect, useRef } from 'react';
import {
  useSensor,
  useSensors,
  MouseSensor,
  DndContext,
  closestCenter,
  DragOverlay,
} from '@dnd-kit/core';
import { useSnackbar } from 'notistack';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { type RootState } from '../../store';
import { type Order } from '../../types/orderTypes';
import {
  loadOrders,
  updateSingleOrderStatus,
} from '../../store/OrderSlices/orderSlice';

import OrderSummary from './OrdersSummary';
import ExportCSVButton from '../ExportCSVButton';
import FilterPanel from '../FilterPanel';
import SortBar from '../SortBar';
import BulkActions from '../BulkActions';
import StatusColumn from './StatusColumn';
import OrderCard from './OrderCard';
import { generateId } from '../../utils/generateId';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

import { ORDER_STATUSES } from '../../constants/orderStatus';
import { type OrderStatus } from '../../types/orderTypes';

import { DATE_RANGE_OPTIONS } from '../../constants/filters';
import { type SortKey } from '../../types/filterTypes';

dayjs.extend(isBetween);

interface Props {
  openModal: (order: Order) => void;
}

const OrderBoard = ({ openModal }: Props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const orders = useSelector((state: RootState) => state.orders.orders);

  const ordersRef = useRef(orders);
  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] =
    useState<(typeof DATE_RANGE_OPTIONS)[number]>('all');
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 2000]);
  const [customStartDate, setCustomStartDate] = useState<Dayjs | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Dayjs | null>(null);
  const [sortBy, setSortBy] = useState<SortKey | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
  const statuses = useMemo(() => ORDER_STATUSES, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.customerName.toLowerCase().includes(term) ||
          o.id.toLowerCase().includes(term)
      );
    }

    switch (dateRange) {
      case 'today':
        result = result.filter((o) =>
          dayjs(o.orderDate).isSame(dayjs(), 'day')
        );
        break;
      case 'week':
        result = result.filter((o) =>
          dayjs(o.orderDate).isAfter(dayjs().subtract(7, 'days'))
        );
        break;
      case 'month':
        result = result.filter((o) =>
          dayjs(o.orderDate).isAfter(dayjs().subtract(1, 'month'))
        );
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          result = result.filter((o) =>
            dayjs(o.orderDate).isBetween(
              customStartDate,
              customEndDate,
              'day',
              '[]'
            )
          );
        }
        break;
    }

    result = result.filter(
      (o) => o.total >= amountRange[0] && o.total <= amountRange[1]
    );

    if (sortBy) {
      result.sort((a, b) => {
        let valA: string | number = '';
        let valB: string | number = '';

        switch (sortBy) {
          case 'date':
            valA = new Date(a.orderDate).getTime();
            valB = new Date(b.orderDate).getTime();
            break;
          case 'amount':
            valA = a.total;
            valB = b.total;
            break;
          case 'customer':
            valA = a.customerName.toLowerCase();
            valB = b.customerName.toLowerCase();
            break;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [
    orders,
    debouncedSearchTerm,
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
        status: statuses[
          Math.floor(Math.random() * statuses.length)
        ] as OrderStatus,
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

      dispatch(loadOrders([...ordersRef.current, newOrder]));
      enqueueSnackbar(`New order from ${newOrder.customerName}`, {
        variant: 'info',
      });
    }, 12000);

    const statusChangeInterval = setInterval(() => {
      const current = ordersRef.current;
      if (!current.length) return;

      const randomOrder = current[Math.floor(Math.random() * current.length)];
      const newStatus = statuses[
        Math.floor(Math.random() * statuses.length)
      ] as OrderStatus;

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
    }, 15000);

    return () => {
      clearInterval(addOrderInterval);
      clearInterval(statusChangeInterval);
    };
  }, [dispatch, enqueueSnackbar, statuses]);

  const handleOpenModal = (order: Order) => {
    openModal(order);
  };

  return (
    <>
      <Typography variant='h5' fontWeight={600} sx={{ mb: 2 }}>
        Orders Board
      </Typography>

      <OrderSummary />
      <ExportCSVButton orders={filteredOrders} />

      <FilterPanel
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
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
          } else {
            setSortBy(key as SortKey);
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
        onDragStart={({ active }) => {
          const dragged = orders.find((o) => o.id === active.id);
          if (dragged) setActiveOrder(dragged);
        }}
        onDragEnd={({ active, over }) => {
          setActiveOrder(null);
          if (!over || !active) return;

          const fromId = active.id;
          const toStatus = over.id;
          if (
            fromId &&
            toStatus &&
            active.data.current?.status &&
            active.data.current.status !== toStatus
          ) {
            dispatch(
              updateSingleOrderStatus({
                id: fromId as string,
                status: toStatus as OrderStatus,
              })
            );
            enqueueSnackbar(`Order ${fromId} moved to ${toStatus}`, {
              variant: 'success',
            });
          }
        }}
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
                {...({ item: true } as any)}
                key={status}
                sx={{
                  minWidth: { xs: '100%', sm: '380px', md: '400px' },
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
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
          {activeOrder && <OrderCard order={activeOrder} isDragging />}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default OrderBoard;
