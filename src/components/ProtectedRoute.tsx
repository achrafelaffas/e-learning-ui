import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "./AutheProvider";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login", { replace: true });

    if (user?.roles?.some((role) => role.name === "ADMIN"))
      navigate("/", { replace: true });
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
