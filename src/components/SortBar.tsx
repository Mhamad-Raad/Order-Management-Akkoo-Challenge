import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
  SORT_OPTIONS as SortOptions,
  SORT_LABELS as sortLabels,
} from '../constants/sort';

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
  const theme = useTheme();

  return (
    <Box
      display='flex'
      flexWrap='wrap'
      alignItems='center'
      justifyContent='space-between'
      gap={2}
      mb={4}
      py={1}
      px={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Box display='flex' gap={1.5} flexWrap='wrap' alignItems='center'>
        <Typography variant='subtitle2' color='text.secondary' fontWeight={500}>
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
                <Box display='flex' alignItems='center' gap={0.5}>
                  <span>{sortLabels[key] ?? key}</span>
                  {isActive && <Icon fontSize='small' />}
                </Box>
              }
              onClick={() => onSortChange(key)}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                px: 1.5,
              }}
            />
          );
        })}
      </Box>

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
    </Box>
  );
};

export default SortBar;
