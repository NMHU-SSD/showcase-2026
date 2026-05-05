import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectGrid from "../components/ProjectGrid";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/projects.json");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <>
      <Navbar />
      <main className="w-full p-8 bg-background ">
        <h1 className="text-6xl font-mono">Spring Show 2026</h1>
        <p className="text-3xl font-mono font-light mt-2 mb-12">
          Software Systems Design
        </p>
        {loading ? (
          <div className="container status">Loading projects...</div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </main>
    </>
  );
}