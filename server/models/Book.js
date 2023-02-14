const { Schema, model } = require("mongoose");

// Schema to create "Book" model
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        unique: true,
      }
    ]
  }
);

// Create "Book" model
const Book = model("Book", bookSchema);

module.exports = Book;