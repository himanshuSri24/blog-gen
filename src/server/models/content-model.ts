import mongoose, { Mongoose, Schema } from "mongoose";

export interface Content {
  user_mongo_id: string;
  title: string;
  blog_mongo_id: string | undefined;
  linkedin_post_mongo_id: string | undefined;
  youtube_transcript_mongo_id: string | undefined;
}

const ContentSchema = new mongoose.Schema<Content>(
  {
    user_mongo_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    blog_mongo_id: {
      type: String,
      required: false,
    },
    linkedin_post_mongo_id: {
      type: String,
      required: false,
    },
    youtube_transcript_mongo_id: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default (mongoose.models.Content as mongoose.Model<Content>) ||
  mongoose.model<Content>("Content", ContentSchema);
