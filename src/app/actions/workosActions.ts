'use server';

import { WorkOS } from "@workos-inc/node";



const workos = new WorkOS(process.env.WORKOS_API_KEY);

const createGroup = async (groupName: string, userId: string) => {
    "use server";
    const org = await workos.organizations.createOrganization({
      name: groupName,
    });
    return await workos.userManagement.createOrganizationMembership({
      userId,
      organizationId: org.id,
      roleSlug: "admin",
    });
  };
  
  

  export default createGroup