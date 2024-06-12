import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserCourses } from "../redux/courses/courseActions";
import CourseList from "./CourseList";

export default function EnrollmentCard() {
  const { userCourses } = useSelector((state) => state.course);
  const dispatch = useDispatch();
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
