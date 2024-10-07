"use client";
import React from "react";
import ProjectRow from "./ProjectRow";
import { Post } from "@/models/Post";
import { useRouter } from "next/navigation";

const Project = ({
  header,
  projects,
  page = 1,
  totalPages = 1,
}: {
  header: string;
  projects: Post[];
  page?: number;
  totalPages?: number;
}) => {
  const router = useRouter();

  const handleNextPage = () => {
    if (page < totalPages) {
      router.push(`/?page=${page + 1}`);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      router.push(`/?page=${page - 1}`);
    }
  };

  return (
    <div className="bg-slate-200 p-1 py-6 rounded-3xl font-bold flex flex-col gap-4">
      <h2 className="font-bold mb-4">{header || "Proyectos"}</h2>
      <div className="flex flex-col gap-4">
        {!projects?.length && (
          <p className="text-gray-500"> No hay proyectos</p>
        )}
        {projects &&
          projects.map((project) => (
            <ProjectRow key={project._id} projectInfo={project} />
          ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`${
            page === 1 ? "bg-gray-400" : "bg-blue-500"
          } text-white font-bold py-2 px-4 rounded disabled:opacity-50`}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className={`${
            page >= totalPages ? "bg-gray-400" : "bg-blue-500"
          } text-white font-bold py-2 px-4 rounded disabled:opacity-50`}
        >
          Siguiente
        </button>
      </div>
      <p className="text-center mt-4 text-gray-500">
        Página {page} de {totalPages}
      </p>
    </div>
  );
};

export default Project;
