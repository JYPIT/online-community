import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 30 },
  content: { type: String, required: true, minLength: 1, maxLength: 500 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    likes: { type: Number, default: 0, required: true },
  },
});

postSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Post = mongoose.model("Post", postSchema);

export default Post;
