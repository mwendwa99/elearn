import { Grid, Container, Typography, Box, Button } from "@mui/material";
import { useModal } from "../context/ModalContext";
import { toast } from "react-toastify";

export default function CourseModal({ data }) {
  const { closeModal } = useModal();

  const handleEnroll = () => {
    console.log("Enrolling in course", data["course"].courseId);
    toast.success("Enrolled in course");
    closeModal();
  };

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h5" color="text.primary">
        {data["course"].title}
      </Typography>
      <Typography gutterBottom variant="body1">
        {data["course"].subtitle}
      </Typography>
      <Typography gutterBottom variant="body1">
        {data["course"].description}
      </Typography>
      <Typography gutterBottom variant="body2">
        Tutor: {data["course"].tutor["displayName"]}
      </Typography>
      <Typography gutterBottom variant="body2">
        Price: {data["course"].price}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleEnroll}>
        Enroll
      </Button>
    </Container>
  );
}
