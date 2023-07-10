import React from "react";
import { Box, Typography } from "@mui/material";
import cambridgesvg from "../assets/cambridge.svg";
import ibsvg from "../assets/ib.svg";
import googlesvg from "../assets/google.svg";

const Partners = () => {
  const partnerImages = [cambridgesvg, ibsvg, googlesvg];

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {partnerImages.map((image, index) => (
        <Box key={index} sx={{ marginRight: 20 }}>
          <img
            src={image}
            alt={`Partner ${index + 1}`}
            width="200%"
            height="200%"
          />
        </Box>
      ))}
    </Box>
  );
};

export default Partners;
