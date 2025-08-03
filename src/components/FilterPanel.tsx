import { useEffect, useRef } from 'react';

import { Box, TextField, MenuItem, Slider, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

const statusOptions = [
  'all',
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];
const dateOptions = ['all', 'today', 'week', 'month', 'custom'];

interface Props {
  status: string;
  onStatusChange: (value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  amountRange: number[];
  onAmountChange: (value: number[]) => void;
  customStartDate: Dayjs | null;
  customEndDate: Dayjs | null;
  onStartDateChange: (value: Dayjs | null) => void;
  onEndDateChange: (value: Dayjs | null) => void;
}

const FilterPanel = ({
  status,
  onStatusChange,
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  amountRange,
  onAmountChange,
  customStartDate,
  customEndDate,
  onStartDateChange,
  onEndDateChange,
}: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.tagName !== 'INPUT') {
        searchRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchRef]);
  return (
    <Box display='flex' gap={2} mb={3} flexWrap='wrap' alignItems='center'>
      <TextField
        label='Search'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Customer or Order ID'
        inputRef={searchRef}
      />

      <TextField
        select
        label='Status'
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label='Date'
        value={dateRange}
        onChange={(e) => onDateRangeChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        {dateOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option === 'all'
              ? 'All Time'
              : option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </TextField>

      {/* Always show custom date inputs */}
      <Box display='flex' gap={2} alignItems='center'>
        <DatePicker
          label='Start Date'
          value={customStartDate}
          onChange={onStartDateChange}
          disabled={dateRange !== 'custom'}
          slotProps={{
            textField: {
              variant: 'outlined',
              sx: {
                width: 150,
                opacity: dateRange === 'custom' ? 1 : 0.6,
              },
            },
          }}
        />
        <DatePicker
          label='End Date'
          value={customEndDate}
          onChange={onEndDateChange}
          disabled={dateRange !== 'custom'}
          slotProps={{
            textField: {
              variant: 'outlined',
              sx: {
                width: 150,
                opacity: dateRange === 'custom' ? 1 : 0.6,
              },
            },
          }}
        />
      </Box>

      <Box width={250}>
        <Typography gutterBottom>Amount Range</Typography>
        <Box display='flex' justifyContent='space-between' mb={0.5}>
          <Typography variant='caption'>Min: ${amountRange[0]}</Typography>
          <Typography variant='caption'>Max: ${amountRange[1]}</Typography>
        </Box>
        <Slider
          value={amountRange}
          onChange={(_, newValue) => onAmountChange(newValue as number[])}
          valueLabelDisplay='auto'
          min={0}
          max={2000}
          step={10}
        />
      </Box>
    </Box>
  );
};

export default FilterPanel;
