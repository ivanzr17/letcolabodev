'use server';

import { PostModel } from "@/models/Post";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";


const savePost = async (data: FormData) => {
    await mongoose.connect(process.env.MONGO_URI as string);
    const postDoc = await PostModel.create( Object.fromEntries(data));
    revalidatePath(`/posts/` + postDoc.orgId);

    return JSON.parse(JSON.stringify(postDoc));
}

export default savePost