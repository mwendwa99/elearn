import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

const SubjectForm = () => {
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
        Subject Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
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
              name="price"
              label="Price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="rating"
              label="Rating"
              type="number"
              value={formValues.rating}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="photoUrl"
              label="Photo URL"
              type="text"
              value={formValues.photoUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SubjectForm;
