import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCourses } from "../redux/courses/courseActions";
import Card from "./Card";
import { useModal } from "../context/ModalContext";
import { useNavigate } from "react-router-dom";

const CourseList = ({ courses, action }) => {
  return (
    <Box>
      {courses.map((course, index) => (
        <div key={index}>
          <Card
            title={course?.title}
            tutor={course?.tutor}
            start={course?.start}
            price={course?.price}
            image={course?.photoUrl}
            subtitle={course?.subtitle}
            description={course?.description}
            action={action}
          />
        </div>
      ))}
    </Box>
  );
};

export default function EnrollmentCard() {
  const { courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const checkIfUidExists = () => {
    if (!courses) return false;
    const uid = user.uid;

    return courses.some((course) => course.users.uid === uid);
  };

  // console.log(checkIfUidExists());

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" color="text.primary">
        Your Enrollments
      </Typography>
      {checkIfUidExists() ? (
        <Typography variant="body1">You are enrolled in a course</Typography>
      ) : (
        <>
          <Typography variant="body1">
            You are not enrolled in any course, visit the dahsboard for more.
          </Typography>
        </>
      )}
    </Box>
  );
}
