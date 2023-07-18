import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Grid,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, getUserProfile } from "../redux/auth/authActions";

import CountrySelector from "./CountrySelector";
import UserTypeSelector from "./UserTypeSelector";

const PersonalInfoCard = ({ uid }) => {
  const dispatch = useDispatch();
  const { isLoading, error, userProfile } = useSelector((state) => state.auth);
  const [userProfileData, setUserProfileData] = useState({
    displayName: "",
    email: "",
    type: "",
    country: "",
    photoURL: "",
  });

  useEffect(() => {
    dispatch(getUserProfile(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    if (userProfile) {
      setUserProfileData(userProfile);
    }
  }, [userProfile]);

  const handleTypeChange = (value) => {
    setEditedType(value);
  };

  const handleCountryChange = (country) => {
    setCountryCode(country.code);
  };

  const handleSave = () => {
    // Handle saving the edited fields
    // You can use the updated values in editedType, editedCountry, and editedPhotoURL
    dispatch(updateUserProfile(uid, editedType, countryCode));
  };

  return (
    <Card sx={{ maxWidth: 400 }} elevation={0}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img
              src={userProfileData.photoURL}
              alt="Profile"
              width="100%"
              style={{
                borderRadius: "50%",
                width: "100px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom color="text.primary">
              Personal Information
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Name: {userProfileData.displayName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {userProfileData.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack direction="column" sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>
                Please select who you are joining us as:
              </Typography>
              <UserTypeSelector
                disabled={userProfileData.type ? true : false}
                onChange={handleTypeChange}
                value={userProfileData.type}
              />
            </Stack>
            <Stack direction="column" sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>
                Country code:
              </Typography>
              <CountrySelector
                countryCode={userProfileData.country}
                onCountryChange={handleCountryChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              disabled={
                userProfileData.type && userProfileData.country ? true : false
              }
              variant="contained"
              onClick={handleSave}
              sx={{}}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
