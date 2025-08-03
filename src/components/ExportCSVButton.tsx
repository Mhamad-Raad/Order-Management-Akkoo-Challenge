import { useEffect } from 'react';
import { Button, useTheme } from '@mui/material';
import { Download } from '@mui/icons-material';

import { type Order } from '../types/orderTypes';
import { exportOrdersToCSV } from '../utils/exportToCSV';

interface Props {
  orders: Order[];
}

const ExportCSVButton = ({ orders }: Props) => {
  const theme = useTheme();

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
      sx={{
        mb: 3,
        px: 3,
        py: 1.5,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        fontWeight: 600,
        borderRadius: 1,
        textTransform: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(142, 68, 173, 0.1)'
              : 'rgba(25, 118, 210, 0.05)',
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      Export CSV
    </Button>
  );
};

export default ExportCSVButton;
