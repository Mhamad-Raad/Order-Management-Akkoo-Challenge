import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';

import { type Order } from '../types/orderTypes';

import { exportOrdersToCSV } from '../utils/exportToCSV';

interface Props {
  orders: Order[];
}

const ExportCSVButton = ({ orders }: Props) => {
  const handleExport = () => {
    exportOrdersToCSV(orders);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === 's'
      ) {
        e.preventDefault();
        handleExport();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [orders]);

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
