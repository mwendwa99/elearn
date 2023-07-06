import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Paper, Box } from "@mui/material";

import VerticalTabs from "../components/VerticalTabs";
import PersonalInfoCard from "../components/PersonalInfoCard";

const ProfilePage = () => {
  const { userProfile, currentUser, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    type: "",
    country: "",
    photoURL: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) {
      setUserData({
        displayName: currentUser?.displayName,
        email: currentUser?.email,
        type: userProfile?.type,
        country: userProfile?.country,
        photoURL: currentUser?.photoURL,
      });
    }
  }, [currentUser, navigate]);

  const sideTabs = [
    {
      label: "Profile",
      path: `/profile/${currentUser?.id}`,
      component: (
        <PersonalInfoCard
          uid={currentUser?.uid}
          displayName={userData.displayName}
          email={userData.email}
          type={userData.type}
          country={userData.country}
          photoURL={userData.photoURL}
        />
      ),
    },
    {
      label: "My Enrollments",
      path: `/profile/${currentUser?.id}/enrollments`,
      component: <Paper>My Enrollments</Paper>,
    },
    {
      label: "My Courses",
      path: `/profile/${currentUser?.id}/courses`,
      component: <Paper>My Courses</Paper>,
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Box sx={{ my: 2, minHeight: "50vh" }}>
        <VerticalTabs sideTabs={sideTabs} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
