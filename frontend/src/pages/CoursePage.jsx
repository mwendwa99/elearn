import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCourseById } from "../redux/courses/courseActions";

export default function CoursePage() {
  const { id } = useParams();
  const { course, loading, error } = useSelector((state) => state.course);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseById({ courseId: id }));
  }, [dispatch]);

  //2biY3GtgNCLyIweXHDYv

  console.log("course", course);
  console.log("loading", loading);
  console.log("error", error);
  return (
    <Grid
      container
      sx={{
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={6}>
        <Typography variant="h1" align="left" color="text.main">
          {course.title}
        </Typography>
        <Typography variant="h4" align="left" color="text.secondary">
          {course.description}
        </Typography>
        <Typography variant="h5" align="left" color="text.secondary">
          Tutor: {course.tutor && course.tutor.displayName}
        </Typography>
        <Typography variant="h5" align="left" color="text.secondary">
          Price: ${course.price}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src={course.photoUrl}
          alt={course.title}
          sx={{
            objectFit: "cover",
            height: "200px",
            width: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
}
