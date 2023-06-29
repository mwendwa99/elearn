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
  const [modalData, setModalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    type: "",
    profileUrl: "",
  });
  const dispatch = useDispatch();
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
  };

  console.log("modalData", modalData);

  const handleSaveChanges = () => {
    if (
      !modalData.firstName ||
      !modalData.lastName ||
      !modalData.email ||
      !modalData.country ||
      !modalData.type
    ) {
      return alert("Please fill all the fields");
    } else {
      console.log("modalData", modalData);
    }

    // Save the changes
    // dispatch(updateUserProfile(currentUser.uid, modalData));
    // Close the modal
    setOpenModal(false);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Modal
        firstName={userProfile?.firstName}
        lastName={userProfile?.lastName}
        country={userProfile?.country}
        email={userProfile?.email}
        type={userProfile?.type}
        modalData={modalData}
        setModalData={setModalData}
        handleSaveChanges={handleSaveChanges}
        open={openModal}
        onClose={handleModalClose}
      >
        <Form />
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
