"use strict";
const mongoose = require("mongoose");


const Schema = mongoose.Schema;


/* ================================
  This is the user-model that visitors
  use to "Sign-Up".

  This is connected to user-views-controller which
  connects to signup-page.ejs
================================ */




const userSchema = new Schema(
  // 1st argument -> SCHEMA STRUCTURE
  {
      fullName: {
          type: String,
          required: [true, "Tell us your name."]
      },

      // normal login users
      email: {
          type: String,
          match: [/.+@.+/, "Emails need an @ sign."]
      },
      encryptedPassword: { type: String },


      role: {
          type: String,
          // role can only be "normal" or "admin"
          enum: ["normal", "admin"],
          default: "normal"
      }
  },

  // 2nd argument -> SETTINGS object
  {
      // automatically add "createdAt" and "updatedAt" Date fields
      timestamps: true
  }
);







const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;