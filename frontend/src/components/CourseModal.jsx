import { Typography, Box, Button } from "@mui/material";
import { useModal } from "../context/ModalContext";
import { toast } from "react-toastify";
import { enrollToCourse } from "../redux/courses/courseActions";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, clearError } from "../redux/courses/courseSlice";
import { useEffect } from "react";

export default function CourseModal({ data }) {
  const { user } = useSelector((state) => state.auth);
  const { message, error } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (message === "Enrolled in course") {
      toast.success(message);
      closeModal();
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [error]);

  const handleEnroll = () => {
    const courseId = data["course"].courseId;
    const userId = user.uid;
    dispatch(enrollToCourse({ userId, courseId }));
  };

  return (
    <Box>
      <Typography gutterBottom variant="h5" color="text.primary">
        {data["course"].title}
      </Typography>
      <Typography gutterBottom variant="body1">
        {data["course"].subtitle}
      </Typography>
      <img
        src={data["course"].photoUrl}
        height={200}
        width={"100%"}
        className="rounded"
        alt=""
      />
      <Typography gutterBottom variant="body1">
        {data["course"].description}
      </Typography>
      <Box className="my-2">
        <Typography gutterBottom variant="body2">
          Tutor: {data["course"].tutor["displayName"]}
        </Typography>
        <Typography gutterBottom variant="body2">
          Price: ${data["course"].price}
        </Typography>
      </Box>
      <Box className="mt-3 w-100">
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleEnroll}
        >
          Enroll
        </Button>
      </Box>
    </Box>
  );
}
