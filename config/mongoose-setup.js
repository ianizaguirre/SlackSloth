"use strict";

const mongoose = require("mongoose");


mongoose.Promise = global.Promise; // Tell Mongoose to use Es6 promises

mongoose.connect("mongodb://localhost/sloth-users", { useMongoClient: true })
  .then(() => {
      console.log("Mongoose is connected! 🍕");
  })
  .catch((err) => {
      console.log("Mongoose connection FAILED! 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨");
      console.log(err);
  });
