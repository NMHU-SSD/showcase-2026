import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  return (
    <section className="container">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}