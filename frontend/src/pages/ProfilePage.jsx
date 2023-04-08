import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../actions/authActions";

import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

const ProfilePage = ({ uid }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    dispatch(getUserProfile(uid));
  }, [dispatch, uid]);

  return (
    <Paper sx={{ p: 4 }}>
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
            src={userProfile?.photoUrl}
          >
            <Typography variant="h1">
              {/* get every first letter and join both */}
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
          <Typography variant="h3" sx={{ mb: 2 }}>
            {userProfile?.displayName || "Name Not Available"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Email: {userProfile?.email || "Email Not Available"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Country:{" "}
            {userProfile?.customClaims.country ||
              "No Country Information Available."}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Registered as: {userProfile?.customClaims.type || "Anonymous"}
          </Typography>
          <Button variant="contained" startIcon={<Edit />} sx={{ mb: 2 }}>
            Edit Profile
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfilePage;
