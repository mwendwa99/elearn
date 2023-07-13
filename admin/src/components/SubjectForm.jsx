import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewSubject } from "../redux/subjects/subjectActions";

const initialValues = {
  title: "",
  subtitle: "",
  description: "",
  price: 0,
  rating: 0,
  photoUrl: "",
};

const SubjectForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const { loading, error } = useSelector((state) => state.subjects);
  const dispatch = useDispatch();

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
    dispatch(createNewSubject(formValues));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h2">
        Subject Form
      </Typography>
      {loading && <CircularProgress />}
      {error && (
        <Typography variant="h5" component="h2">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              name="subtitle"
              label="Subtitle"
              value={formValues.subtitle}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="price"
              label="Price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="rating"
              label="Rating"
              type="number"
              value={formValues.rating}
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
              type="text"
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
