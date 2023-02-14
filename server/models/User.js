const { Schema, model } = require("mongoose");

// Schema to create "User" model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
        unique: true,
      }
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        unique: true,
      }
    ],
  }
);

// Create "User" model
const User = model("User", userSchema);

module.exports = User;