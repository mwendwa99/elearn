import { Box, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Check, ArrowOutward } from "@mui/icons-material";

import List from "./List";
import teach from "../assets/teach.webp";
import learn from "../assets/learn.webp";

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
    <Box sx={{ padding: "1rem", minHeight: "100vh" }}>
      <Grid container sx={{ my: "1rem" }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              height="200px"
              sx={{ objectFit: "contain" }}
              component="img"
              image={learn}
              alt="random"
            />
            <CardContent>
              <List data={studentWriteUp} />
              <Button
                endIcon={<ArrowOutward />}
                variant="contained"
                color="primary"
                sx={{ mt: "1rem" }}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              height="200px"
              sx={{ objectFit: "contain" }}
              component="img"
              image={teach}
              alt="random"
            />
            <CardContent>
              <List data={tutorWriteUp} />
              <Button
                endIcon={<ArrowOutward />}
                variant="contained"
                color="primary"
                sx={{ mt: "1rem" }}
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
