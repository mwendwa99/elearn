import { Suspense, lazy } from "react";
import "./App.css";
// components
import { Appbar } from "./components";
import { Route, Routes } from "react-router-dom";

// Define lazy-loaded components
const Landing = lazy(() => import("./pages/Landing"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
