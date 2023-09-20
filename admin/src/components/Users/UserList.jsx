import PropTypes from "prop-types";

import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

export const UserList = (props) => {
  if (props.loading) {
    return (
      <Box>
        <CircularProgress
          size={40}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      </Box>
    );
  }

  return (
    <Grid item xs={5}>
      <Typography align="center" variant="h6">
        Users
      </Typography>
      <Container
        maxWidth="xs"
        sx={{
          overflow: "scroll",
          overflowX: "hidden",
          height: "500px",
          minWidth: "300px",
        }}
      >
        {props.userData &&
          props.userData.map((user, index) => (
            <Card sx={{ maxWidth: "100%", my: 1 }} key={index}>
              <CardMedia
                component="img"
                sx={{
                  maxHeight: "100px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                image={user.photoURL}
                firstName={user.firstName}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {user.firstName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user.school}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {user.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  user type: {user.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  country code: {user.country}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => props.handleEditUser(user)}>
                  edit
                </Button>
                <Button
                  size="small"
                  onClick={() => props.handleDeleteUser(user.userId)}
                >
                  delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Container>
    </Grid>
  );
};

UserList.propTypes = {
  userData: PropTypes.arrayOf({
    firstName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};
