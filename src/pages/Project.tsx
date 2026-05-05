import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export type Project = {
  slug: string;
  title: string;
  student: string;
  description: string;
  course: string;
  file: string;
  thumbnail?: string;
  openInNewTab?: boolean;
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

        </div>

        <div className="flex justify-between gap-4 flex-col md:flex-row">
        {loading ? (
            <p>Loading project...</p>
          ) : project ? (
            <div className="card bg-secondary p-5 w-min-[600px] rounded overflow-hidden max-h-min">
              <p className="text-sm font-semibold mb-3 text-primary dark:text-accent">{project.course}</p>
              <h1 className="text-sm font-mono">{project.title}</h1>
              <p className="text-sm font-semibold">{project.student}</p>
              <p className="text-xs mt-2">{project.description}</p>
            </div>
          ) : (
            <p>Project not found.</p>
          )}

        {!loading && project && (
          <div className="w-full mx-auto min-h-[700px] overflow-hidden ">
            <iframe 
              allow="clipboard-read; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture"
              sandbox="allow-scripts allow-forms allow-same-origin allow-modals allow-popups allow-popups-to-escape-sandbox"
              src={project.file}
              title={project.title}
              className="w-full min-h-dvh mx-auto border border-gray-100 rounded"
            />
          </div>
        )}

        </div>
      </main>
    </>
  );
}