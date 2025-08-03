import { useEffect, useRef, type SetStateAction, type Dispatch } from 'react';
import { Box, TextField, MenuItem, Slider, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

import { DATE_RANGE_OPTIONS as dateOptions } from '../constants/filters';
import type { DateRangeType } from '../types/filterTypes';

interface Props {
  searchTerm: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
  dateRange: DateRangeType;
  onDateRangeChange: Dispatch<SetStateAction<DateRangeType>>;
  amountRange: [number, number];
  onAmountChange: Dispatch<SetStateAction<[number, number]>>;
  customStartDate: Dayjs | null;
  customEndDate: Dayjs | null;
  onStartDateChange: Dispatch<SetStateAction<Dayjs | null>>;
  onEndDateChange: Dispatch<SetStateAction<Dayjs | null>>;
}

const FilterPanel = ({
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
      if (
        e.key === 'Enter' &&
        e.shiftKey &&
        document.activeElement?.tagName !== 'INPUT'
      ) {
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          label='Search'
          placeholder='Customer name or Order ID'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          inputRef={searchRef}
          inputProps={{ 'aria-label': 'Search by customer or order ID' }}
          sx={{ flex: 2, minWidth: 220 }}
        />

        <TextField
          select
          label='Date Range'
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value as DateRangeType)}
          sx={{ flex: 1, minWidth: 150 }}
        >
          {dateOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option === 'all'
                ? 'All Time'
                : option.charAt(0).toUpperCase() + option.slice(1)}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {dateRange === 'custom' && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <DatePicker
            label='Start Date'
            value={customStartDate}
            onChange={onStartDateChange}
            slotProps={{
              textField: {
                variant: 'outlined',
                sx: { width: 150 },
              },
            }}
          />
          <DatePicker
            label='End Date'
            value={customEndDate}
            onChange={onEndDateChange}
            slotProps={{
              textField: {
                variant: 'outlined',
                sx: { width: 150 },
              },
            }}
          />
        </Box>
      )}

      <Box sx={{ maxWidth: 400 }}>
        <Typography gutterBottom fontWeight={500}>
          Amount Range
        </Typography>
        <Box display='flex' justifyContent='space-between' mb={0.5}>
          <Typography variant='caption'>Min: ${amountRange[0]}</Typography>
          <Typography variant='caption'>Max: ${amountRange[1]}</Typography>
        </Box>
        <Slider
          value={amountRange}
          onChange={(_, newValue) =>
            onAmountChange(newValue as [number, number])
          }
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
