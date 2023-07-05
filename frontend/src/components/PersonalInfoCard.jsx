import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const PersonalInfoCard = ({ displayName, email, type, country, photoURL }) => {
  const [editedType, setEditedType] = useState(type);
  const [editedCountry, setEditedCountry] = useState(country);
  const [editedPhotoURL, setEditedPhotoURL] = useState(photoURL);

  const handleTypeChange = (event) => {
    setEditedType(event.target.value);
  };

  const handleCountryChange = (event) => {
    setEditedCountry(event.target.value);
  };

  const handlePhotoURLChange = (event) => {
    setEditedPhotoURL(event.target.value);
  };

  const handleSave = () => {
    // Handle saving the edited fields
    // You can use the updated values in editedType, editedCountry, and editedPhotoURL
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Name: {displayName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Email: {email}
        </Typography>
        <TextField
          fullWidth
          label="Type"
          value={editedType}
          onChange={handleTypeChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Country"
          value={editedCountry}
          onChange={handleCountryChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Photo URL"
          value={editedPhotoURL}
          onChange={handlePhotoURLChange}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
