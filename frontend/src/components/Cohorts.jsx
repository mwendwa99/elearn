import { useEffect, useState } from "react";

import { Container, Typography, Paper, Divider, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getCohorts } from "../redux/cohorts/cohortActions";

// const cohorts = [
//   {
//     name: "Introduction to Computer Science",
//     school: "Harvard University",
//     duration: "12 weeks",
//     startDate: "October 1, 2022",
//     tutor: "David J. Malan",
//     path: "/cohort/cs",
//     image:
//       "https://images.pexels.com/photos/5429947/pexels-photo-5429947.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   },
//   {
//     name: "Machine Learning",
//     school: "Stanford University",
//     duration: "10 weeks",
//     startDate: "November 1, 2022",
//     tutor: "Andrew Ng",
//     path: "/cohort/ml",
//     image:
//       "https://images.pexels.com/photos/5678042/pexels-photo-5678042.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   },
//   {
//     name: "Mobile App Development with React Native",
//     school: "The Hong Kong University of Science and Technology",
//     duration: "8 weeks",
//     startDate: "December 1, 2022",
//     tutor: "Jogesh K. Muppala",
//     path: "/cohort/react-native",
//     image:
//       "https://images.pexels.com/photos/1065085/pexels-photo-1065085.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   },
// ];

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
      {cohortData &&
        cohortData.map((cohort, index) => (
          <Paper
            key={index}
            variant="outlined"
            sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <img
                src={cohort.photoUrl}
                alt={`${cohort.name} at ${cohort.school}`}
                style={{
                  maxHeight: "100px",
                  objectFit: "cover",
                  width: "200px",
                  height: "100px",
                  borderRadius: "5px",
                  marginRight: "1rem",
                }}
              />
            </Box>
            <div>
              <Link
                //   to={`/cohorts/${cohort.name.replace(/ /g, "-").toLowerCase()}`}
                to={cohort.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  color="primary"
                  variant="h6"
                  gutterBottom
                  component="div"
                >
                  {cohort.name}
                </Typography>
              </Link>
              <Typography color="text.secondary" variant="subtitle1">
                {cohort.school}
              </Typography>
              <Typography color="text.secondary" variant="body1" gutterBottom>
                Starts: {cohort.startDate}
              </Typography>
              <Typography color="text.secondary" variant="body1" gutterBottom>
                {cohort.tutor}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography color="text.secondary" variant="body2">
                {cohort.description}
              </Typography>
            </div>
          </Paper>
        ))}
    </Container>
  );
};

export default Cohorts;
