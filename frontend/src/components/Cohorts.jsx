import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
  Card,
  Grid,
  CardMedia,
  CardActions,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getCohorts } from "../redux/cohorts/cohortActions";

const Cohorts = () => {
  const [cohortData, setCohortData] = useState([]);
  const { cohorts, isLoading, error } = useSelector((state) => state.cohorts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCohorts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(cohorts)) {
      setCohortData(cohorts);
    }
  }, [cohorts]);

  return (
    <Container sx={{ py: 8 }}>
      <Typography color="primary" variant="h4" align="center" gutterBottom>
        Cohorts
      </Typography>
      {/* <Paper
        key={index}
        variant="outlined"
        sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
      > */}
      <Grid container spacing={1}>
        {cohortData &&
          cohortData.map((cohort, index) => (
            <Grid item xs={12} sm={10} md={6}>
              <Card
                sx={{
                  maxWidth: "100%",
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  height: "150px",
                }}
                key={index}
              >
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "cover",
                    width: "200px",
                    height: "100px",
                    borderRadius: "5px",
                  }}
                  image={cohort.photoUrl}
                  title={cohort.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" color="text.primary">
                    {cohort.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {cohort.school}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    starts:{cohort.startDate.replace(/-/g, "/")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ends:{cohort.endDate.replace(/-/g, "/")}
                  </Typography>
                  <Divider />
                  <Typography variant="body2" color="text.secondary">
                    {cohort.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      {/* </Paper> */}
    </Container>
  );
};

export default Cohorts;
