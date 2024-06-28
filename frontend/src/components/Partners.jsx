import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import cambridgesvg from "../assets/cambridge.svg";
import ibsvg from "../assets/ib.svg";

const Partners = () => {
  const partnerImages = [cambridgesvg, ibsvg];

  return (
    <Grid
      container
      width={"100%"}
      spacing={0}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
    >
      <Grid item xs={12} sm={3}>
        <Typography variant="h2" color="primary.main">
          International
        </Typography>
        <Typography variant="h3" color="primary.dark">
          Recognition
        </Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Grid
          container
          spacing={0}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"flex-start"}
        >
          {partnerImages.map((partner, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={index}
              sx={{ textAlign: "left", mt: 2 }}
            >
              <img
                src={partner}
                alt={`partner-${index}`}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "auto",
                  objectFit: "contain",
                  margin: "5px 0",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Partners;
