import { Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  // console.log(course);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link
        to={`/course/${course.id}`}
        style={{ textDecoration: "none" }} // Ensures there's no underline for the link
      >
        <Box
          sx={{
            backgroundColor: "background.default",
            border: "1px solid #c3c3c3",
            p: 1,
            borderRadius: 1,
          }}
        >
          <Box component="div">
            <img
              src={course.photoUrl}
              alt={course.title}
              style={{
                objectFit: "cover",
                height: "200px",
                width: "100%",
              }}
            />
          </Box>
          <Box component="div" mt={2}>
            <Typography gutterBottom variant="h5" color="text.primary">
              {course.title}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {course.description}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              Tutor {course.tutor["displayName"]}
            </Typography>
            <Typography gutterBottom variant="body1" fontWeight={700}>
              ${course.price}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
}
