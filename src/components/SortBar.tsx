import { Box, Button } from '@mui/material';

import {
  SORT_OPTIONS as SortOptions,
  SORT_LABELS as sortLabels,
} from '../constants';

interface Props {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (key: string) => void;
  onResetSort: () => void;
}

const SortBar = ({
  sortBy,
  sortDirection,
  onSortChange,
  onResetSort,
}: Props) => {
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
            aria-pressed={sortBy === key}
          >
            {sortLabels[key] ?? key}
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
