import mongoose from "mongoose";

export interface Blog {
  content_mongo_id?: mongoose.Schema.Types.ObjectId;
  blog_details: string;
  image_url: string | undefined;
  sources: string | undefined;
  comment: string | undefined;
  likes: number | undefined;
}

const BlogSchema = new mongoose.Schema<Blog>(
  {
    content_mongo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },
    blog_details: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
    sources: {
      type: String,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

export default (mongoose.models.Blog as mongoose.Model<Blog>) ||
  mongoose.model<Blog>("Blog", BlogSchema);
