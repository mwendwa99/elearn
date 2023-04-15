import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#101828", pt: 8, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              The Nexus School is a leading global online school that provides
              students with an excellent education, regardless of their
              location. We aim to create a platform that enables parents and
              students to receive proper educational guidance from the comfort
              of their homes.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Typography variant="body2" component="ul">
              <li>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/courses"
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Connect With Us
            </Typography>
            <Typography variant="body2" component="ul">
              <li>
                <Link
                  sx={{ textDecoration: "none", color: "white" }}
                  href="https://twitter.com/nexusschool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  sx={{ textDecoration: "none", color: "white" }}
                  href="https://www.facebook.com/nexusschool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  sx={{ textDecoration: "none", color: "white" }}
                  href="https://www.linkedin.com/company/nexus-school"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  sx={{ textDecoration: "none", color: "white" }}
                  href="https://www.instagram.com/nexusschool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
              </li>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} The Nexus School. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;