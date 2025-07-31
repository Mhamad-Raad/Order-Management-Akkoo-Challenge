import { Box, TextField, MenuItem, Slider, Typography } from '@mui/material';

const statusOptions = [
  'all',
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];
const dateOptions = ['all', 'today', 'week', 'month'];

interface Props {
  status: string;
  onStatusChange: (value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  amountRange: number[];
  onAmountChange: (value: number[]) => void;
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
}: Props) => {
  return (
    <Box display='flex' gap={2} mb={3} flexWrap='wrap'>
      <TextField
        label='Search'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Customer or Order ID'
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

      <Box width={250}>
        <Typography gutterBottom>Amount Range</Typography>

        <Box display='flex' justifyContent='space-between' mb={0.5}>
          <Typography variant='caption' color='text.secondary'>
            Min: ${amountRange[0]}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Max: ${amountRange[1]}
          </Typography>
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
