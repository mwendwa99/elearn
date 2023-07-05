import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInWithGoogle } from "../actions/authActions";

import Form from "../components/Form";

const type = ["Tutor", "Student"];

export default function SignUp() {
  const { isLoading, error, currentUser } = useSelector((state) => state.auth);
  const [radioValue, setRadioValue] = React.useState("student");
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // do something with the selected country
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // confirmPassword should be exact to password otherwise return error
    if (data.get("password") !== confirmPassword) {
      setFormError("Password and Confirm Password should be the same");
      console.log({
        email: data.get("email"),
        password: data.get("password"),
        lastName: data.get("lastName"),
        firstName: data.get("firstName"),
      });
    }

    // signin with google
    if (data.get("email") === "" && data.get("password") === "") {
      dispatch(signInWithGoogle());
    }

    // console.log(formError);

    // dispatch(
    //   registerUser(
    //     data.get("email"),
    //     data.get("password"),
    //     data.get("lastName"),
    //     data.get("firstName"),
    //     radioValue,
    //     selectedCountry.code
    //   )
    // );
  };

  return (
    <>
      <Form
        handleSignUp={handleSignUp}
        handleRadioChange={handleRadioChange}
        handleCountryChange={handleCountryChange}
        handleConfirmPassword={handleConfirmPassword}
        isLoading={isLoading}
        error={error}
        formError={formError}
        type={type}
        country={selectedCountry}
      />
    </>
  );
}
