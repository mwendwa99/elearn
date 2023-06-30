import { useState } from "react";
import {
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  Button,
  Grid,
} from "@mui/material";

const CoCurricularPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography color="primary" variant="h4" align="center" gutterBottom>
        Co-curricular Development
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>
        Starry Dreams provides a variety of opportunities for students to
        explore their interests and develop their skills outside of the
        classroom.
      </Typography>

      <Box sx={{ my: 4 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Sports Programme" sx={{ color: "black" }} />
          <Tab label="Exchange Programme" sx={{ color: "black" }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid component={"div"} container spacing={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  At Starry Dreams Academy, we believe that physical fitness is
                  an important aspect of overall well-being. Our sports
                  programme provides opportunities for students to stay active
                  and healthy while developing teamwork and sportsmanship
                  skills.
                </Typography>
              </div>
              <div style={{ alignSelf: "flex-start", mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ my: "1rem" }}>
                  Enroll
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Sports"
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid component={"div"} container spacing={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="body1" color="text.secondary">
                  Starry Dreams Academy is proud to partner with Solidrock
                  Academy in the UK to offer exchange programmes for our
                  students. This programme provides an opportunity for students
                  to travel to the UK for Easter and summer camps, and
                  experience a new culture while developing their skills and
                  making new friends.
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                  Our partnership with Solidrock Academy ensures that students
                  are supported every step of the way, from preparing for travel
                  to settling in at the camp. We provide assistance in areas
                  such as travel requirements and logistics, as well as
                  providing information on the benefits of the exchange
                  programme. The programme fee includes all expenses for the
                  trip, including transportation, accommodation, and meals.
                </Typography>
              </div>
              <div style={{ alignSelf: "flex-start", mt: 2 }}>
                <Button variant="contained" color="primary">
                  Enroll
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.pexels.com/photos/1516440/pexels-photo-1516440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Sports"
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
        </TabPanel>
      </Box>
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

export default CoCurricularPage;
