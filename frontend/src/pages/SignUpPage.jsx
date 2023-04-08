import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/authActions";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { RadioButton, CountrySelector } from "../components";

const type = ["Tutor", "Student"];

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
        Nexus School
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const { isLoading, error, currentUser } = useSelector((state) => state.auth);
  const [radioValue, setRadioValue] = React.useState("student");
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser]);

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // do something with the selected country
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      registerUser(
        data.get("email"),
        data.get("password"),
        data.get("firstName"),
        data.get("lastName"),
        radioValue,
        selectedCountry.code
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Who are you:
                </Typography>
                <RadioButton onChange={handleRadioChange} options={type} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Please select country of origin
                </Typography>
                <CountrySelector onCountryChange={handleCountryChange} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Sign Up"
              )}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography
                  color="secondary"
                  variant="body1"
                  component={Link}
                  to="/signin"
                >
                  Already have an account? Sign in
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
