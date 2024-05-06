import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { VerticalTabs, PersonalInfoCard, EnrollmentCard } from "../components";

const sideTabs = [
  {
    label: "Profile",
    component: <PersonalInfoCard />,
  },
  {
    label: "My Enrollments",
    component: <EnrollmentCard />,
  },
];

const ProfilePage = () => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Box sx={{ my: 2, minHeight: "50vh" }}>
          <VerticalTabs sideTabs={sideTabs} />
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default ProfilePage;
