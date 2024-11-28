import { Container, Grid, Typography, Box } from "@mui/material";

const AboutPage = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography color="primary" variant="h4" align="center" gutterBottom>
        About StaryDream School
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
            Mission
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ marginBottom: 4 }}
          >
            To empower creators from all backgrounds to share their expertise
            with the world through an innovative and inclusive platform,
            transforming knowledge into opportunity and success for everyone
            involved.
          </Typography>
          <Typography color="primary" variant="body1" sx={{ fontWeight: 600 }}>
            Vision
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ marginBottom: 4 }}
          >
            To inspire a global movement of learning without limits, where
            innovation connects people, inclusivity drives collaboration, and
            empowerment transforms lives through accessible and
            diverse education.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ position: "relative", width: "100%", height: 0, pb: "80%" }}
          >
            <img
              src="https://images.pexels.com/photos/1078982/pexels-photo-1078982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Students studying"
              width="100%"
              height="auto"
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
      </Grid>
    </Container>
  );
};

export default AboutPage;
