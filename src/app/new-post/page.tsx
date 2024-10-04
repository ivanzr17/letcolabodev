"use server";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { revalidatePath } from "next/cache";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "@workos-inc/authkit-nextjs";
import {
  AutoPaginatable,
  OrganizationMembership,
  WorkOS,
} from "@workos-inc/node";
import React from "react";
import createGroup from "../actions/workosActions";
import Link from "next/link";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

const NewPostPage = async () => {
  const { user } = await getUser();

  const handleNewGroup = async (data: FormData) => {
    "use server";
    if (user) {
      await createGroup(data.get("newGroupName") as string, user.id);
    }
    revalidatePath("new-post");
  };

  if (!user) {
    return (
      <div>
        {!user && <div> Necesitas estar registrado para crear un post</div>}
      </div>
    );
  }

  const groupMembers = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
  });

  const activeGroups = groupMembers.data.filter((gm) => gm.status === "active");
  const groupsNames: { [key: string]: string } = {};
  for (const activeMembership of activeGroups) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    groupsNames[organization.id] = organization.name;
  }

  return (
    <div>
      <div>
        <h1 className="text-lg mt-6 font-semibold">Tus grupos</h1>
        <p className="text-gray-500 text-small mb-2">
          {" "}
          Elige un grupo para crear un post{" "}
        </p>
        <div className="border inline-block rounded-md">
          {Object.keys(groupsNames).map((groupId) => (
            <Link
              className={
                "py-2 px-4 flex gap-2 items-center " +
                (Object.keys(groupsNames)[0] === groupId ? "" : "border-t")
              }
              href={"/new-post/" + groupId}
            >
              {groupsNames[groupId]}
              <FontAwesomeIcon className="h-4" icon={faArrowRight} />
            </Link>
          ))}
        </div>
        {groupMembers.data.length === 0 && (
          <div className="border border-blue-200 bg-blue-50 p-3 rounded-md">
            No se han encontrado grupos
          </div>
        )}

        <h2 className="text-lg mt-4 font-semibold">
          Crea un nuevo grupo de trabajo
        </h2>
        <p className="text-gray-500 text-small mb-2">
          {" "}
          Para publicar un proyecto primero debes de crear un grupo de trabajo{" "}
        </p>
        <form action={handleNewGroup} className="flex gap-2">
          <input
            name="newGroupName"
            type="text"
            placeholder="Nombre del grupo"
            className="p-2 border border-gray-400 rounded-md"
          />
          <button
            type="submit"
            className="bg-gray-200 px-4 py-2 rounded-md flex gap-2 items-center font-semibold"
          >
            {" "}
            Crear grupo de trabajo
            <FontAwesomeIcon className="h-4" icon={faPlus} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostPage;
