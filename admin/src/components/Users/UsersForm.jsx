import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../../redux/users/userActions";
import { UserList } from "./UserList";

const initialValues = {
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  type: "",
  country: "",
  photoURL: "",
};

const UserForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [userData, setUserData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { users, loading, error } = useSelector((state) => state.users);
  //   const users = [];
  //   const loading = false;
  //   const error = false;
  const dispatch = useDispatch();

  // useEffect to reset isUpdate to false after rerender
  useEffect(() => {
    setIsUpdate(() => false);
  }, [users]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(users)) {
      setUserData(users);
    }
  }, [users]);

  useEffect(() => {
    // once dispatch is successful, reset the form
    if (!loading && !error) {
      setFormValues(initialValues);
    }
  }, [error, loading]);

  // refresh the cohortData with every dispatch
  useEffect(() => {
    if (Array.isArray(users)) {
      setUserData(users);
    }
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmitNewUser = (e) => {
    e.preventDefault();
    // Handle form submission or validation here
    // validate type to always start with a capital letter and the rest in small letters

    dispatch(
      createUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        displayName: formValues.displayName,
        email: formValues.email,
        type: formValues.type.charAt(0).toUpperCase().slice(1).toLowerCase(),
        country: formValues.country.toUpperCase(),
        photoURL: formValues.photoURL,
      })
    );
    setIsUpdate(() => false);
    setUserData((prevData) => [...prevData, formValues]);
  };

  const handleEditUser = (user) => {
    // Handle form submission or validation here
    setFormValues(() => user);
    setIsUpdate(() => true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        displayName: formValues.displayName,
        email: formValues.email,
        type: formValues.type.charAt(0).toUpperCase().slice(1).toLowerCase(),
        country: formValues.country.toUpperCase(),
        photoURL: formValues.photoURL,
      })
    )
      .then(() => {
        dispatch(getUsers());
        setIsUpdate(false);
      })
      .catch((err) => {
        console.log("error updating user", err);
      });
  };

  const handleDeleteUser = (userId) => {
    // Handle form submission or validation here
    dispatch(deleteUser(userId));
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <Container maxWidth="sm">
          <Typography variant="h5" component="h2">
            Users Form
          </Typography>
          {loading && (
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
          {error && (
            <Typography variant="h5" component="h2">
              {error.message}
            </Typography>
          )}
          <form onSubmit={isUpdate ? handleUpdateUser : handleSubmitNewUser}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  required
                  name="firstName"
                  label="First Name"
                  value={formValues.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  name="lastName"
                  label="Last Name"
                  value={formValues.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  name="email"
                  label="Email"
                  type="text"
                  value={formValues.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  inputProps={{
                    min: 0,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  name="type"
                  label="User Type"
                  type="text"
                  value={formValues.type}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  inputProps={{
                    min: 0,
                    max: 5,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="photoURL"
                  label="Photo URL"
                  type="text"
                  value={formValues.photoURL}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  name="displayName"
                  label="UserName"
                  value={formValues.displayName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  name="country"
                  label="Country"
                  value={formValues.country}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                {isUpdate ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateUser}
                    fullWidth
                    type="submit"
                  >
                    Update User
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Create User
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grid>
      <UserList
        loading={loading}
        handleDeleteUser={handleDeleteUser}
        handleEditUser={handleEditUser}
        userData={userData}
      />
    </Grid>
  );
};

export default UserForm;
