import PropTypes from "prop-types";

import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Container,
  CircularProgress,
  Typography,
  Grid,
  Stack,
  Button,
  Box,
  CardMedia,
} from "@mui/material";
import { Star } from "@mui/icons-material";

export const SubjectList = (props) => {
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
        Subjects
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
        {props.subjectData &&
          props.subjectData.map((subject, index) => (
            <Card sx={{ maxWidth: "100%", my: 1 }} key={index}>
              <CardMedia
                component="img"
                sx={{
                  maxHeight: "100px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                image={subject.photoUrl}
                title={subject.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {subject.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {subject.school}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {subject.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${subject.price}
                </Typography>
                <Stack direction="row" spacing={0}>
                  <Star fontSize="small" />
                  <Typography variant="body2" color="text.primary">
                    {subject.rating}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => props.handleEditSubject(subject)}
                >
                  edit
                </Button>
                <Button
                  size="small"
                  onClick={() => props.handleDeleteSubject(subject.subjectId)}
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

SubjectList.propTypes = {
  subjectData: PropTypes.arrayOf({
    photoUrl: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  handleDeleteSubject: PropTypes.func.isRequired,
  handleEditSubject: PropTypes.func.isRequired,
};
