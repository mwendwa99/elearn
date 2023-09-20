import PropTypes from "prop-types";

import {
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Container,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";

export const CourseList = (props) => {
  if (props.loading) {
    return (
      <Box>
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
    );
  }

  return (
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
        {props.courseData &&
          props.courseData.map((course, index) => (
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

                {props.tutorData && (
                  <Typography variant="body2" color="text.secondary">
                    tutor:{" "}
                    {props.tutorData.find(
                      (tutor) => tutor.userId === course.tutorId
                    ) &&
                      props.tutorData.find(
                        (tutor) => tutor.userId === course.tutorId
                      ).email}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => props.handleEditCourse(course)}
                >
                  edit
                </Button>
                <Button
                  size="small"
                  onClick={() => props.handleDeleteCourse(course.courseId)}
                >
                  delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Container>
    </Grid>
  );
};

CourseList.propTypes = {
  courseData: PropTypes.arrayOf(
    PropTypes.shape({
      photoUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool.isRequired,
  tutorData: PropTypes.object.isRequired,
  handleEditCourse: PropTypes.func.isRequired,
  handleDeleteCourse: PropTypes.func.isRequired,
};
