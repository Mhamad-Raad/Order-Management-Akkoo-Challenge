import { useEffect, useRef, type SetStateAction, type Dispatch } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Slider,
  Typography,
  Button,
  Divider,
} from '@mui/material';
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
        px: 1,
        py: 2,
        minWidth: 280,
      }}
    >
      <Typography variant='h6' fontWeight={600}>
        Filters
      </Typography>

      {/* 🔍 Search */}
      <Box>
        <Typography variant='subtitle2' gutterBottom>
          Search
        </Typography>
        <TextField
          fullWidth
          size='small'
          placeholder='Customer or Order ID'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          inputRef={searchRef}
        />
      </Box>

      {/* 🗓 Date Range */}
      <Box>
        <Typography variant='subtitle2' gutterBottom>
          Date Range
        </Typography>
        <TextField
          fullWidth
          select
          size='small'
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value as DateRangeType)}
        >
          {dateOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option === 'all'
                ? 'All Time'
                : option.charAt(0).toUpperCase() + option.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        {dateRange === 'custom' && (
          <Box mt={2} display='flex' gap={2}>
            <DatePicker
              label='Start'
              value={customStartDate}
              onChange={onStartDateChange}
              slotProps={{
                textField: { size: 'small', fullWidth: true },
              }}
            />
            <DatePicker
              label='End'
              value={customEndDate}
              onChange={onEndDateChange}
              slotProps={{
                textField: { size: 'small', fullWidth: true },
              }}
            />
          </Box>
        )}
      </Box>

      {/* 💵 Amount Range */}
      <Box>
        <Typography variant='subtitle2' gutterBottom>
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

      <Divider sx={{ my: 1 }} />

      {/* 🔁 Reset */}
      <Button
        variant='outlined'
        size='medium'
        color='secondary'
        onClick={() => {
          onSearchChange('');
          onDateRangeChange('all');
          onAmountChange([0, 2000]);
          onStartDateChange(null);
          onEndDateChange(null);
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterPanel;
