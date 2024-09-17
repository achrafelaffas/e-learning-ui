import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  children: string;
  className?: string;
}

const active =
  "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
const inactive =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

export default function MenuLink({ children, to, className }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return isActive ? cn(className, active) : cn(className, inactive);
      }}
    >
      {children}
    </NavLink>
  );
}
