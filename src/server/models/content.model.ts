import mongoose from "mongoose";
import { type Content } from "../types/content.type";

const ContentSchema = new mongoose.Schema<Content>(
  {
    user_mongo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    blog_mongo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: false,
    },
    linkedin_post_mongo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LinkedInPost',
      required: false,
    },
    youtube_transcript_mongo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'YouTubeTranscript',
      required: false,
    },
  },
  { timestamps: true },
);

export default (mongoose.models.Content as mongoose.Model<Content>) ||
  mongoose.model<Content>("Content", ContentSchema);
