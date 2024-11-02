import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import CoCurricular from "./pages/CoCurricularPage";
import Classroom from "./pages/ClassroomPage";
import Error404 from "./pages/Error404";
import About from "./pages/AboutPage";
import CoursePage from "./pages/CoursePage";

export default function AppRoutes() {
  const routes = [
    {
      key: "landing",
      component: Landing,
      path: "/",
    },
    {
      key: "profile",
      component: ProfilePage,
      path: "/profile",
    },
    {
      key: "dashboard",
      component: Dashboard,
      path: "/dashboard",
    },
    {
      key: "co-curricular",
      component: CoCurricular,
      path: "/co-curricular",
    },
    {
      key: "classroom",
      component: Classroom,
      path: "/classroom",
    },
    {
      key: "course",
      component: CoursePage,
      path: "/course/:id",
    },
    {
      key: "about",
      component: About,
      path: "/about",
    },
  ];

  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        );
      })}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
