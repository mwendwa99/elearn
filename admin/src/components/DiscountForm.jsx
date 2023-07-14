import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewDiscount } from "../redux/discounts/discountActions";

const initialValues = {
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  percentage: 0,
  title: "",
  description: "",
  photoUrl: "",
};

const DiscountForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.discounts);
  useEffect(() => {
    // once dispatch is successful, reset the form
    if (!loading && !error) {
      setFormValues(initialValues);
    }
  }, [dispatch, error, loading]);

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
    dispatch(createNewDiscount(formValues));
  };

  return (
    <Container maxWidth="sm">
      {loading && <CircularProgress />}
      {error && (
        <Typography variant="h5" component="h2">
          {error}
        </Typography>
      )}

      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Discount Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
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
              required
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
              required
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
              required
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
              required
              name="photoUrl"
              label="Photo URL"
              value={formValues.photoUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="description"
              label="Description"
              value={formValues.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
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
