import { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { getClass } from "../features/classSlice";

import students from "../assets/students.webp";
import Services from "../components/Services";
import ClassesCarousel from "../components/Carousel";
import Partners from "../components/Partners";

export default function Landing() {
  const { classes } = useSelector((state) => state.class);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClass());
  }, [dispatch]);

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
          <Typography variant="h1" align="left" color="text.main">
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
              career
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
            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              color="primary"
            >
              Get Started
            </Button>
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              color="primary"
            >
              Learn More
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={students} alt="landing" width="100%" height="100%" />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid item xs={8}>
          <Partners />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid item xs={12} md={12}>
          <Typography
            align="center "
            gutterBottom
            variant="subtitle1"
            color="text.primary"
          >
            Our Services
          </Typography>
          <Typography variant="h2" color="text.dark" align="center">
            Fostering an engaging learning environment
          </Typography>
          <Services />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid item xs={12} md={12}>
          <Typography gutterBottom variant="h4" sx={{ color: "primary.main" }}>
            Our Classes
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            sx={{ color: "text.secondary" }}
          >
            Let's join our famous class, the knowledge provided will definitely
            be useful for you.
          </Typography>
          <ClassesCarousel classes={classes} />
        </Grid>
      </Grid>
    </>
  );
}
