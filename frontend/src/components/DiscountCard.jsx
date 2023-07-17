import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const DiscountCard = ({ image, title, description, onClick }) => {
  return (
    <Card
      sx={{
        position: "relative",
        // width: "500px",
        minHeight: 200,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
        "&:hover": {
          opacity: 0.8,
        },
      }}
      onClick={onClick}
    >
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          color: "#fff",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          color="text.contrastText"
          component="h2"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.contrastText">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DiscountCard;
