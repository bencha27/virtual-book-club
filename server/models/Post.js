const { Schema, model } = require("mongoose");

// Schema to create "Post" model
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postTitle: {
      type: String,
      required: true,
      minLength: 1,
    },
    postBody: {
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