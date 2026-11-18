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
        <h1 className="text-6xl font-mono">Software Systems Design</h1>
        {loading ? (
          <div className="container status">Loading projects...</div>
        ) : (

          <div className="flex flex-col mt-24 space-y-24">

            <div id="fall" className="mb-20">
              <h2 className="text-4xl font-mono font-light mt-2 mb-12">
                Fall Show 2026
              </h2>

              <ProjectGrid projects={projects.filter(d => d.semester == "fall")} />

            </div>

            <div id="spring">
              <h2 className="text-4xl font-mono font-light mb-12">
                Spring Show 2026
              </h2>

              <ProjectGrid projects={projects.filter(d => d.semester == "spring")} />

            </div>

          </div>


        )}
      </main>
    </>
  );
}