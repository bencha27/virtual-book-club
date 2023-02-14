const { Schema, model } = require("mongoose");

// Schema to create "Post" model
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    chapter: String,
    postText: {
      type: String,
      required: true,
      minLength: 1,
    },
  },
  {
    timestamps: true,
  }
)

// Create "Post" model
const Post = model("Post", postSchema);

module.exports = Post;