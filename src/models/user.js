// models/user.model.js
const mongoose = require("mongoose");

// TODO: Define the AddressSchema, for example:
// const AddressSchema = new mongoose.Schema({ street: String, city: String });

const UserSchema = new mongoose.Schema(
  {
    // identitas & kredensial
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match:
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, //regex address email   
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, //
    },
    name: { type: String, required: true, trim: true, maxlength: 120 },

    // role & status
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
      index: true,
    },

    // profil opsional
    profile: {
      phone: String,
      avatarUrl: String,
      // address: AddressSchema, // This will cause an error as AddressSchema is not defined.
    },
    // audit trail
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);
 
const User = mongoose.model("User", UserSchema);
 
module.exports = { User };
