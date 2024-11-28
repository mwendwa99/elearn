import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { getAllCourses } from "../redux/courses/courseActions";
import { getDiscounts } from "../redux/discounts/discountActions";
import { useModal } from "../context/ModalContext";

import students from "../assets/students.webp";
import Partners from "../components/Partners";
import { SuccessStory, CourseCard } from "../components";

export default function Landing() {
  const { openModal } = useModal();
  const { user } = useSelector((state) => state.auth);
  const {
    courses,
    loading: courseLoading,
    error: courseError,
  } = useSelector((state) => state.course);
  const { discounts } = useSelector((state) => state.discount);
  const dispatch = useDispatch();

  //scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiscounts());
  }, [dispatch]);

  // console.log(courses);

  return (
    <>
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
          <Typography variant="h2" align="left" color="text.main">
            Up your{" "}
            <Box component="span" color="text.primary">
              Skills
            </Box>{" "}
            <br /> to{" "}
            <Box component="span" color="text.primary">
              Advance
            </Box>{" "}
            your
            <br />
            <Box component="span" color="text.primary">
              Career
            </Box>{" "}
            path
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mt: 2 }}
            align="left"
            gutterBottom
          >
            Provides you with the latest online learning system and material{" "}
            <br />
            that help your knowledge grow.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {!user && (
              <Button
                onClick={() => openModal("signup")}
                variant="contained"
                color="primary"
                disableElevation
              >
                Get Started
              </Button>
            )}
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              color="primary"
              disableElevation
            >
              Learn More
            </Button>
          </Stack>
        </Grid>
        <Grid sx={{ display: { xs: "none", sm: "block" } }} item xs={12} md={6}>
          <img src={students} alt="landing" width="100%" height="100%" />
        </Grid>
      </Grid>
      <Grid container marginY={5} padding={2}>
        <Partners />
      </Grid>

      {courses && (
        <Grid container sx={{ padding: "1rem" }}>
          <Grid item xs={12} md={12}>
            <Typography gutterBottom variant="h5" color="text.primary">
              Explore Programmes
            </Typography>
            <Typography gutterBottom variant="h2" color="text.main">
              Our Popular Classes
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              sx={{ color: "text.secondary" }}
            >
              Let's join our famous class, the knowledge provided will
              definitely be useful for you.
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} mt={2}>
            <Grid container spacing={2}>
              {[...Array(3)]
                .flatMap(() => courses)
                .map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} marginY={2} padding={2}>
        <Grid item xs={12} md={12}>
          <Typography gutterBottom variant="h5" color="text.primary">
            Success Stories
          </Typography>
          <Typography gutterBottom variant="h2" color="text.main">
            What Our Students Say
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            sx={{ color: "text.secondary" }}
          >
            Here are some of our students who have completed the course and are
            satisfied with the results.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SuccessStory />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SuccessStory />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SuccessStory />
        </Grid>
      </Grid>
    </>
  );
}
