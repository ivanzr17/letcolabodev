import { model, models, Schema } from "mongoose";

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

export const PostModel = models?.Post || model("Post", PostSchema)