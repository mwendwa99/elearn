import { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { getClass } from "../redux/classroom/classSlice";

import students from "../assets/students.webp";
import Services from "../components/Services";
import Carousel from "../components/Carousel";
import Partners from "../components/Partners";

const discounts = [
  {
    title: "Summer Sale",
    image:
      "https://images.pexels.com/photos/5625121/pexels-photo-5625121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Back to School Discount",
    image:
      "https://images.pexels.com/photos/5625040/pexels-photo-5625040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Holiday Special",
    image:
      "https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

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
        <Grid sx={{ display: { xs: "none", sm: "block" } }} item xs={12} md={6}>
          <img src={students} alt="landing" width="100%" height="100%" />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid item xs={8}>
          <Partners />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid item xs={12}>
          <Carousel discounts={discounts} />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid item xs={12} md={12}>
          <Typography
            align="center"
            gutterBottom
            variant="h5"
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
            Let's join our famous class, the knowledge provided will definitely
            be useful for you.
          </Typography>
          <Carousel classes={classes} />
        </Grid>
      </Grid>
    </>
  );
}
