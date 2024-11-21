const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,

    },
    email: {
      type: String,

    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },

    role: {
      type: String,
      enum: ["user", "admin", "consultant"],
      default: "user",
    },
    consultantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultant",
    },

    dob: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
module.exports = User;
