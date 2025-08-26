import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
// Update the import path if the theme-provider file is in a different location, for example:
import { useTheme } from "../context/ThemeProvider";
// Or, if the file does not exist, create 'theme-provider.tsx' in the '../context' directory and export useTheme from it.

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <Button variant="ghost" size="lg" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun className="h-8 w-8" />
      ) : (
        <Moon className="h-8 w-8" />
      )}
    </Button>
  );
}
