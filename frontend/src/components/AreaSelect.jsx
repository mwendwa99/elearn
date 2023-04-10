import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const AreaSelect = () => {
  const areas = ["Algebra", "Geometry", "Calculus", "Reading", "Writing"];

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel id="area-select-label">Area</InputLabel>
      <Select labelId="area-select-label" id="area-select" label="Area">
        {areas.map((area) => (
          <MenuItem value={area}>{area}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AreaSelect;
