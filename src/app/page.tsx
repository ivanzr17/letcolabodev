import { addData, PostModel } from "@/models/Post";
import Hero from "./components/Hero";
import Project from "./components/Project";
import { getUser } from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";

export default async function Home() {
  const { user } = await getUser();
  await mongoose.connect(process.env.MONGO_URI as string);
  const post = await addData(
    await PostModel.find({}, {}, { limit: 5, sort: "-createdAt" }),
    user
  );
  return (
    <>
      <Hero />
      <Project header="" projects={post} />
    </>
  );
}
