import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/auth/register/Register";
import Activate from "./pages/auth/activate/Activate";
import Login from "./pages/auth/login/Login";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cour from "./pages/Chapitres/Cour";
import Cours from "./pages/Cours/Cours";
import Matieres from "./pages/Matieres/Matieres";
import Admin from "./admin/Admin";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

const router = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/activate", element: <Activate /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <RequireAuth fallbackPath="/login">
        <Layout />
      </RequireAuth>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/chapitres", element: <Cour /> },
      { path: "/cours", element: <Cours /> },
      {
        path: "/matieres",
        element: <Matieres />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

export default router;
