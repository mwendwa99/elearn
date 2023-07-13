import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewDiscount } from "../redux/discounts/discountActions";

const DiscountForm = () => {
  const [formValues, setFormValues] = useState(initialDiscountFormValues);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

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
    dispatch(createNewDiscount(formValues));
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
              type="date"
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
              type="date"
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
