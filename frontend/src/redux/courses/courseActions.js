import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
        courses.map(async (course) => {
          try {
            if (!course.tutorId) return course; // If tutorId is not provided, return the course as it is

            const tutorDocSnap = await getDoc(doc(db, "users", course.tutorId));
            if (tutorDocSnap.exists()) {
              const tutorData = tutorDocSnap.data();
              return { ...course, tutor: tutorData }; // Add tutor field to course
            } else {
              console.warn(`Tutor document not found for course: ${course.id}`);
              return course; // If tutor document does not exist, return the course as it is
            }
          } catch (error) {
            console.error("Error fetching tutor document:", error);
            return course; // If there's an error, return the course as it is
          }
        })
      );

      return coursesWithTutors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
