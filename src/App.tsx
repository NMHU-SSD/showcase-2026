import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import ProjectPage from './pages/Project';
//import VideoPage from './pages/Video';

import { ThemeProvider } from "./context/ThemeContext";

function App() {

  return (

    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </ThemeProvider>

  )
}

export default App
