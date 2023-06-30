import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

import RadioButton from "./RadioButton";
import CountrySelector from "./CountrySelector";

const theme = createTheme();

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
        Starry Dreams
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Form = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  country,
  handleUpdateProfile,
  handleSignup,
  handleRadioChange,
  handleCountryChange,
  isLoading,
  error,
  type,
}) => {
  const location = useLocation();

  // console.log("email", email);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          {location.pathname === "/signup" && (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </>
          )}
          {location.pathname === "/profile" && (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Profile
              </Typography>
            </>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={
              location.pathname === "/signup"
                ? handleSignup
                : handleUpdateProfile
            }
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
                  defaultValue={firstName ? firstName : ""}
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
                  defaultValue={lastName ? lastName : ""}
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
                  defaultValue={email ? email : ""}
                />
              </Grid>
              {
                // if location is signup then show password field
                location.pathname === "/signup" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        defaultValue={password ? password : ""}
                        disabled={
                          location.pathname === "/profile" ? true : false
                        }
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        defaultValue={confirmPassword ? confirmPassword : ""}
                        disabled={
                          location.pathname === "/profile" ? true : false
                        }
                        required
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_password"
                        autoComplete="confirm-password"
                      />
                    </Grid>
                  </>
                )
              }
              <Grid item xs={12}>
                {location.pathname === "/signup" ? (
                  <>
                    <Typography variant="body1" gutterBottom>
                      Who are you:
                    </Typography>
                    <RadioButton onChange={handleRadioChange} options={type} />
                  </>
                ) : (
                  <TextField
                    label="type"
                    disabled
                    fullWidth
                    defaultValue={type}
                  />
                )}
              </Grid>
              {location.pathname === "/signup" && (
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    Country of origin
                  </Typography>
                  <CountrySelector onCountryChange={handleCountryChange} />
                </Grid>
              )}
              {location.pathname === "/profile" && (
                <Grid item xs={12}>
                  <TextField
                    defaultValue={country ? country : ""}
                    disabled
                    required
                    fullWidth
                    name="country"
                    label="Country of origin"
                    type="text"
                    id="country"
                    autoComplete="country"
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : location.pathname === "/signup" ? (
                "Sign Up"
              ) : (
                "Update"
              )}
            </Button>
            {location.pathname === "/signup" && (
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
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Form;
