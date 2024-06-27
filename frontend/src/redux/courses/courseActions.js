import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";

/**
 * Fetch tutor data for a given course and add it to the course object.
 * @param {Object} course - The course object containing course details.
 * @returns {Object} - The course object with the tutor data added.
 */
export const fetchTutorForCourse = async (course) => {
  try {
    if (!course.tutorId) return course; // Return the course as it is if there's no tutorId

    const tutorDocSnap = await getDoc(doc(db, "users", course.tutorId));
    if (tutorDocSnap.exists()) {
      const tutorData = tutorDocSnap.data();
      return { ...course, tutor: tutorData }; // Add tutor field to course
    } else {
      console.warn(`Tutor document not found for course: ${course.id}`);
      return course; // Return the course if tutor document does not exist
    }
  } catch (error) {
    console.error("Error fetching tutor document:", error);
    return course; // Return the course if there's an error
  }
};

export const getUserCourses = createAsyncThunk(
  "course/getUserCourses",
  async (userId, { rejectWithValue }) => {
    try {
      // Fetch the user document
      const userDocSnap = await getDoc(doc(db, "users", userId));
      if (!userDocSnap.exists()) {
        return rejectWithValue("User document not found");
      }

      const userData = userDocSnap.data();
      const enrolledCourses = userData.enrolledCourses;

      if (!enrolledCourses || enrolledCourses.length === 0) {
        return []; // Return an empty array if no enrolled courses
      }

      // Fetch all courses the user is enrolled in
      const userCourses = await Promise.all(
        enrolledCourses.map(async (courseId) => {
          const courseDocSnap = await getDoc(doc(db, "courses", courseId));
          if (!courseDocSnap.exists()) {
            console.warn(`Course document not found for courseId: ${courseId}`);
            return null; // Return null for missing courses
          }
          return { ...courseDocSnap.data(), id: courseId };
        })
      );

      // Filter out any null values (i.e., missing courses)
      const filteredUserCourses = userCourses.filter(
        (course) => course !== null
      );

      // Fetch tutors for each course and add as a tutor field
      const userCoursesWithTutors = await Promise.all(
        filteredUserCourses.map(fetchTutorForCourse)
      );

      return userCoursesWithTutors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch all courses
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courses = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Fetch tutors for each course and add as a tutor field
      const coursesWithTutors = await Promise.all(
        courses.map(fetchTutorForCourse)
      );

      return coursesWithTutors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const enrollToCourse = createAsyncThunk(
  "course/enrollToCourse",
  async ({ userId, courseId }, { rejectWithValue }) => {
    try {
      // first check if user is already enrolled in the course
      const userDocSnap = await getDoc(doc(db, "users", userId));
      const userData = userDocSnap.data();
      const enrolledCourses = userData.enrolledCourses;
      if (enrolledCourses.includes(courseId)) {
        return rejectWithValue("You are already enrolled to this course!");
      }

      // Add the course to the user's enrolledCourses array
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        enrolledCourses: arrayUnion(courseId),
      });

      // add the user to the course's enrolledStudents array
      const courseDocRef = doc(db, "courses", courseId);
      await updateDoc(courseDocRef, {
        enrolledStudents: arrayUnion(userId),
      });

      //run getUserCourses thunk to update the user's enrolled courses
      return getUserCourses(userId);
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
      return rejectWithValue(error.message);
    }
  }
);
