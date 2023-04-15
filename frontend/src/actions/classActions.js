import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

import {
  getClassesStart,
  getClassesSuccess,
  getClassesFailure,
} from "../features/classSlice";

export const getClasses = () => async (dispatch) => {
  dispatch(getClassesStart());

  // try {
  //   const classesRef = collection(db, "classes");
  //   const snapshot = await classesRef.get();

  //   const classes = snapshot.docs.map((doc) => {
  //     return {
  //       id: doc.id,
  //       ...doc.data(),
  //     };
  //   });

  //   dispatch(getClassesSuccess(classes));
  // } catch (error) {
  //   dispatch(getClassesFailure(error.message));
  // }
};

export const addClass = (classData) => async (dispatch) => {
  dispatch(addClassStart());

  try {
    const classesRef = collection(db, "classes");
    const classDoc = await addDoc(classesRef, {
      ...classData,
      createdAt: serverTimestamp(),
    });

    dispatch(addClassSuccess());

    return classDoc;
  } catch (error) {
    dispatch(addClassFailure(error.message));
  }
};
