import React from "react";
import { AutoPaginatable, WorkOS } from "@workos-inc/node";
import Project from "@/app/components/Project";
import mongoose from "mongoose";
import { addData, PostModel } from "@/models/Post";
import { getUser } from "@workos-inc/authkit-nextjs";
import { OrganizationMembership } from "@workos-inc/node";
import Link from "next/link";

type PageProps = {
  params: {
    orgId: string;
  };
};

const PostPage = async (props: PageProps) => {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  const { user } = await getUser();
  await mongoose.connect(process.env.MONGO_URI as string);
  let projectInfo = JSON.parse(
    JSON.stringify(await PostModel.find({ orgId: org.id }))
  );

  projectInfo = await addData(projectInfo, user);
  return (
    <div>
      <Link href={"/posts/" + props.params.orgId}>
        <h1 className="text-4xl my-6"> {org.name}</h1>
      </Link>
      <Project projects={projectInfo} header={"Proyectos de " + org.name} />
    </div>
  );
};

export default PostPage;
