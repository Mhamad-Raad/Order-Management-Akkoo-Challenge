import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import { type Order } from '../store/OrderSlices/orderTypes';

interface Props {
  orders: Order[];
}

const ExportCSVButton = ({ orders }: Props) => {
  const handleExport = () => {
    if (orders.length === 0) return;

    const headers = ['ID', 'Customer Name', 'Status', 'Total', 'Order Date'];
    const rows = orders.map((order) => [
      order.id,
      order.customerName,
      order.status,
      `$${order.total.toFixed(2)}`,
      new Date(order.orderDate).toLocaleDateString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant='outlined'
      startIcon={<Download />}
      onClick={handleExport}
      sx={{ mb: 3 }}
    >
      Export CSV
    </Button>
  );
};

export default ExportCSVButton;
