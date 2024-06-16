import type mongoose from "mongoose";

export interface Content {
    user_mongo_id: mongoose.Schema.Types.ObjectId | undefined;
    title: string;
    blog_mongo_id?: mongoose.Schema.Types.ObjectId;
    linkedin_post_mongo_id?: mongoose.Schema.Types.ObjectId;
    youtube_transcript_mongo_id?: mongoose.Schema.Types.ObjectId;
  }
  