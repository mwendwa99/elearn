import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../actions/authActions";

import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import Modal from "../components/Modal";
import Form from "../components/Form";

const ProfilePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // password: "",
    confirmPassword: "",
    country: "",
    type: "",
    displayName: "",
    photoURL: "",
    updatedAt: null,
  });
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    type: "",
  });
  const dispatch = useDispatch();

  const profilePassword = "";
  const { userProfile, currentUser, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserProfile(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  const handleModalClose = () => {
    // Close the modal
    setOpenModal(false);
    setFormError("");
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // ensure every field is filled
    if (!data.get("firstName")) {
      setFormError({
        ...formError,
        firstName: "Please fill in first name",
      });
    } else if (!data.get("lastName")) {
      setFormError({
        ...formError,
        lastName: "Please fill in last name",
      });
    } else if (!data.get("email")) {
      setFormError({
        ...formError,
        email: "Please fill in email field",
      });
    } else if (!data.get("password")) {
      setFormError({
        ...formError,
        password: "Please fill in password field",
      });
    } else if (!data.get("confirmPassword")) {
      setFormError({
        ...formError,
        password: "Please fill in confirm password field",
      });
    }
    if (data.get("password") !== data.get("confirmPassword")) {
      setFormError({
        ...formError,
        password: "Passwords do not match",
      });
    } else {
      setFormError({
        ...formError,
        password: "",
      });
    }
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   lastName: data.get("lastName"),
    //   firstName: data.get("firstName"),
    //   country: userProfile?.country,
    //   type: userProfile?.type,
    // });

    console.log("formError", formError);

    // if there are no errors in the form update the profileData object
    if (!formError) {
      setProfileData(() => ({
        ...profileData,
        email: data.get("email"),
        // password: data.get("password"),
        lastName: data.get("lastName"),
        firstName: data.get("firstName"),
        country: userProfile?.country,
        type: userProfile?.type,
        displayName: `${data.get("firstName")} ${data.get("lastName")}`,
        photoURL: "",
        updatedAt: new Date(),
      }));

      setPassword(data.get("password"));

      // profileData.email = data.get("email");
      // // profileData.password = data.get("password");
      // profilePassword = data.get("password");
      // profileData.lastName = data.get("lastName");
      // profileData.firstName = data.get("firstName");
      // profileData.country = userProfile?.country;
      // profileData.type = userProfile?.type;
      // profileData.displayName = `${data.get("firstName")} ${data.get(
      //   "lastName"
      // )}`;
      // profileData.photoURL = "";
      // profileData.updatedAt = new Date();
    }
    // console.log({
    //   id: currentUser.uid,
    //   profDataObj: profileData,
    //   password: data.get("password"),
    // });
    // dispatch(updateUserProfile(currentUser.uid, profileData));

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

  console.log("ss", {
    id: currentUser.uid,
    profDataObj: profileData,
    password: password,
  });

  // console.log("formError", formError);

  return (
    <Paper sx={{ p: 4 }}>
      <Modal
        // modalData={modalData}
        // setModalData={setModalData}
        // handleSaveChanges={handleSaveChanges}
        open={openModal}
        onClose={handleModalClose}
      >
        <Form
          firstName={userProfile?.firstName}
          lastName={userProfile?.lastName}
          country={userProfile?.country}
          email={userProfile?.email}
          type={userProfile?.type}
          password={userProfile?.password}
          confirmPassword={confirmPassword}
          handleUpdateProfile={handleUpdateProfile}
          formError={formError}
        />
        {/* <div style={{ height: "500px" }}>This is child</div> */}
      </Modal>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{ width: 200, height: 200 }}
            alt={userProfile?.displayName}
            src={userProfile?.profileUrl}
          >
            <Typography variant="h1">
              {userProfile?.displayName
                .split(" ")
                .map((name) => name[0].toUpperCase())
                .join("")}
            </Typography>
          </Avatar>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: { xs: "flex", sm: "block" },
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: { xs: "center", sm: "flex-start" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {!isLoading ? (
            <>
              <Typography variant="h3" sx={{ mb: 2 }}>
                {userProfile?.displayName || "Name Not Found"}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Email: {userProfile?.email || "Email Not Found"}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Country:{" "}
                {userProfile?.country || "No Country Information Found."}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Registered as: {userProfile?.type || "Anonymous"}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setOpenModal(true)}
                startIcon={<Edit />}
                sx={{ mb: 2 }}
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfilePage;
