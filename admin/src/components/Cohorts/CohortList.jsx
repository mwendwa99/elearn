import PropTypes from "prop-types";

import {
  Grid,
  Typography,
  Container,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Divider,
  Card,
  CircularProgress,
  Box,
} from "@mui/material";

export const CohortList = (props) => {
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
        Cohorts
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
        {props.cohortData &&
          props.cohortData.map((cohort, index) => (
            <Card sx={{ maxWidth: "100%", my: 1 }} key={index}>
              <CardMedia
                component="img"
                sx={{
                  maxHeight: "100px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                image={cohort.photoUrl}
                title={cohort.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {cohort.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {cohort.school}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {cohort.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => props.handleEditCohort(cohort)}
                >
                  edit
                </Button>
                <Button
                  size="small"
                  onClick={() => props.handleDeleteCohort(cohort.cohortId)}
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

CohortList.propTypes = {
  cohortData: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  handleEditCohort: PropTypes.func.isRequired,
  handleDeleteCohort: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
