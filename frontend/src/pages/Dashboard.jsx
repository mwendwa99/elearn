import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCourses, getUserCourses } from "../redux/courses/courseActions";
import { useModal } from "../context/ModalContext";
import { clearError, clearMessage } from "../redux/courses/courseSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.course);
  const { openModal } = useModal();

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const isUserEnrolled = () => {
    const userId = user?.uid;
    return courses.some((course) => course?.enrolledStudents.includes(userId));
  };

  // console.log(userCourses);
  // console.log(courses);

  return (
    <Container className="my-5">
      <Box className="mb-2">
        <Typography variant="h5" color="text.primary">
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the dashboard. here are the available courses
        </Typography>
      </Box>
      <Grid container>
        {courses &&
          courses.map((course, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={styles.courseCard}
            >
              <Box sx={{ p: 2 }}>
                <img
                  src={course.photoUrl}
                  alt="course"
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Box className="my-2">
                  <Typography variant="h6" color="text.primary">
                    {course.title}
                  </Typography>
                  <Typography variant="body2">
                    Tutor: {course.tutor["displayName"]}
                  </Typography>
                  <Typography variant="h5">${course.price}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openModal("course", { course })}
                  fullWidth
                  disabled={isUserEnrolled()} // Disable if enrolled
                >
                  {isUserEnrolled() ? "Enrolled" : "View Course"}
                </Button>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

const styles = {
  courseCard: {
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
};
