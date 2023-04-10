import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const SubjectSelect = () => {
  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Computer Science",
  ];

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel id="subject-select-label">Subject</InputLabel>
      <Select
        labelId="subject-select-label"
        id="subject-select"
        label="Subject"
      >
        {subjects.map((subject) => (
          <MenuItem value={subject}>{subject}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubjectSelect;
