import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      validate: {
        validator: function (v) {
          // Validate email format using regular expression
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (v) {
          return v.length >= 8; // Check if password is at least 8 characters long
        },
        message: "Password must be at least 8 characters long!",
      },
    },

    picture: {
      type: String,
      required: function () {
        return this.role === "seller";
      },
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    phone: {
      type: String,
      unique: true,
      required: function () {
        return this.role === "seller";
      },
      validate: {
        validator: function (v) {
          // Validate phone number format and Ghana standard numbers
          return /^0[2356][0-9]{8}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    description: {
      type: String,
      required: [
        function () {
          return this.role === "seller";
        },
        "your description is required.",
      ],
    },
    languages: {
      type: Array,
      required: [
        function () {
          return this.role === "seller";
        },
        "your Language is required.",
      ],
    },
    skills: {
      type: Array,
      required: [
        function () {
          return this.role === "seller";
        },
        "your Skills are required",
      ],
    },
    town: {
      type: String,
      required: [true, "your town is required"],
    },
    profession: {
      type: String,
      required: [
        function () {
          return this.role === "seller";
        },
        "your profession is required",
      ],
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
