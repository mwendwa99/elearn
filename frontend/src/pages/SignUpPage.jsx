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

import RadioButton from "../components/RadioButton";
import CountrySelector from "../components/CountrySelector";
import Form from "../components/Form";

const type = ["Tutor", "Student"];

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
        data.get("lastName"),
        data.get("firstName"),
        radioValue,
        selectedCountry.code
      )
    );
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      handleRadioChange={handleRadioChange}
      handleCountryChange={handleCountryChange}
      isLoading={isLoading}
      error={error}
      type={type}
      country={selectedCountry}
    />
  );
}
