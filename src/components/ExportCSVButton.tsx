import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import { type Order } from '../store/OrderSlices/orderTypes';

interface Props {
  orders: Order[];
}

const ExportCSVButton = ({ orders }: Props) => {
  const handleExport = () => {
    if (orders.length === 0) return;

    const headers = [
      'Order ID',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Order Status',
      'Order Date',
      'Shipping Address',
      'Item Name',
      'Item Quantity',
      'Item Price',
      'Item SKU',
      'Order Total',
    ];

    const rows: string[][] = [];

    orders.forEach((order) => {
      const shipping = `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}, ${order.shippingAddress.country}`;
      const formattedDate = new Date(order.orderDate).toLocaleString();

      if (order.items.length === 0) {
        rows.push([
          order.id,
          order.customerName,
          order.customerEmail,
          order.customerPhone,
          order.status,
          formattedDate,
          shipping,
          '',
          '',
          '',
          '',
          `$${order.total.toFixed(2)}`,
        ]);
      } else {
        order.items.forEach((item, index) => {
          const base =
            index === 0
              ? [
                  order.id,
                  order.customerName,
                  order.customerEmail,
                  order.customerPhone,
                  order.status,
                  formattedDate,
                  shipping,
                ]
              : ['', '', '', '', '', '', ''];

          rows.push([
            ...base,
            item.name,
            item.quantity.toString(),
            `$${item.price.toFixed(2)}`,
            item.sku,
            index === 0 ? `$${order.total.toFixed(2)}` : '',
          ]);
        });
      }
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows]
        .map((row) => row.map((v) => `"${v}"`).join(','))
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'orders_detailed_grouped.csv');
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
