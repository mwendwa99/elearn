import { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { useModal } from "../context/ModalContext";
import { createUser } from "../redux/auth/authActions";
// import { clearError } from "../redux/auth/authSlice";

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
      {"Copyright ©"}
      StaryDream School&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const [userType, setUserType] = useState("");
  const [countryCode, setCountryCode] = useState("");

  // useEffect(() => {
  //   dispatch(clearError());
  // }, []);

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

    openModal("login");
  };

  // console.log("user", user);
  // console.log("loading", loading);

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
          endIcon={loading && <CircularProgress size={20} color="primary" />}
        >
          Register
        </Button>
      </Box>
      <Typography
        align="center"
        onClick={() => openModal("login")}
        component={"a"}
        className="link-primary cursor-pointer my-2"
      >
        Already have an account? Log in
      </Typography>
      <Copyright />
    </Box>
  );
}
