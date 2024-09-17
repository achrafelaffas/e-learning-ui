import { BookCopy, FileChartPie } from "lucide-react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        to="/"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <FileChartPie className="h-5 w-5"/>
        Dashboard
      </Link>

      <Link
        to="/matieres"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <BookCopy className="h-5 w-5"/>
        Matières
      </Link>
    </nav>
  );
};

export default Navbar;
