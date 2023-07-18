import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { Flag } from "@mui/icons-material";

// Define a filter function to match country names with the user input
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

function CountrySelector(props) {
  const [countryList, setCountryList] = React.useState([]);

  // Load the country list from a CDN when the component mounts
  React.useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryList(
          data.map((country) => ({
            name: country.name.common,
            code: country.cca2,
            // flag: country.flags.svg,
          }))
        );
      })
      .catch((error) => {
        console.error("Error loading country list:", error);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      {props.countryCode ? (
        <Typography disabled variant="body2" color="text.secondary">
          {props.countryCode}
        </Typography>
      ) : (
        <Autocomplete
          style={{ width: "100%" }}
          filterOptions={filterOptions}
          options={countryList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a country"
              variant="outlined"
            />
          )}
          onChange={(_, value) => {
            props.onCountryChange(value);
          }}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{
                typography: "body2",
                display: "flex",
                alignItems: "center",
              }}
              {...props}
            >
              <Flag sx={{ mr: 1 }} htmlColor="#ccc" fontSize="small" />
              <Box component="span" sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {option.name} {option.code}
                </Typography>
              </Box>
            </Box>
          )}
        />
      )}
    </Box>
  );
}

export default CountrySelector;
