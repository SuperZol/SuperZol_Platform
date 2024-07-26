import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const MAX = 20;
const MIN = 1;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

export default function CustomMarks({ value, onChange }) {
  const handleChange = (_, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        marks={marks}
        step={1}
        value={value}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => onChange(MIN)}
          sx={{ cursor: 'pointer' }}
        >
          {MIN} KM
        </Typography>
        <Typography
          variant="body2"
          onClick={() => onChange(MAX)}
          sx={{ cursor: 'pointer' }}
        >
          {MAX} KM
        </Typography>
      </Box>
    </Box>
  );
}
