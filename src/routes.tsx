import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/auth/register/Register";
import Activate from "./pages/auth/activate/Activate";
import Login from "./pages/auth/login/Login";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cour from "./pages/Chapitres/Cour";
import Cours from "./pages/Cours/Cours";
import Matieres from "./pages/Matieres/Matieres";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AdminMatieres from "./pages/admin/Matieres/AdminMatieres";
import AdminCours from "./pages/admin/Cours/AdminCours";
import AdminCour from "./pages/admin/Chapitres/AdminCour";
import Etudiants from "./pages/admin/Etudiants/Etudiants";
import EtudiantDetails from "./pages/admin/Etudiants/EtudiantDetails";

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
      { path: "/matieres", element: <Matieres /> },

      { path: "/admin", element: <AdminMatieres /> },
      { path: "/admin/matieres", element: <AdminMatieres /> },
      { path: "/admin/cours", element: <AdminCours /> },
      { path: "/admin/chapitres", element: <AdminCour /> },
      { path: "/admin/etudiants", element: <Etudiants /> },
      { path: "/admin/etudiants/:id", element: <EtudiantDetails /> },
    ],
  },
]);

export default router;
