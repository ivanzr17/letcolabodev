import mongoose from "mongoose";
import React from "react";
import { PostModel } from "@/models/Post";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import Form from "@/app/components/Form";

type PageProps = {
  params: {
    postId: string;
  };
};

const EditPostPage = async (pageProps: PageProps) => {
  const postId = pageProps.params.postId;
  await mongoose.connect(process.env.MONGO_URI as string);
  const postDoc = JSON.parse(JSON.stringify(await PostModel.findById(postId)));
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return "Please log in";
  }

  const membership = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: postDoc.orgId,
  });

  if (membership.data.length === 0) {
    return "No acces";
  }
  return (
    <div>
      <Form orgId={postDoc.orgId} postDoc={postDoc} />
    </div>
  );
};

export default EditPostPage;
