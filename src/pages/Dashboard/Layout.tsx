import ModeToggle from "@/components/ModeToggle";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export interface User {
  name: string;
  email: string;
  id: number | null;
  isAdmin: boolean;
}

const Lyout = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const user = useAuthUser<User>();

  const logout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[150px_1fr] lg:grid-cols-[190px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <img src="public\logo.png" width="45px" height="45px" />
              <span className="">MDS</span>
            </Link>
          </div>

          <div className="flex-1">
            <Navbar />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Navbar />
            </SheetContent>
          </Sheet>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-zinc-100 dark:bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Lyout;
