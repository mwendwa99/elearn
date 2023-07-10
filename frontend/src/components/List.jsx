import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

export default function DecoratedList({ data }) {
  return (
    <div style={{ padding: "1rem" }}>
      <Typography
        id="decorated-list-demo"
        level="body1"
        textTransform="uppercase"
        fontWeight="lg"
        mb={1}
      >
        {data.title}
      </Typography>
      <List
        aria-labelledby="decorated-list-demo"
        sx={{ "--ListItemDecorator-size": "32px" }}
      >
        {data.description.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.text}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
