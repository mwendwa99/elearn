import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import CoCurricular from "./pages/CoCurricularPage";
import StartLearning from "./pages/StartLearningPage";
import Classroom from "./pages/ClassroomPage";
import Error404 from "./pages/Error404";
import About from "./pages/AboutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/co-curricular" element={<CoCurricular />} />
      <Route exact path="/start_learning" element={<StartLearning />} />
      <Route exact path="/classroom" element={<Classroom />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
