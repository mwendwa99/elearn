import { Paper, Box } from "@mui/material";

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
