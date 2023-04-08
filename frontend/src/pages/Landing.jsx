import React from "react";
import { Grid, Typography, Button, Stack } from "@mui/material";
// import students from "../assets";
import students from "../assets/students.webp";
import Services from "../components/Services";
import Classes from "../components/Carousel";

export default function Landing() {
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
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "primary.main" }}
            align="left"
          >
            Up your Skills <br /> to Advance your <br /> career path
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mt: 2 }}
            align="left"
          >
            Provides you with the latest online learning system and material{" "}
            <br />
            that help your knowledge grow.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
            <Button variant="outlined" color="primary">
              Learn More
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={students} alt="landing" width="100%" height="100%" />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid item xs={12} md={12}>
          <Typography gutterBottom variant="h4" color={"primary"}>
            Our Services
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            We provide you with the latest online learning system and material
            that help your knowledge grow.
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
          <Classes />
        </Grid>
      </Grid>
    </>
  );
}
