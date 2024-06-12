import { Typography, Box, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserCourses } from "../redux/courses/courseActions";
import Card from "./Card";
import CourseList from "./CourseList";
import { useModal } from "../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap";

export default function EnrollmentCard() {
  const { userCourses, courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserCourses());
  }, [dispatch]);

  if (!userCourses || userCourses.length === 0)
    return (
      <Typography variant="body1">
        You are not enrolled in any course, visit the dahsboard for more.
      </Typography>
    );

  // console.log({ userCourses });
  // console.log({ courses });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" color="text.primary" gutterBottom>
        Your Enrollments
      </Typography>
      <Box className="mt-2">
        {userCourses.map((course, index) => (
          <div key={index}>
            <CourseList
              title={course.title}
              description={course.description}
              image={course.photoUrl}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
}

const styles = {
  courseCard: {
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
};
