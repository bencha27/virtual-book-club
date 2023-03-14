const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema to create "User" model
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      }
    ],
  }
);

// Middleware to create hashed password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Compare the input password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create "User" model
const User = model("User", userSchema);

module.exports = User;