import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";


import { Sun, Moon } from 'lucide-react';


function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to the matching element
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        // Small timeout ensures the target view has finished rendering
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // Optional: scroll to top when navigating to a new page without a hash
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="w-full bg-primary text-white p-4 sticky top-0 z-50">
      <div className="flex justify-between ">
        <div className="flex gap-12 h-auto items-center">

          <ScrollToAnchor />

          <Link to="/#" className="w-10">
            <img src="/ssd.jpg" />
          </Link>

          <Link to="/#fall" className="font-mono">
            Fall
          </Link>

          <Link to="/#spring" className="font-mono">
            Spring
          </Link>

        </div>

        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  );
}