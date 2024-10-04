import { addData, PostModel } from "@/models/Post";
import Hero from "./components/Hero";
import Project from "./components/Project";
import { getUser } from "@workos-inc/authkit-nextjs";

interface SearchParams {
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { user } = await getUser();

  const page = parseInt(searchParams.page ?? "1") || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const [posts, totalPosts] = await Promise.all([
    PostModel.find({}, {}, { skip, limit, sort: "-createdAt" }),
    PostModel.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);

  const projectsWithUser = await addData(posts, user);

  return (
    <>
      <Hero />
      <Project
        header=""
        projects={projectsWithUser}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
