import { Box, Button } from '@mui/material';

interface Props {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (key: string) => void;
  onResetSort: () => void;
}

const SortOptions = ['date', 'amount', 'customer', 'status'];

const SortBar = ({
  sortBy,
  sortDirection,
  onSortChange,
  onResetSort,
}: Props) => {
  const getLabel = (key: string) => {
    switch (key) {
      case 'date':
        return 'Date';
      case 'amount':
        return 'Amount';
      case 'customer':
        return 'Customer';
      case 'status':
        return 'Status';
      default:
        return key;
    }
  };

  return (
    <Box
      display='flex'
      gap={2}
      alignItems='center'
      justifyContent='space-between'
      borderBottom='1px solid'
      borderColor='divider'
      mb={3}
      pb={1}
    >
      <Box display='flex' gap={1}>
        {SortOptions.map((key) => (
          <Button
            key={key}
            variant={sortBy === key ? 'contained' : 'outlined'}
            size='small'
            onClick={() => onSortChange(key)}
          >
            {getLabel(key)}
            {sortBy === key ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
          </Button>
        ))}
      </Box>

      <Button onClick={onResetSort} size='small' color='error'>
        Reset Sorting
      </Button>
    </Box>
  );
};

export default SortBar;
