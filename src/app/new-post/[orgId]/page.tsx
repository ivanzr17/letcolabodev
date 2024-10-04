import { getUser } from "@workos-inc/authkit-nextjs";
import React from "react";
import { WorkOS } from "@workos-inc/node";
import "@radix-ui/themes/styles.css";
import Form from "@/app/components/Form";

type PageProps = {
  params: {
    orgId: string;
  };
};

const NewPostForGroup = async (props: PageProps) => {
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    return "Please log in";
  }
  const orgId = props.params.orgId;
  const membership = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const acces = membership.data.length > 0;

  if (!acces) {
    return "No acces";
  }

  return (
    <>
      <Form orgId={orgId} />
    </>
  );
};

export default NewPostForGroup;
