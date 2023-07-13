import { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

const initialValues = {
  description: "",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  title: "",
  subtitle: "",
  school: "",
  photoUrl: "",
};

const CohortForm = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission or validation here
    console.log(formValues);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Cohort Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              name="description"
              label="Description"
              value={formValues.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="startDate"
              label="Start Date"
              type="date"
              value={formValues.startDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="endDate"
              label="End Date"
              type="date"
              value={formValues.endDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="title"
              label="Title"
              value={formValues.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="subtitle"
              label="Subtitle"
              value={formValues.subtitle}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="school"
              label="School"
              value={formValues.school}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="photoUrl"
              label="Photo URL"
              value={formValues.photoUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CohortForm;
