import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/auth/register/Register";
import Activate from "./pages/auth/activate/Activate";
import Login from "./pages/auth/login/Login";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cours from "./pages/Cours/Cours";
import Courses from "./pages/Courses/Courses";

const router = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/activate", element: <Activate /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/cours", element: <Cours /> },
      { path: "/courses", element: <Courses /> },
    ],
  },
]);

export default router;
