import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  CircularProgress,
  CardContent,
  Divider,
  CardActions,
  CardMedia,
  Card,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  getCourses,
  deleteCourse,
  updateCourse,
} from "../redux/courses/courseActions";
import { getTutors } from "../redux/users/userActions";

const initialValues = {
  title: "",
  subtitle: "",
  description: "",
  price: 0,
  photoUrl: "",
  tutorId: "",
};

const CourseForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [courseData, setCourseData] = useState([]);
  const [tutorData, setTutorData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { courseList, loading, error } = useSelector((state) => state.courses);
  const {
    tutors,
    loading: tutorLoading,
    error: tutorError,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  //   console.log("courseData   ", courseList);

  // useEffect to reset isUpdate to false after rerender
  useEffect(() => {
    setIsUpdate(() => false);
  }, [courseList]);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getTutors());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(courseList)) {
      setCourseData(courseList);
    }
    if (Array.isArray(tutors)) {
      setTutorData(tutors);
    }
  }, [courseList, tutors]);

  useEffect(() => {
    // once dispatch is successful, reset the form
    if (!loading && !error) {
      setFormValues(initialValues);
    }
    if (!tutorLoading && !tutorError) {
      setFormValues(initialValues);
    }
  }, [error, loading, tutorError, tutorLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmitNewCourse = (e) => {
    e.preventDefault();
    // Handle form submission or validation here
    dispatch(createCourse(formValues));
    setIsUpdate(() => false);
    setCourseData((prevData) => [...prevData, formValues]);
    // console.log("formValues", formValues);
  };

  const handleEditCourse = (course) => {
    // Handle form submission or validation here
    setFormValues(() => course);
    setIsUpdate(() => true);
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    dispatch(updateCourse(formValues))
      .then(() => {
        dispatch(getCourses());
        setIsUpdate(false);
      })
      .catch((err) => {
        console.log("error updating course", err);
      });
  };

  const handleDeleteCourse = (courseId) => {
    // Handle form submission or validation here
    dispatch(deleteCourse(courseId));
    // trigger a rerender
    dispatch(getCourses());
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <Container maxWidth="sm">
          <Typography variant="h5" component="h2">
            Course Form
          </Typography>
          {loading && (
            <Box
              component="div"
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 9999,
              }}
            >
              <CircularProgress
                size={40}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            </Box>
          )}
          {error && (
            <Typography variant="h5" component="h2">
              {error.message}
            </Typography>
          )}
          <form
            onSubmit={isUpdate ? handleUpdateCourse : handleSubmitNewCourse}
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tutor</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formValues.tutorId}
                    name="tutorId"
                    label="Tutor"
                    onChange={handleChange}
                  >
                    {tutorData.map((tutor, index) => (
                      <MenuItem key={index} value={tutor.userId}>
                        {tutor.displayName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                    onClick={handleUpdateCourse}
                    fullWidth
                    type="submit"
                  >
                    Update Course
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Create Course
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grid>
      <Grid item xs={5}>
        <Typography align="center" variant="h6">
          Courses
        </Typography>
        <Container
          maxWidth="xs"
          sx={{
            overflow: "scroll",
            overflowX: "hidden",
            height: "500px",
            minWidth: "300px",
          }}
        >
          {courseData &&
            courseData.map((course, index) => (
              <Card sx={{ maxWidth: "100%", my: 1 }} key={index}>
                <CardMedia
                  component="img"
                  sx={{
                    maxHeight: "100px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                  image={course.photoUrl}
                  title={course.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {course.subtitle}
                  </Typography>
                  <Divider />
                  <Typography variant="body2" color="text.secondary">
                    ${course.price}
                  </Typography>

                  {tutorData && (
                    <Typography variant="body2" color="text.secondary">
                      tutor:{" "}
                      {tutorData.find(
                        (tutor) => tutor.userId === course.tutorId
                      ) &&
                        tutorData.find(
                          (tutor) => tutor.userId === course.tutorId
                        ).email}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleEditCourse(course)}>
                    edit
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDeleteCourse(course.courseId)}
                  >
                    delete
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Container>
      </Grid>
    </Grid>
  );
};

export default CourseForm;
