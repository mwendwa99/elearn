import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Paper } from "@mui/material";

import VerticalTabs from "../components/VerticalTabs";

const ProfilePage = () => {
  const { userProfile, currentUser, isLoading } = useSelector(
    (state) => state.auth
  );

  return (
    <Paper sx={{ p: 4 }}>
      <VerticalTabs />
    </Paper>
  );
};

export default ProfilePage;
