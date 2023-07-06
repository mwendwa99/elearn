import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Button,
  Grid,
} from "@mui/material";

import CountrySelector from "./CountrySelector";
import UserTypeSelector from "./UserTypeSelector";

const PersonalInfoCard = ({
  uid,
  displayName,
  email,
  type,
  country,
  photoURL,
}) => {
  const [countryCode, setCountryCode] = useState(country);
  const [editedType, setEditedType] = useState(type);

  const handleTypeChange = (value) => {
    setEditedType(value);
  };

  const handleCountryChange = (country) => {
    setCountryCode(country.code);
  };

  const handleSave = () => {
    // Handle saving the edited fields
    // You can use the updated values in editedType, editedCountry, and editedPhotoURL
    console.log({
      uid: uid,
      type: editedType,
      country: countryCode,
    });
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img
              src={photoURL}
              alt="Profile"
              width="100%"
              style={{
                borderRadius: "50%",
                width: "100px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Name: {displayName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack direction="column" sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>
                Please select who you are joining us as:
              </Typography>
              <UserTypeSelector
                disabled={type ? true : false}
                onChange={handleTypeChange}
                value={editedType}
              />
            </Stack>
            <Stack direction="column" sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>
                What country do you come from?:
              </Typography>
              <CountrySelector onCountryChange={handleCountryChange} />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="contained" onClick={handleSave} sx={{}}>
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
