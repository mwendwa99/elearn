import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  createNewCohort,
  getCohorts,
  updateCohort,
  deleteCohort,
} from "../../redux/cohorts/cohortActions";
import { CohortList } from "./CohortList";

const initialValues = {
  description: "",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  title: "",
  subtitle: "",
  school: "",
  photoUrl: "",
  update: false,
};

const CohortForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [isUpdate, setIsUpdate] = useState(false);
  const { cohorts, loading, error } = useSelector((state) => state.cohorts);
  const [cohortData, setCohortData] = useState([]);
  const dispatch = useDispatch();

  // useEffect to reset isUpdate to false after rerender
  useEffect(() => {
    setIsUpdate(() => false);
  }, [cohorts]);

  useEffect(() => {
    dispatch(getCohorts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(cohorts)) {
      setCohortData(cohorts);
    }
  }, [cohorts]);

  useEffect(() => {
    // once dispatch is successful, reset the form
    if (!loading && !error) {
      setFormValues(initialValues);
    }
  }, [error, loading]);

  // refresh the cohortData with every dispatch
  useEffect(() => {
    if (Array.isArray(cohorts)) {
      setCohortData(cohorts);
    }
  }, [cohorts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmitNewCohort = (e) => {
    e.preventDefault();
    // Handle form submission or validation here
    dispatch(createNewCohort(formValues));
    setIsUpdate(() => false);
    setCohortData((prevData) => [...prevData, formValues]);
  };

  const handleEditCohort = (cohort) => {
    // Handle form submission or validation here
    setFormValues(() => cohort);
    setIsUpdate(() => true);
  };

  const handleUpdateCohort = (e) => {
    e.preventDefault();
    dispatch(updateCohort(formValues))
      .then(() => {
        dispatch(getCohorts());
        setIsUpdate(false);
      })
      .catch((err) => {
        console.log("error updating cohort", err);
      });
  };

  const handleDeleteCohort = (cohortId) => {
    // Handle form submission or validation here
    dispatch(deleteCohort(cohortId));
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <Container maxWidth="sm">
          {error && (
            <Typography variant="body1" color="text.error" component="h2">
              {error}
            </Typography>
          )}

          <Typography align="center" variant="h6">
            Cohort Details
          </Typography>
          <form
            onSubmit={isUpdate ? handleUpdateCohort : handleSubmitNewCohort}
          >
            <Grid container spacing={1}>
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
                  name="school"
                  label="School"
                  value={formValues.school}
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
              <Grid item xs={12}>
                {isUpdate ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateCohort}
                    fullWidth
                    type="submit"
                  >
                    Update Cohort
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Create Cohort
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grid>
      <CohortList
        loading={loading}
        handleDeleteCohort={handleDeleteCohort}
        handleEditCohort={handleEditCohort}
        cohortData={cohortData}
      />
    </Grid>
  );
};

export default CohortForm;
