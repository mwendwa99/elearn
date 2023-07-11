import React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import cambridgesvg from "../assets/cambridge.svg";
import ibsvg from "../assets/ib.svg";
import googlesvg from "../assets/google.svg";

const Partners = () => {
  const partnerImages = [cambridgesvg, ibsvg, googlesvg];

  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          // flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Grid item xs={6} sm={4}>
          <Typography
            variant="h2"
            color="primary.main"
            sx={{
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "34px",
            }}
          >
            International
          </Typography>
          <Typography
            variant="h3"
            color="primary.dark"
            sx={{
              fontStyle: "normal",
              fontWeight: 400,
            }}
          >
            Recognition
          </Typography>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Stack direction="row">
            {partnerImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Partner ${index + 1}`}
                width="50%"
                height="70px"
                style={{ margin: "1rem" }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Partners;
