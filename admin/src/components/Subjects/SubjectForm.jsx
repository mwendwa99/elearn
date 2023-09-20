import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewSubject,
  getSubjects,
  deleteSubject,
  updateSubject,
} from "../../redux/subjects/subjectActions";
import { SubjectList } from "./SubjectList";

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
  const [subjectData, setSubjectData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { subjects, loading, error } = useSelector((state) => state.subjects);
  const dispatch = useDispatch();

  // useEffect to reset isUpdate to false after rerender
  useEffect(() => {
    setIsUpdate(() => false);
  }, [subjects]);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(subjects)) {
      setSubjectData(subjects);
    }
  }, [subjects]);

  useEffect(() => {
    // once dispatch is successful, reset the form
    if (!loading && !error) {
      setFormValues(initialValues);
    }
  }, [error, loading]);

  // refresh the cohortData with every dispatch
  useEffect(() => {
    if (Array.isArray(subjects)) {
      setSubjectData(subjects);
    }
  }, [subjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmitNewSubject = (e) => {
    e.preventDefault();
    // Handle form submission or validation here
    dispatch(createNewSubject(formValues));
    setIsUpdate(() => false);
    setSubjectData((prevData) => [...prevData, formValues]);
  };

  const handleEditSubject = (subject) => {
    // Handle form submission or validation here
    setFormValues(() => subject);
    setIsUpdate(() => true);
  };

  const handleUpdateSubject = (e) => {
    e.preventDefault();
    dispatch(updateSubject(formValues))
      .then(() => {
        dispatch(getSubjects());
        setIsUpdate(false);
      })
      .catch((err) => {
        console.log("error updating subject", err);
      });
  };

  const handleDeleteSubject = (subjectId) => {
    // Handle form submission or validation here
    dispatch(deleteSubject(subjectId));
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <Container maxWidth="sm">
          <Typography variant="h5" component="h2">
            Subject Form
          </Typography>
          {error && (
            <Typography variant="h5" component="h2">
              {error}
            </Typography>
          )}
          <form
            onSubmit={isUpdate ? handleUpdateSubject : handleSubmitNewSubject}
          >
            <Grid container spacing={1}>
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
                  inputProps={{
                    min: 0,
                  }}
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
                  inputProps={{
                    min: 0,
                    max: 5,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                {isUpdate ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateSubject}
                    fullWidth
                    type="submit"
                  >
                    Update Subject
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Create Subject
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grid>
      <SubjectList
        loading={loading}
        handleDeleteSubject={handleDeleteSubject}
        handleEditSubject={handleEditSubject}
        subjectData={subjectData}
      />
    </Grid>
  );
};

export default SubjectForm;
