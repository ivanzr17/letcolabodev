"use client";

import type { Post } from "@/models/Post";
import React from "react";
import TimeStamp from "./timeStamp";
import Link from "next/link";

import axios from "axios";

const ProjectRow = ({ projectInfo }: { projectInfo: Post }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
      <div className="md:content-center flex">
        <img
          alt="project icon"
          src={projectInfo?.icon}
          className=" md:size-16 "
        />
      </div>
      <div className="grow">
        <div className="flex justify-between items-center ">
          <Link
            href={"/posts/" + projectInfo.orgId}
            className="text-gray-500 text-sm hover:underline"
          >
            {" "}
            {projectInfo.orgName}{" "}
          </Link>
          <span>
            {" "}
            {projectInfo.isAdmin && (
              <div className="flex md:hidden text-gray-400">
                <Link href={"/posts/edit/" + projectInfo._id}>Edit</Link>{" "}
                &middot;{" "}
                <button
                  type="button"
                  onClick={async () => {
                    await axios.delete(`/api/posts?id=${projectInfo._id}`);
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </span>
        </div>
        <div>
          <Link
            href={"/view/" + projectInfo._id}
            className="font-bold mb-1 hover:underline"
          >
            {" "}
            {projectInfo.title}{" "}
          </Link>
        </div>
        <div className="text-gray-400 text-sm font-normal flex gap-1 ">
          <span>{projectInfo.project}</span>
          &middot; <span>{projectInfo.stack}</span>
          &middot; <span>{projectInfo.level}</span>
          <span>
            {" "}
            {projectInfo.isAdmin && (
              <div className="hidden md:flex">
                &middot;{" "}
                <Link href={"/posts/edit/" + projectInfo._id}>Edit</Link>{" "}
                &middot;{" "}
                <button
                  type="button"
                  onClick={async () => {
                    await axios.delete(`/api/posts?id=${projectInfo._id}`);
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="content-end text-gray-500 text-xs">
        <TimeStamp date={projectInfo.createdAt} />
      </div>
    </div>
  );
};

export default ProjectRow;
