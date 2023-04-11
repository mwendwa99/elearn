import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";

import Calendar from "../components/Calendar";

const classes = [
  {
    title: "Introduction to React",
    tutor: "John Doe",
    start: new Date("2023-05-01T09:00:00"),
    end: new Date("2023-05-01T11:00:00"),
    price: "$50",
    description: "Learn the basics of React and build a simple web app.",
  },
  {
    title: "Intermediate React",
    tutor: "Jane Smith",
    start: new Date("2023-05-01T09:00:00"),
    end: new Date("2023-05-01T11:00:00"),
    price: "$75",
    description:
      "Build on your React knowledge and create more complex components.",
  },
  {
    title: "Advanced React",
    tutor: "Bob Johnson",
    start: new Date("2023-05-15T11:00:00"),
    end: new Date("2023-05-15T13:00:00"),
    price: "$100",
    description:
      "Take your React skills to the next level and learn about performance optimization.",
  },
];

function ClassList() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography color="primary" variant="h4" align="center" gutterBottom>
          Nexus Classroom
        </Typography>
        <Typography
          color="text.secondary"
          variant="subtitle1"
          align="center"
          gutterBottom
        >
          Start learning today!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Calendar classes={classes} />
      </Grid>
      {classes.map((c, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 500, mb: 2 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {c.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tutor:{c.tutor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Starts: {/* {c.start} {c.time} */}
                {c.start.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) +
                  " " +
                  c.start.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {c.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {c.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Add to Schedule</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ClassList;
