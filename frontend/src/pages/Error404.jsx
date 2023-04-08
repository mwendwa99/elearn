import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 8,
      }}
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography color="primary" variant="h4" align="center" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography
        color="text.secondary"
        variant="body1"
        align="center"
        gutterBottom
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 4 }}>
        Go back to home page
      </Button>
    </Container>
  );
};

export default Error404;
