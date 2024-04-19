import { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import { useModal } from "../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginWithEmail } from "../redux/auth/authActions";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      StaryDream School
      {/* </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      toast.success("Logged in successfully");
      closeModal();
    }
  }, [user]);

  // console.log("usasaser", user);
  // console.log(loading);
  // console.log("error", error);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(loginWithEmail({ email, password }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box className="d-flex flex-column justify-content-center align-items-center">
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
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
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
      </Box>
      <Typography
        align="center"
        onClick={() => openModal("signup")}
        component={"a"}
        className="link-primary cursor-pointer"
      >
        Don't have an account? Sign Up
      </Typography>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
