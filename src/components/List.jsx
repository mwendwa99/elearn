import * as React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";

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
            <ListItemDecorator>{item.icon}</ListItemDecorator>
            {item.text}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
