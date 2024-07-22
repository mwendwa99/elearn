import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCourseById } from "../redux/courses/courseActions";
import { Check, PlayArrow, Reviews, Star } from "@mui/icons-material";
import { Accordion } from "../components";

export default function CoursePage() {
  const { id } = useParams();
  const { course, loading, error } = useSelector((state) => state.course);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseById({ courseId: id }));
  }, [dispatch]);

  //2biY3GtgNCLyIweXHDYv

  const title = course?.title || "Course Title";
  const description = course?.description || "Course Description";
  const tutor = course?.tutor?.displayName || "Tutor Name";
  const price = course?.price || "Price";
  const photoUrl = course?.photoUrl || "https://via.placeholder.com/300";

  // console.log("course", course);
  // console.log("loading", loading);
  // console.log("error", error);
  return (
    <Container maxWidth="md">
      <Grid
        container
        sx={{
          // padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Box
            component="img"
            src={photoUrl}
            alt={title}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: { xs: "150px", sm: "200px", md: "300px" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h3" align="left" color="text.main" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="h3"
            align="left"
            color="text.secondary"
            gutterBottom
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            align="left"
            color="text.secondary"
            gutterBottom
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            reprehenderit in totam iure illum? Error ipsum modi nam ullam nobis
            eaque sit similique, porro sint at distinctio. Voluptate, sed quia
            alias repellat sint optio? Praesentium sit sunt sint! Enim expedita
            dicta ipsam consequatur libero doloribus a exercitationem.
            Consectetur, sequi repellat. {description}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" align="left" color="text.secondary">
            Created by {tutor}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="body1"
            align="left"
            color="text.secondary"
            sx={{
              marginTop: "1rem",
              color: "text.main",
              fontWeight: 600,
              fontSize: "1.5rem",
            }}
          >
            ${price}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" fullWidth>
            Purchase this course
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              border: "1px solid #c3c3c3",
              borderRadius: "10px",
              padding: "1rem",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h3" align="left" color="text.main">
                  This Course Includes
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" align="left" color="text.main">
                  <Check /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Est, culpa.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" align="left" color="text.main">
                  <Check /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Est, culpa.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" align="left" color="text.main">
                  <Check /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Est, culpa.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" align="left" color="text.main">
                  <Check /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Est, culpa.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h3"
                align="left"
                color="text.main"
                gutterBottom
              >
                Course Overview
              </Typography>
              <Typography variant="body1" align="left" color="text.main">
                10 sections &bull; 2 hours &bull; All levels
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Accordion title="Section 1" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="h3"
            align="left"
            color="text.main"
            gutterBottom
            sx={{ marginTop: "1rem" }}
          >
            Reviews
          </Typography>
          <Typography
            variant="body1"
            align="left"
            color="text.main"
            gutterBottom
          >
            No reviews yet
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="h3"
            align="left"
            color="text.main"
            gutterBottom
            sx={{ marginTop: "1rem" }}
          >
            About the Instructor
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Avatar
                alt={tutor}
                // src="https://via.placeholder.com/150"
                sx={{ width: "100px", height: "100px" }}
              >
                {tutor}
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="subtitle1" align="left" color="text.main">
                {tutor}
              </Typography>
              <Typography variant="body2" align="left" color="text.secondary">
                Professional Tutor
              </Typography>
              <Typography variant="body2" align="left" color="text.secondary">
                <Star fontSize="small" /> 4.5
              </Typography>
              <Typography variant="body2" align="left" color="text.secondary">
                <Reviews fontSize="small" /> 10,987
              </Typography>
              <Typography variant="body2" align="left" color="text.secondary">
                <PlayArrow fontSize="small" /> 20 courses
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="body1"
                align="left"
                color="text.main"
                gutterBottom
              >
                {tutor} is a professional tutor with over 10 years of experience
                teaching students of all levels. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est, culpa. Lorem ipsum dolor sit,
                amet consectetur adipisicing elit. Fugit expedita maxime sunt
                placeat ab beatae dolor animi aut aspernatur culpa.
              </Typography>

              <Button variant="contained" color="primary" fullWidth>
                View Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
