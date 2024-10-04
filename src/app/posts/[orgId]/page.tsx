import React from "react";
import { AutoPaginatable, WorkOS } from "@workos-inc/node";
import Project from "@/app/components/Project";
import mongoose from "mongoose";
import { PostModel } from "@/models/Post";
import { getUser } from "@workos-inc/authkit-nextjs";
import { OrganizationMembership } from "@workos-inc/node";

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
  let membership: AutoPaginatable<OrganizationMembership> | null = null;
  if (user) {
    membership = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
  }
  for (const post of projectInfo) {
    const org = await workos.organizations.getOrganization(post.orgId);
    post.orgName = org.name;
    if (membership && membership.data.length > 0) {
      post.isAdmin = !!membership.data.find(
        (m) => m.organizationId === post.orgId
      );
    }
  }
  return (
    <div>
      <div>
        <h1 className="text-4xl my-6"> {org.name}</h1>
      </div>
      <Project projects={projectInfo} header={"Proyectos de " + org.name} />
    </div>
  );
};

export default PostPage;
