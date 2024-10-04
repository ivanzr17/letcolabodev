import React from "react";
import { PostModel } from "@/models/Post";
import mongoose from "mongoose";
import Image from "next/image";

type PageProps = {
  params: {
    postId: string;
  };
};

const page = async (props: PageProps) => {
  const postId = props.params.postId;
  await mongoose.connect(process.env.MONGO_URI as string);
  const postDoc = await PostModel.findById(postId);

  return (
    <div className="container mt-8 my-6">
      <div className="sm:flex">
        <div className="grow">
          <h1 className="text-4xl mb-2">{postDoc.title}</h1>
          <div className="capitalize text-sm text-blue-800 mb-4">
            {postDoc.project} &middot; {postDoc.level}&middot; {postDoc.stack}{" "}
          </div>
        </div>
        <div>
          <img
            src={postDoc.icon}
            alt={"post icon"}
            width={500}
            height={500}
            className="w-auto h-auto max-w-16 max-h-16"
          />
        </div>
      </div>
      <div className="whitespace-pre-line text-sm text-gray-600">
        {postDoc.description}
      </div>
      <div className="mt-4 bg-gray-200 p-8 rounded-lg">
        <h3 className="font-bold mb-2">
          Puedes ponerte en contacto con nosotros
        </h3>
        <div className="flex gap-4">
          <img
            src={postDoc.contact.photo}
            alt={"contact person"}
            width={500}
            height={500}
            className="w-auto h-auto max-w-24 max-h-24"
          />
          <div className="flex content-center items-center">
            {postDoc.contact.name}
            <br />
            Email: {postDoc.contact.mail}
            <br />
            Linkedin: {postDoc.contact.linkedin}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
