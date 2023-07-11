import { Box, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Check, ArrowOutward } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

import List from "./List";
import teach from "../assets/teach.svg";
import learn from "../assets/learn.svg";

const studentWriteUp = {
  title: "Students",
  description: [
    {
      text: `Access a wide range of courses and study materials`,
      icon: <Check />,
    },
    {
      text: `Get personalized support and feedback from experienced tutors`,
      icon: <Check />,
    },
    {
      text: `Participate in group study sessions and connect with peers`,
      icon: <Check />,
    },
    {
      text: `Track your progress and see how you're improving over time`,
      icon: <Check />,
    },
  ],
};
const tutorWriteUp = {
  title: "Tutors",
  description: [
    {
      text: `Work with motivated students from all around the world`,
      icon: <Check />,
    },
    {
      text: `Set your own schedule and work from anywhere in the world`,
      icon: <Check />,
    },
    {
      text: `Get paid for helping students achieve their goals`,
      icon: <Check />,
    },
    {
      text: `Join a community of like-minded professionals`,
      icon: <Check />,
    },
  ],
};
// services section
export default function Services() {
  return (
    <Box sx={{ padding: "1rem" }}>
      <Grid container sx={{ my: "1rem" }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Card raised={false} elevation={0}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                sx={{
                  objectFit: "contain",
                  height: "100px",
                  width: "auto",
                }}
                component="img"
                image={learn}
                alt="learn"
              />
            </Box>
            <CardContent>
              <List data={studentWriteUp} />
              <Button
                endIcon={<ArrowOutward />}
                variant="contained"
                color="primary"
                sx={{ mt: "1rem" }}
                component={RouterLink}
                to="/signup"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card raised={false} elevation={0}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                sx={{
                  objectFit: "contain",
                  height: "100px",
                  width: "auto",
                }}
                component="img"
                image={teach}
                alt="random"
              />
            </Box>
            <CardContent>
              <List data={tutorWriteUp} />
              <Button
                endIcon={<ArrowOutward />}
                variant="contained"
                color="primary"
                sx={{ mt: "1rem" }}
                component={RouterLink}
                to="/signup"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
