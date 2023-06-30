import { Container, Grid, Typography, Box } from "@mui/material";
import Cohorts from "../components/Cohorts";

const CohortStudies = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography color="primary" variant="h4" align="center" gutterBottom>
        Cohort Studies
      </Typography>
      <Typography
        color="text.secondary"
        variant="subtitle1"
        align="center"
        gutterBottom
      >
        Choose your curriculum, grade level, and subject combinations.
      </Typography>
      <Grid container sx={{ mt: 6 }}>
        <Grid item xs={12} md={6} sx={{ p: 2 }}>
          <Typography color="primary" variant="h5" gutterBottom>
            Joining a Cohort at The Starry Dreams School
          </Typography>
          <Typography color="text.secondary" variant="body1" gutterBottom>
            Joining a cohort at The Starry Dreams School can be an excellent way
            to enhance your learning experience. Our cohort studies allow
            students to be part of a group of learners in the same level,
            providing a supportive learning environment where they can grow
            through group discussions, share their ideas and gain insights from
            their peers.
          </Typography>
          <Typography color="text.secondary" variant="body1" gutterBottom>
            By working with a consistent group of students, students can build
            strong relationships and develop valuable teamwork and communication
            skills, which are essential in the real world. Additionally, cohort
            studies enable students to receive personalized attention and
            support from their teachers, who can tailor their teaching approach
            to meet the specific needs of the group.
          </Typography>
          <Typography color="text.secondary" variant="body1" gutterBottom>
            Joining a cohort at The Starry Dreams School is an investment in
            your academic and personal growth that can yield lifelong benefits.
            With increased motivation, exposure to diverse ideas and
            perspectives, improved critical thinking, and enhanced social and
            emotional skills, students will be better prepared for success in
            all areas of their lives.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: 2 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 0,
              pb: "80%",
            }}
          >
            <img
              src="https://images.pexels.com/photos/8055832/pexels-photo-8055832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Students in a classroom"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              loading="lazy"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ p: 2 }}>
          <Cohorts />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CohortStudies;
