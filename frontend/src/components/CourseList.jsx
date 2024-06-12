import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function CourseList({ title, description, image }) {
  return (
    <List sx={{ width: "100%", bgcolor: "#f1f1f1", borderRadius: 2 }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={title} src={image} sx={{ width: 50, height: 50 }} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="span" variant="h6" color="text.primary">
              {title}
            </Typography>
          }
          secondary={
            <Typography component="span" variant="body2">
              <br />
              {description}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}
