import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="w-full bg-primary text-white p-4">
      <div className="flex justify-between">
        <div className="flex gap-32">
          <Link to="/" className=" font-mono">
            Spring Show 2026
          </Link>
          
          <Link to="/fall" className=" font-mono">
            Fall Courses 2026
          </Link>
        </div>

        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  );
}