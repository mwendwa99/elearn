import { Container, Grid, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography color="primary" variant="h4" align="center" gutterBottom>
        About Nexus School
      </Typography>
      <Typography
        color="text.secondary"
        variant="subtitle1"
        align="center"
        gutterBottom
      >
        Explore. Discover. Excel
      </Typography>
      <Grid container spacing={4} sx={{ mt: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography color="primary" variant="body1" sx={{ fontWeight: 600 }}>
            Mission Statement
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ marginBottom: 4 }}
          >
            At The Nexus School, our mission is to provide high-quality academic
            and extra-curricular learning opportunities to students worldwide,
            catering to multiple curriculums. Through our online platform, we
            aim to create a global community of learners who can socialize and
            learn from each other. We strive to offer flexible, accessible, and
            personalized education that enables students to reach their full
            potential.
          </Typography>
          <Typography color="primary" variant="body1" sx={{ fontWeight: 600 }}>
            Vision Statement
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ marginBottom: 4 }}
          >
            Our vision at The Nexus School is to become a leading global online
            school that provides students with an excellent education,
            regardless of their location. We envision a world where every
            student has access to high-quality education that is tailored to
            their needs, interests, and learning styles. We aim to create a
            platform that enables parents and students to receive proper
            educational guidance from the comfort of their homes. Through our
            innovative approach, we hope to foster a love for learning, global
            socialization, and a passion for lifelong education. Additionally,
            we are committed to developing our students' character by providing
            them with a weekly character trait to work on, promoting personal
            growth and contributing to a better society.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://images.pexels.com/photos/1078982/pexels-photo-1078982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Students studying"
            width="100%"
            height="auto"
            style={{ marginBottom: "1rem" }}
            loading="lazy"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
