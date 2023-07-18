import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Paper, Box } from "@mui/material";

import VerticalTabs from "../components/VerticalTabs";
import PersonalInfoCard from "../components/PersonalInfoCard";

const ProfilePage = () => {
  const sideTabs = [
    {
      label: "Profile",
      component: <PersonalInfoCard />,
    },
    {
      label: "My Enrollments",
      component: <Paper>My Enrollments</Paper>,
    },
    {
      label: "My Courses",
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
