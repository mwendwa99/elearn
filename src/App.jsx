import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
// components
import { Appbar } from "./components";

// Define lazy-loaded components
const Landing = lazy(() => import("./pages/Landing"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

function App() {
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
      <Appbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </Suspense>
  );
}

export default App;
