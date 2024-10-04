import mongoose, { model, models, Schema } from "mongoose";
import { AutoPaginatable, OrganizationMembership, User, WorkOS } from "@workos-inc/node";

export type Post = {
    _id: string;
    title: string;
    orgName?: string;
    level: string;
    project: string;
    stack: string;
    icon: string;
    orgId: string;
    contact: {
        photo: string;
        name: string;
        mail: string;
        linkedin: string;
    };
    description: string;
    createdAt: string;
    updatedAt: string;
    isAdmin?: boolean;
}


const PostSchema = new Schema({
    title: {type: String, required: true},
    level: {type: String, required: true},
    project: {type: String, required: true},
    stack: {type: String, required: true},
    icon: {type: String},
    orgId: {type: String, required: true},
    contact: new Schema ({
        photo: {type: String},
        name: {type: String, required: true},
        mail: {type: String, required: true },
        linkedin: {type: String, required: true},
    }),
    description: {type: String, required: true},
    
},{
    timestamps: true,

});

export async function addData (projectInfo: Post[], user: User | null) {
    projectInfo = JSON.parse(JSON.stringify(projectInfo));
    await mongoose.connect(process.env.MONGO_URI as string);
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    let membership: AutoPaginatable<OrganizationMembership> | null = null;
  if (user) {
    membership = await workos.userManagement.listOrganizationMemberships({
      userId: user?.id,
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
  return projectInfo;
}

export const PostModel = models?.Post || model("Post", PostSchema)