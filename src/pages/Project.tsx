import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export type Project = {
  slug: string;
  title: string;
  student: string;
  description: string;
  file: string;
  thumbnail?: string;
};

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch("/projects.json");
        const data = await res.json();
        const found = data.find((item: { slug: string }) => item.slug === slug);
        setProject(found || null);
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="w-full p-8 bg-background">
        <div className="flex flex-row justify-between  mb-8">
          <Link to="/" className="back-link">
            ← Back to projects
          </Link>

          {loading ? (
            <p>Loading project...</p>
          ) : project ? (
            <div className="card bg-secondary p-5 w-min-[400px] rounded">
              <h1 className="font-mono">{project.title}</h1>
              <p className="text-sm font-semibold">{project.student}</p>
              <p className="text-sm mt-2">{project.description}</p>
            </div>
          ) : (
            <p>Project not found.</p>
          )}
        </div>

        {!loading && project && (
          <div className="w-full mt-8 min-h-[600px] overflow-hidden ">
            <iframe
              src={project.file}
              title={project.title}
              className="w-2/3 min-h-[600px] mx-auto border border-gray-100 rounded"
            />
          </div>
        )}
      </main>
    </>
  );
}