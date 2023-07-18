import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const UserTypeSelector = ({ disabled, onChange, value }) => {
  const handleTypeChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <FormControl>
      <InputLabel id="user-type-label">User Type</InputLabel>
      <Select
        labelId="user-type-label"
        id="user-type"
        onChange={handleTypeChange}
        disabled={disabled}
        label="Register as"
        sx={{ minWidth: 120 }}
        value={value ? value : ""}
        required
      >
        <MenuItem value="Student">Student</MenuItem>
        <MenuItem value="Tutor">Tutor</MenuItem>
      </Select>
    </FormControl>
  );
};

export default UserTypeSelector;
