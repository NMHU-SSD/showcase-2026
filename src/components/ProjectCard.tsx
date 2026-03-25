import { Image } from "lucide-react";

import { Project } from "../pages/Project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card bg-secondary p-5 w-min-[400px] rounded">

      <div className="project-thumb">
        {project.thumbnail ? (
          <img className="w-full min-h-[200px] object-cover mb-6 rounded" src={project.thumbnail} alt={project.title} />
        ) : (
          <div className="w-full min-h-[200px] flex items-center justify-center bg-primary/10 mb-6 rounded"><Image /></div>
        )}
      </div>

      <h1 className=" font-mono">{project.title}</h1>
      <p className="text-sm font-semibold">{project.student}</p>
      <p className="text-xs mt-2">{project.description}</p>

      <a
        href={`/project/${project.slug}`}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 mt-6 inline-block bg-primary text-white rounded hover:bg-primary-dark"
      >
        View Project
      </a>

    </div>
  );
}