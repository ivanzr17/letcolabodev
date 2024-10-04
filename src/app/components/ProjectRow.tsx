"use server";

import type { Post } from "@/models/Post";
import React from "react";
import TimeStamp from "./timeStamp";
import Link from "next/link";

const ProjectRow = ({ projectInfo }: { projectInfo: Post }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
      <div className="content-center">
        <img src={projectInfo?.icon} className="size-16" />
      </div>
      <div className="grow">
        <div className="text-gray-500 text-sm"> {projectInfo.orgName} </div>
        <div className="font-bold text-lg mb-1"> {projectInfo.title} </div>
        <div className="text-gray-400 text-sm font-normal flex gap-1 ">
          <span>{projectInfo.project}</span>
          &middot; <span>{projectInfo.stack}</span>
          &middot; <span>{projectInfo.level}</span>
          <span>
            {" "}
            {projectInfo.isAdmin && (
              <>
                &middot;{" "}
                <Link href={"/posts/edit/" + projectInfo._id}>Edit</Link>{" "}
                &middot; <button>Delete</button>
              </>
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
