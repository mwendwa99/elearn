import { Link as RouterLink } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import online from "../assets/online.webp";
import { CardActionArea, CardHeader } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name,
  };
}

export default function MediaCard({
  title,
  tutor,
  subtitle,
  start,
  price,
  description,
  image,
}) {
  // check if current page is the landing page
  const isLandingPage = window.location.pathname === "/";
  console.log(image);

  return (
    <Card
      elevation={0}
      raised={false}
      sx={{
        maxWidth: 500,
        mb: 2,
        height: {
          xs: "100%",
          // sm: 400,
        },
      }}
    >
      <CardActionArea>
        <CardContent>
          <CardMedia
            component="img"
            image={image ? image : online}
            alt={title}
            sx={{
              objectFit: "cover",
              borderRadius: "8px",
              maxHeight: "100px",
              maxWidth: "100%",
            }}
          />
          <Box
            sx={{
              height: "100px",
              mt: 2,
            }}
          >
            <Typography variant="h6" color="text.primary">
              {title}
            </Typography>
            <Typography gutterBottom variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <CardHeader
            title={
              <Typography variant="h6" color="text.main">
                {tutor?.firstName + " " + tutor?.lastName}
              </Typography>
            }
            subheader={
              <Box>
                <Typography variant="h5" color="text.primary">
                  ${price}
                </Typography>
              </Box>
            }
            avatar={<Avatar alt={tutor?.displayName} src={tutor?.photoURL} />}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
