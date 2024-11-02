import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./redux/auth/authActions";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

//
import Footer from "./components/Footer";
import { Modal, Navbar } from "./components";
import { Container } from "@mui/system";
import { toast } from "react-toastify";

import AppRoutes from "./routes";
import { clearError } from "./redux/auth/authSlice";

function App() {
  const { user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(getUserProfile(user.uid));
      }
    });
  }, []);

  // if no user always redirect to landing page
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <Container maxWidth="lg" sx={{ padding: 0 }}>
        <Navbar />
        <ToastContainer />
        <Modal />
        <AppRoutes />
      </Container>
      <Footer />
    </Suspense>
  );
}

export default App;
