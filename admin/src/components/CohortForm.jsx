import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  createNewCohort,
  getCohorts,
  updateCohort,
} from "../redux/cohorts/cohortActions";

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

  const handleFormAction = (actionType, cohort) => {
    switch (actionType) {
      case "add":
        setIsUpdate(() => false);
        break;
      case "update":
        setFormValues(() => cohort);
        console.log("id", cohort.cohortId);
        setIsUpdate(() => true);
        break;
      default:
        break;
    }
  };

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

  const handleUpdateCohort = (e) => {
    e.preventDefault();
    // Handle form submission or validation here
    // console.log("update", formValues);
    dispatch(updateCohort(formValues));
  };

  return (
    <Grid container>
      <Grid item xs={8}>
        <Container maxWidth="sm">
          {loading && <CircularProgress />}
          {error && (
            <Typography variant="body1" color="text.error" component="h2">
              {error}
            </Typography>
          )}

          <Typography variant="h5" component="h2">
            Cohort Details
          </Typography>
          <form
            onSubmit={isUpdate ? handleUpdateCohort : handleSubmitNewCohort}
          >
            <Grid container spacing={2}>
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
      <Grid item xs={4}>
        <Container
          maxWidth="sm"
          sx={{
            overflow: "scroll",
            overflowX: "hidden",
            height: "500px",
            width: "300px",
          }}
        >
          {cohortData &&
            cohortData.map((cohort, index) => (
              <Card sx={{ maxWidth: "100%", my: 1 }} key={index}>
                <CardActionArea
                  onClick={() => handleFormAction("update", cohort)}
                >
                  <CardMedia
                    sx={{ height: 100 }}
                    image={cohort.photoUrl}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {cohort.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cohort.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small">delete</Button>
                </CardActions>
              </Card>
            ))}
        </Container>
      </Grid>
    </Grid>
  );
};

export default CohortForm;
