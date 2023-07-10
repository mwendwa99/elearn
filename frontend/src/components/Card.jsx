import { Link as RouterLink } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import online from "../assets/online.webp";

export default function MediaCard({ title, tutor, start, price, description }) {
  // check if current page is the landing page
  const isLandingPage = window.location.pathname === "/";

  return (
    <Card sx={{ maxWidth: 500, mb: 2 }}>
      <CardContent>
        <CardMedia
          component="img"
          height="100%"
          image={online}
          alt="Online Learning"
          sx={{ objectFit: "cover", borderRadius: "8px" }}
        />
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tutor:{tutor}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Starts: {/* {start} {time} */}
          {start.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }) +
            " " +
            start.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {isLandingPage ? (
          <Button
            variant="outlined"
            component={RouterLink}
            to="start_learning"
            size="small"
          >
            learn more
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
