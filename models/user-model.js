"use strict";
const mongoose = require("mongoose");
const validator = require('validator');


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
          required: [true, "Please tell us your name."],
          trim: true
      },

      // normal login users
      email: {
          type: String,
          unique: true,
          lowercase: true,
          trim: true,
          validate: [validator.isEmail, 'Invalid Email Address'],
          required: 'Please Supply an Email Address'
          //match: [/.+@.+/, "Emails need an @ sign."]
      },


      encryptedPassword: { type: String }



  },

  // 2nd argument -> SETTINGS object
  {
      // automatically add "createdAt" and "updatedAt" Date fields
      timestamps: true
  }
);







const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;