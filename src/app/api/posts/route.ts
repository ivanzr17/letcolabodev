import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { PostModel } from "@/models/Post";


export async function DELETE(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    await mongoose.connect(process.env.MONGO_URI as string);
    await PostModel.deleteOne({
        _id: id,
    });
    return Response.json (true)

}