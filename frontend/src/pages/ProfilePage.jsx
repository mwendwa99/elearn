import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Paper } from "@mui/material";

import VerticalTabs from "../components/VerticalTabs";
import PersonalInfoCard from "../components/PersonalInfoCard";

const ProfilePage = () => {
  const { userProfile, currentUser, isLoading } = useSelector(
    (state) => state.auth
  );

  const sideTabs = [
    {
      label: "Profile",
      path: `/profile/${currentUser?.id}`,
    },
    {
      label: "My Enrollments",
      path: `/profile/${currentUser?.id}/enrollments`,
    },
    {
      label: "My Courses",
      path: `/profile/${currentUser?.id}/courses`,
    },
  ];

  return (
    <Paper sx={{ p: 4 }}>
      <VerticalTabs sideTabs={sideTabs}>
        <PersonalInfoCard />
      </VerticalTabs>
    </Paper>
  );
};

export default ProfilePage;
