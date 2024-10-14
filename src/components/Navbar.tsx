import { GearIcon } from "@radix-ui/react-icons";
import { BookCopy, FileChartPie } from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useEffect } from "react";

interface AuthUser {
  email: string;
  id: number;
  isAdmin: boolean;
  name: string;
}

const Navbar = () => {
  const user = useAuthUser<AuthUser>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {!user?.isAdmin && (
        <>
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <FileChartPie className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            to="/matieres"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <BookCopy className="h-5 w-5" />
            Matières
          </Link>
        </>
      )}

      {user?.isAdmin && (
        <>
          <Link
            to="/admin/matieres"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <GearIcon className="h-5 w-5" />
            Matieres
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
