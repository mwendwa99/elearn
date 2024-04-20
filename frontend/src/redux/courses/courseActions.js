import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebaseConfig";
// import { setAllCourses, setError, setLoading, clearError } from "./courseSlice";

export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push({ ...doc.data(), id: doc.id });
      });

      // Fetch tutors for each course and add as a tutor field
      const coursesWithTutors = await Promise.all(
        courses.map(async (course) => {
          if (course.tutorId) {
            try {
              const tutorDocRef = doc(db, "users", course.tutorId);
              const tutorDocSnap = await getDoc(tutorDocRef);

              if (tutorDocSnap.exists()) {
                const tutorData = tutorDocSnap.data();
                return { ...course, tutor: tutorData };
              } else {
                return course; // If tutor document does not exist, add the course without a tutor field
              }
            } catch (error) {
              console.error("Error fetching tutor document:", error);
              return course; // If there's an error, add the course without a tutor field
            }
          } else {
            return course; // If tutorId is not provided, add the course without a tutor field
          }
        })
      );

      return coursesWithTutors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const getAllCourses = createAsyncThunk(
//   "course/getAllCourses",
//   async (_, { dispatch }) => {
//     dispatch(setLoading());
//     dispatch(clearError());
//     try {
//       const querySnapshot = await getDocs(collection(db, "courses"));
//       const courses = [];
//       querySnapshot.forEach((doc) => {
//         courses.push({ ...doc.data(), id: doc.id });
//       });

//       // Fetch tutors for each course and add as a tutor field
//       const coursesWithTutors = await Promise.all(
//         courses.map(async (course) => {
//           if (course.tutorId) {
//             try {
//               const tutorDocRef = doc(db, "users", course.tutorId);
//               const tutorDocSnap = await getDoc(tutorDocRef);

//               if (tutorDocSnap.exists()) {
//                 const tutorData = tutorDocSnap.data();
//                 return { ...course, tutor: tutorData };
//               } else {
//                 return course; // If tutor document does not exist, add the course without a tutor field
//               }
//             } catch (error) {
//               console.error("Error fetching tutor document:", error);
//               return course; // If there's an error, add the course without a tutor field
//             }
//           } else {
//             return course; // If tutorId is not provided, add the course without a tutor field
//           }
//         })
//       );

//       dispatch(setAllCourses(coursesWithTutors));
//     } catch (error) {
//       dispatch(setError(error.message));
//     }
//   }
// );
