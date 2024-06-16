import type mongoose from "mongoose";

export interface Blog {
    content_mongo_id?: mongoose.Schema.Types.ObjectId;
    blog_details: string;
    image_url: string | undefined;
    sources: string | undefined;
    comment: string | undefined;
    likes: number | undefined;
}