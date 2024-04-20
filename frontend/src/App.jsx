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
import Appbar from "./components/AppBar";
import Footer from "./components/Footer";
import { Modal } from "./components";
import { Container } from "@mui/system";
import { toast } from "react-toastify";

// Define lazy-loaded components
const Landing = lazy(() => import("./pages/Landing"));
// const AccountSignin = lazy(() => import("./pages/AccountSignin"));
// const SignInPage = lazy(() => import("./pages/SignInPage"));
// const SignUp = lazy(() => import("./pages/SignUpPage"));
const Profile = lazy(() => import("./pages/ProfilePage"));
const About = lazy(() => import("./pages/AboutPage"));
const Cohort = lazy(() => import("./pages/CohortPage"));
// const Tutor = lazy(() => import("./pages/TutorPage"));
const CocCurricular = lazy(() => import("./pages/CoCurricularPage"));
const StartLearning = lazy(() => import("./pages/StartLearningPage"));
const Classroom = lazy(() => import("./pages/ClassroomPage"));
const Error404 = lazy(() => import("./pages/Error404"));

function App() {
  const { user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  // console.log("user", user);
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: "100vh",
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
        <Appbar />
        <ToastContainer />
        <Modal />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/cohort" element={<Cohort />} />
          <Route exact path="/co-curricular" element={<CocCurricular />} />
          <Route exact path="/start_learning" element={<StartLearning />} />
          <Route exact path="/classroom" element={<Classroom />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
      <Footer />
    </Suspense>
  );
}

export default App;
