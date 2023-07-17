import { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { signIn } from "../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const SigninForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSignIn = (e) => {
    // Handle sign-in logic
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");
    const loginData = {
      email,
      password,
    };

    dispatch(signIn(loginData));
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Sign In
      </Typography>
      {error && (
        <Typography variant="body1" color="error" align="center" sx={{ mb: 4 }}>
          {error.message}
        </Typography>
      )}

      {isLoading && (
        <Box
          component="div"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <CircularProgress
            size={40}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        </Box>
      )}

      <form onSubmit={handleSignIn}>
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          //   show password
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <VisibilityOff onClick={() => setShowPassword(false)} />
                ) : (
                  <Visibility onClick={() => setShowPassword(true)} />
                )}
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default SigninForm;
