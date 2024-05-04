import { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/auth/authActions";
import { formatTimestamp } from "../utils/helper";

const PersonalInfoCard = () => {
  const dispatch = useDispatch();
  const { userProfile, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile(user.uid));
    }
  }, [dispatch, user]);

  return (
    <Card sx={{ maxWidth: 400 }} elevation={0}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img
              src={userProfile.photoURL}
              alt="Profile"
              width="100%"
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom color="text.primary">
              Personal Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              Name: {userProfile.displayName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {userProfile.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userProfile.type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Nationality: {userProfile.country?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Joined{" "}
              {userProfile.createdAt && formatTimestamp(userProfile.createdAt)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
