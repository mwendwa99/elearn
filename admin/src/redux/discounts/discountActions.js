import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  setDiscounts,
  setLoading,
  clearError,
  setError,
} from "./discountSlice";

export const createNewDiscount = (discountData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const docRef = collection(db, "discounts");
    const docSnap = await addDoc(docRef, discountData);
    dispatch(setDiscounts({ id: docSnap.id, ...discountData }));
    dispatch(setLoading(false));
    dispatch(clearError());
  } catch (error) {
    console.error("Error creating discount:", error);
    dispatch(setLoading(false));
    dispatch(
      setError({
        error: error.code,
        message: error.message,
        origin: "discountActions.ts",
      })
    );
  }
};
