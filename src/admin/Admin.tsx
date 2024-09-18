import Dashboard from "@/pages/Dashboard/Dashboard";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
interface User {
  name: string;
  email: string;
  id: number | null;
  isAdmin: boolean;
}

const Admin = () => {
  const user = useAuthUser<User>();
  const navigate = useNavigate();

  if (!user?.isAdmin) return <Dashboard />;

  return (
    <div>
      <h1>You are an Admin</h1>
    </div>
  );
};

export default Admin;
