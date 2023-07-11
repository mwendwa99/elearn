import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function DecoratedList({ data }) {
  return (
    <Box sx={{ width: "100%", height: "300px" }}>
      <Typography
        id="decorated-list-demo"
        level="body1"
        textTransform="uppercase"
        fontWeight="lg"
        mb={1}
        color="text.dark"
        variant="h6"
        align="center"
      >
        {data.title}
      </Typography>
      <List
        aria-labelledby="decorated-list-demo"
        sx={{
          "--ListItemDecorator-size": "32px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 2,
        }}
      >
        {data.description.map((item, index) => (
          <ListItem key={index} color="text.dark">
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.text}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
