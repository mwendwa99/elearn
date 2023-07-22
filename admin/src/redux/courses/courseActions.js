import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  setCourse,
  setCourseList,
  clearError,
  setLoading,
  setError,
} from "./courseSlice";

export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push({ courseId: doc.id, ...doc.data() });
      });
      dispatch(setCourseList(courses));
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "getCourses",
        })
      );
    }
    dispatch(setLoading(false));
  }
);

export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async (courseId, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(setCourse({ courseId: docSnap.id, ...docSnap.data() }));
      } else {
        dispatch(setError("No such document!"));
      }
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "getCourseById",
        })
      );
    }
    dispatch(setLoading(false));
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (course, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        ...course,
        createdAt: serverTimestamp(),
      });
      dispatch(setCourseList({ courseId: docRef.id, ...course }));
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "createCourse",
        })
      );
    }
    dispatch(setLoading(false));
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const docRef = doc(db, "courses", course.courseId);
      await updateDoc(docRef, course);
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push({ courseId: doc.id, ...doc.data() });
      });
      dispatch(setCourseList(courses));
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "updateCourse",
        })
      );
    }
    dispatch(setLoading(false));
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await deleteDoc(doc(db, "courses", id));
      dispatch(setCourse({}));
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "",
        })
      );
    }
    dispatch(setLoading(false));
  }
);
