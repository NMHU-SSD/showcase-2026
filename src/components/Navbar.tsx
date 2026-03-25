import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="w-full bg-primary text-white p-4">
      <div className="flex justify-between">
        <Link to="/" className=" font-mono">
          Student Show 2026
        </Link>

        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  );
}