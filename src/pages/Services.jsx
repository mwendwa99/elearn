import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import students from "../assets/students.webp";

// services section
export default function Services() {
  return (
    <Grid container sx={{ padding: "1rem" }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Our Services
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        We provide you with the latest online learning system and material that
        help your knowledge grow.
      </Typography>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={students}
                alt="random"
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Web Development
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={students}
                alt="random"
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Web Development
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={students}
                alt="random"
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Web Development
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
