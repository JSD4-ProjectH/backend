import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
  },
  profileImage: {
    type: String,
    // optional
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is already exists"],
  },
  weight: {
    type: [Number],
  },
  height: {
    type: [Number],
  },
  updatedAt: {
    type: [String],
  },
});

const User = mongoose.model("User", UserSchema, "users");

export default User;