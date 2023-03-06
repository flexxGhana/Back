import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: function () {
        return this.role === "seller";
      },
    },
    desc: {
      type: String,
      required: function () {
        return this.role === "seller";
      },
    },
    languages: {
      type: Array,
      required: function () {
        return this.role === "seller";
      },
    },
    skills: {
      type: Array,
      required: function () {
        return this.role === "seller";
      },
    },
    town: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: function () {
        return this.role === "seller";
      },
    },
    role: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      default: "buyer",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
