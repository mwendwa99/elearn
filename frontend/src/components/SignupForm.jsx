import { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import { useModal } from "../context/ModalContext";
import { createUser } from "../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserTypeSelector from "./UserTypeSelector";
import CountrySelector from "./CountrySelector";

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

export default function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [userType, setUserType] = useState("");
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleTypeChange = (value) => {
    setUserType(value);
  };

  const handleCountryChange = (country) => {
    setCountryCode(country);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirm_password = formData.confirmPassword.trim();
    const fullNames = formData.fullNames.trim();
    const type = userType;
    const country = countryCode;

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!email || !password || !confirm_password) {
      toast.error("Please fill in all fields");
      return;
    }

    // console.log(
    //   fullNames,
    //   email,
    //   password,
    //   confirm_password,
    //   type,
    //   country?.code
    // );

    dispatch(createUser({ email, password, fullNames, type, country }));

    toast.success("Account created successfully");

    // closeModal();
  };

  // console.log("user", user);
  // console.log("loading", loading);
  console.log("error", error);

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
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullNames"
          label="Full Names"
          name="fullNames"
          autoComplete="fullNames"
          autoFocus
          value={formData.fullNames}
          onChange={handleInputChange}
        />

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

        <Stack direction="column" sx={{ my: 2 }}>
          <Typography variant="body1" gutterBottom>
            Please select who you are joining us as:
          </Typography>
          <UserTypeSelector onChange={handleTypeChange} value={userType} />
        </Stack>
        <Stack direction="column" sx={{ my: 2 }}>
          <Typography variant="body1" gutterBottom>
            Country of Residence:
          </Typography>

          <CountrySelector
            onCountryChange={handleCountryChange}
            value={countryCode}
          />
        </Stack>

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
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          value={formData.confirm_password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
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
          Register
        </Button>
      </Box>
      <Typography
        align="center"
        onClick={() => openModal("login")}
        component={"a"}
        className="link-primary cursor-pointer"
      >
        Already have an account? Log in
      </Typography>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
