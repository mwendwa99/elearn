import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/authActions";
import { useNavigate, Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        StaryDream School
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { currentUser, isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser]);

  // clear the error

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = formData.email.trim();
    const password = formData.password.trim();
    dispatch(loginUser(email, password));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const theme = createTheme();

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
        <Typography
          align="center"
          color={"secondary"}
          variant="body1"
          component={Link}
          to="/signup"
        >
          Don't have an account? Sign Up
        </Typography>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Container>
    // </ThemeProvider>
  );
}

export default SignIn;
