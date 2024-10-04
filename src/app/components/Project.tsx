import React from "react";
import ProjectRow from "./ProjectRow";
import { Post } from "@/models/Post";

const Project = ({
  header,
  projects,
}: {
  header: string;
  projects: Post[];
}) => {
  return (
    <div className=" bg-slate-200 p-8 py-6 rounded-3xl  font-bold">
      <h2 className="font-bold mb-4"> {header || "Proyectos"}</h2>
      <div className="flex flex-col gap-4">
        {!projects?.length && (
          <p className="text-gray-500"> No hay proyectos</p>
        )}
        {projects &&
          projects.map((project) => <ProjectRow projectInfo={project} />)}
      </div>
    </div>
  );
};

export default Project;
