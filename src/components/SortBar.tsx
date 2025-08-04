import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  Stack,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import ExportCSVButton from './ExportCSVButton';
import { type Order } from '../types/orderTypes';
import {
  SORT_OPTIONS as SortOptions,
  SORT_LABELS as sortLabels,
} from '../constants/sort';

interface Props {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (key: string) => void;
  onResetSort: () => void;
  orders: Order[];
}

const SortBar = ({
  sortBy,
  sortDirection,
  onSortChange,
  onResetSort,
  orders,
}: Props) => {
  const theme = useTheme();

  return (
    <Box
      display='flex'
      flexWrap='wrap'
      alignItems='center'
      justifyContent='space-between'
      gap={2}
      mb={4}
      py={2}
      px={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      {/* Sort Controls */}
      <Box display='flex' flexWrap='wrap' gap={1.5} alignItems='center'>
        <Typography variant='subtitle1' color='text.secondary' fontWeight={600}>
          Sort by:
        </Typography>

        {SortOptions.map((key) => {
          const isActive = sortBy === key;
          const Icon =
            isActive && sortDirection === 'asc'
              ? ArrowDropUpIcon
              : ArrowDropDownIcon;

          return (
            <Chip
              key={key}
              clickable
              variant={isActive ? 'filled' : 'outlined'}
              color={isActive ? 'primary' : 'default'}
              label={
                <Box display='flex' alignItems='center' gap={0.75}>
                  <Typography
                    fontWeight={600}
                    fontSize='1rem'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {sortLabels[key] ?? key}
                  </Typography>
                  {isActive && <Icon fontSize='medium' />}
                </Box>
              }
              onClick={() => onSortChange(key)}
              sx={{
                px: 2.5,
                py: 1.5,
                height: '40px',
                borderRadius: 3,
                fontSize: '1rem',
              }}
            />
          );
        })}
      </Box>

      {/* Right-side controls */}
      <Stack direction='row' spacing={1} alignItems='center'>
        <Tooltip title='Reset Sorting'>
          <IconButton
            size='small'
            onClick={onResetSort}
            sx={{
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 0, 0, 0.1)'
                    : 'rgba(255, 0, 0, 0.05)',
              },
            }}
          >
            <RestartAltIcon fontSize='small' />
          </IconButton>
        </Tooltip>

        <ExportCSVButton orders={orders} />
      </Stack>
    </Box>
  );
};

export default SortBar;
