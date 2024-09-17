import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "./ThemeProvider";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button variant="outline" className="rounded-full" size="icon">
        {theme == "dark" && (
          <span onClick={() => setTheme("light")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </span>
        )}

        {theme == "light" && (
          <span onClick={() => setTheme("dark")}>
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </span>
        )}
      </Button>
    </>
  );
}
