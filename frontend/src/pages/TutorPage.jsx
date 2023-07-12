import { useState } from "react";

import AreaSelect from "../components/AreaSelect";
import SubjectSelect from "../components/SubjectSelect";

import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const TutoringPage = ({ user }) => {
  const [subject, setSubject] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <Container sx={{ py: 8 }}>
      <Typography color="primary" variant="h4" align="center" gutterBottom>
        Tutoring
      </Typography>

      <Typography color="text.secondary" variant="body1" sx={{ mb: 2 }}>
        Personalized attention and support helps learners to achieve their full
        potential and for that, we offer tutoring services to help students who
        feel that they need more guidance in specific areas. Our experienced
        tutors work with students to identify their strengths and weaknesses,
        and develop a customized plan to help them achieve their academic goals.
        Students can list the areas they need help with, and our tutors will
        provide personalized attention and guidance to help them master the
        subject matter. With one-on-one tutoring sessions, students can receive
        immediate feedback and support, allowing them to learn at their own pace
        and build confidence in their abilities. In addition to improving their
        grades, tutoring can help students develop better study habits, time
        management skills, and a deeper understanding of the subject matter.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography color="text.primary" variant="body1" sx={{ mb: 2 }}>
            What subject do you need help with?
          </Typography>
          <SubjectSelect />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="text.primary" variant="body1" sx={{ mb: 2 }}>
            In what area do you need tutoring?
          </Typography>
          <AreaSelect />
        </Grid>
      </Grid>

      <Typography color="text.primary" variant="h6" sx={{ mt: 2, mb: 2 }}>
        Tell us more about your tutoring needs:
      </Typography>

      <TextField
        id="outlined-multiline-flexible"
        label="Message"
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 4 }}
      />

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="demo-simple-select-label">Duration</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value=""
          label="Duration"
        >
          <MenuItem value={1}>30 minutes</MenuItem>
          <MenuItem value={2}>1 hour</MenuItem>
          <MenuItem value={3}>2 hours</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" size="large">
        Request Tutoring
      </Button>
    </Container>
  );
};

export default TutoringPage;
