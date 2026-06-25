import React from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <button
      id="theme_toggle_button"
      onClick={() => setDarkMode(!darkMode)}
      className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm focus:outline-none"
      title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-amber-600 dark:text-zinc-400" />
      )}
    </button>
  );
}
