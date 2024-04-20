import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Grid,
  Skeleton,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
// import { updateUserProfile, getUserProfile } from "../redux/auth/authActions";

import CountrySelector from "./CountrySelector";
import UserTypeSelector from "./UserTypeSelector";

const PersonalInfoCard = () => {
  const { loading, error, user } = useSelector((state) => state.auth);

  console.log(user);

  const handleTypeChange = (value) => {
    setEditedType(value);
  };

  const handleCountryChange = (country) => {
    setCountryCode(country.code);
  };

  const handleSave = () => {
    // Handle saving the edited fields
    // You can use the updated values in editedType, editedCountry, and editedPhotoURL
    // dispatch(updateUserProfile(uid, editedType, countryCode));
  };

  return (
    <Card sx={{ maxWidth: 400 }} elevation={0}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {loading || user.photoURL === "" ? (
              <Skeleton variant="circular" width={100} height={100} />
            ) : (
              <img
                src={user.photoURL}
                alt="Profile"
                width="100%"
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom color="text.primary">
              Personal Information
            </Typography>
            {loading || user.displayName === "" ? (
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
            ) : (
              <Typography variant="subtitle1" gutterBottom>
                Name:
                {user.displayName}
              </Typography>
            )}
            {loading || user.email === "" ? (
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
            ) : (
              <Typography variant="subtitle1" gutterBottom>
                Email: {user.email}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack direction="column" sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>
                Please select who you are joining us as:
              </Typography>
              {loading || user.type === "" ? (
                <Skeleton variant="rectangular" width={300} height={50} />
              ) : (
                <UserTypeSelector
                  disabled={user.type ? true : false}
                  onChange={handleTypeChange}
                  value={user.type}
                />
              )}
            </Stack>
            <Stack direction="column" sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>
                Country code:
              </Typography>
              {loading || user.country === "" ? (
                <Skeleton variant="rectangular" width={300} height={20} />
              ) : (
                <CountrySelector
                  countryCode={user.country}
                  onCountryChange={handleCountryChange}
                />
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              disabled={user.type && user.country ? true : false}
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
