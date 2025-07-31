import { Box, TextField, MenuItem } from '@mui/material';

const statusOptions = [
  'all',
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

interface Props {
  status: string;
  onStatusChange: (value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const FilterPanel = ({
  status,
  onStatusChange,
  searchTerm,
  onSearchChange,
}: Props) => {
  return (
    <Box display='flex' gap={2} mb={3} flexWrap='wrap'>
      <TextField
        label='Search'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Customer or Order ID'
        fullWidth
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
    </Box>
  );
};

export default FilterPanel;
