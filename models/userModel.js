import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,"Please enter your name"],
    },
    // userName: {
    //   type: String,
    //   required: [true,"Pleae provide a username"],
    // },
    email: {
      type: String,
      required: [true,"Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true,"Please provide a password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiration: Date,
    verifyToken: String,
    verifyTokenExpiration: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
