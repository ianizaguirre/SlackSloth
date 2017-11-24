"use strict";
const mongoose = require("mongoose");


const Schema = mongoose.Schema;


/* ================================
  This is the sloth-model that active 
  users who already signed in are
  presented with, this is the structure that 
  they follow when they start inputing 
  their multiple slack teams information
  that they wish to save.

  This is connected to sloth-controller which
  connects to user-dashboard.ejs
================================ */




const slothSchema = new Schema(

  {
      workspaceURL: {
          type: String,
          trim: true,
          required: "Tell us your workspace URL."
      },

      email: {
          type: String,
          match: [/.+@.+/, "Emails need an @ sign."]
      },

      encryptedPassword: { type: String }

  },

  // 2nd argument -> SETTINGS object
  {
      // automatically add "createdAt" and "updatedAt" Date fields
      timestamps: true
  }
);







const SlothModel = mongoose.model("SlothUser", slothSchema);

module.exports = SlothModel;