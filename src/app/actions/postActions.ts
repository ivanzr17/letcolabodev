'use server';

import { PostModel } from "@/models/Post";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";


const savePost = async (data: FormData) => {
    await mongoose.connect(process.env.MONGO_URI as string);
    const {id, ...postData} = Object.fromEntries(data);
    const postDoc = (id)
        ? await PostModel.findByIdAndUpdate(id, postData)
        : await PostModel.create(postData);
    if ("orgId" in postData) {
        revalidatePath(`/posts/${postData?.orgId}`);
    }

    return JSON.parse(JSON.stringify(postDoc));
}

export default savePost