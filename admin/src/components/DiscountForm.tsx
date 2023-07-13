import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";

interface DiscountFormValues {
  endDate: string;
  startDate: string;
  percentage: number;
  title: string;
  description: string;
  photoUrl: string;
}

const initialDiscountFormValues: DiscountFormValues = {
  endDate: new Date().toISOString().slice(0, 10),
  startDate: new Date().toISOString().slice(0, 10),
  percentage: 0,
  title: "",
  description: "",
  photoUrl: "",
};

const DiscountForm: React.FC = () => {
  const [formValues, setFormValues] = useState<DiscountFormValues>(
    initialDiscountFormValues
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission or validation here
    console.log(formValues);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Discount Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="startDate"
              label="start of discount"
              type="string"
              value={formValues.startDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="endDate"
              label="end of discount"
              type="string"
              value={formValues.endDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="percentage"
              label="Percentage"
              type="number"
              value={formValues.percentage}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="title"
              label="Title"
              value={formValues.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="photoUrl"
              label="Photo URL"
              value={formValues.photoUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default DiscountForm;
